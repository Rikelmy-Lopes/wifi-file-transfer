use crate::fs::fs::{get_dir_entries, get_file_name};
use axum::extract::Query;
use axum::http::{header, HeaderValue, StatusCode};
use axum::response::IntoResponse;
use axum::routing::get;
use axum::Router;
use axum_extra::headers::Range;
use axum_extra::TypedHeader;
use axum_range::{KnownSize, Ranged};
use std::collections::HashMap;
use std::env::home_dir;
use std::path::PathBuf;
use tokio::fs::File;

type RangeDownload = Option<TypedHeader<Range>>;
type QueryParams = Query<HashMap<String, String>>;

async fn get_entries(Query(params): QueryParams) -> impl IntoResponse {
    let path = params.get("path");

    if path.is_none() {
        let files = get_dir_entries(PathBuf::from(home_dir().unwrap().to_str().unwrap()));

        let json = serde_json::to_string(&files).unwrap();

        return json;
    }

    let files = get_dir_entries(PathBuf::from(path.unwrap()));

    let json = serde_json::to_string(&files).unwrap();

    return json;
}

async fn download(range: RangeDownload, Query(params): QueryParams) -> impl IntoResponse {
    let path = params.get("path");

    if path.is_none() {
        return (
            StatusCode::BAD_REQUEST,
            format!("Path param must be filled."),
        )
            .into_response();
    }

    let file = match File::open(path.unwrap()).await {
        Ok(f) => f,
        Err(err) => {
            return (StatusCode::NOT_FOUND, format!("File not found: {}", err)).into_response()
        }
    };

    let file_name = get_file_name(path.unwrap());

    let body = KnownSize::file(file).await.unwrap();

    let range = range.map(|TypedHeader(range)| range);
    let ranged = Ranged::new(range, body);

    let content_disposition = format!("attachment; filename={}", file_name);

    (
        [
            (
                header::CONTENT_TYPE,
                HeaderValue::from_static("application/octet-stream"),
            ),
            (
                header::CONTENT_DISPOSITION,
                HeaderValue::from_str(&content_disposition).unwrap(),
            ),
        ],
        ranged,
    )
        .into_response()
}

pub fn set_routes() -> Router<()> {
    Router::new()
        .route("/download", get(download))
        .route("/entries", get(get_entries))
}
