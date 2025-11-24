use crate::state::app_state::AppState;
use crate::utils::os::get_current_ip;
use crate::{http::routes::set_routes, utils::resource::get_webapp_path};

use axum::http::StatusCode;
use axum::routing::get_service;
use once_cell::sync::Lazy;
use std::sync::Mutex;
use tauri::{AppHandle, Manager};
use tokio::sync::oneshot;
use tower_http::services::ServeDir;

static STOP_TX: Lazy<Mutex<Option<oneshot::Sender<()>>>> = Lazy::new(|| Mutex::new(None));

#[tauri::command(async)]
pub async fn start_server(app: AppHandle, port: u64) -> () {
    let (tx, rx) = oneshot::channel::<()>();
    let state = app.state::<Mutex<AppState>>();
    {
        let mut guard = state.lock().unwrap();
        guard.server_port = port;
        guard.server_ip = get_current_ip();
    }

    *STOP_TX.lock().unwrap() = Some(tx);

    let webapp_path = get_webapp_path(&state);

    let router = set_routes().fallback_service(
        get_service(ServeDir::new(webapp_path))
            .handle_error(|_| async { StatusCode::INTERNAL_SERVER_ERROR }),
    );

    let addr = format!("{}:{}", state.lock().unwrap().server_ip, port);

    let listener = match tokio::net::TcpListener::bind(&addr).await {
        Ok(listener) => {
            println!("Server running on: http://{}", addr);
            listener
        }
        Err(e) => {
            println!("{}", format!("Error starting server! {}", e));
            return ();
        }
    };

    let server = axum::serve(listener, router).with_graceful_shutdown(async {
        rx.await.ok();
    });

    if let Err(e) = server.await {
        println!("Server error: {}", e);
    }
}

#[tauri::command]
pub fn stop_server() -> () {
    if let Some(tx) = STOP_TX.lock().unwrap().take() {
        println!("Stopping server!");
        let _ = tx.send(());
    }
}
