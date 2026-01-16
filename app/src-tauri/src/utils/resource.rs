use std::path::PathBuf;
use tauri::Manager;
use tauri::{path::BaseDirectory, AppHandle};

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
