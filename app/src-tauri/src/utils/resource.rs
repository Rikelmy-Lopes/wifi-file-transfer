use std::fs;
use std::path::PathBuf;
use tauri::{path::BaseDirectory, AppHandle};
use tauri::{App, Manager};

use crate::constants::constants::{WEBAPP_RESOURCE_PATH_DEV, WEBAPP_RESOURCE_PATH_PROD};

pub fn resolve_resource_path(handle: &AppHandle, path: &str) -> Option<String> {
    match handle
        .path()
        .resolve(PathBuf::from(path), BaseDirectory::Resource)
    {
        Ok(path) => Some(path.display().to_string()),
        Err(e) => {
            let error_message = format!("Falha ao resolver caminho do recurso: {}\n{}", path, e);
            println!("{}", error_message);
            None
        }
    }
}

pub fn get_webapp_path(app: &App) -> String {
    // Adjust output path in development to avoid restarts caused by changes in 'resources'
    if cfg!(debug_assertions) {
        let absolute_path = fs::canonicalize(WEBAPP_RESOURCE_PATH_DEV)
            .unwrap()
            .to_str()
            .unwrap()
            .to_string();
        String::from(absolute_path)
    } else {
        resolve_resource_path(app.handle(), WEBAPP_RESOURCE_PATH_PROD).unwrap()
    }
}
