use serde::{Deserialize, Serialize};
use std::{
    fs::{self, FileType},
    path::PathBuf,
};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Entry {
    name: String,
    path: String,
    filetype: String,
    is_file: bool,
    is_dir: bool,
    is_symbol: bool,
}

fn get_file_type(file: FileType) -> String {
    if file.is_dir() {
        return String::from("directory");
    } else if file.is_file() {
        return String::from("file");
    } else {
        return String::from("symlink");
    }
}

pub fn get_file_name(path: &str) -> String {
    let path_buf = PathBuf::from(path);

    return path_buf.file_name().unwrap().to_str().unwrap().to_string();
}

pub fn get_dir_entries(path: &str) -> Vec<Entry> {
    let path = PathBuf::from(path).join("Coding");

    let paths = fs::read_dir(path).unwrap();
    let mut files: Vec<Entry> = Vec::new();

    for path in paths {
        let dir_entry = path.unwrap();
        let file_type = dir_entry.file_type().unwrap();
        files.push(Entry {
            name: dir_entry.file_name().to_str().unwrap().to_owned(),
            path: dir_entry.path().to_str().unwrap().to_owned(),
            filetype: get_file_type(dir_entry.file_type().unwrap()),
            is_file: file_type.is_file(),
            is_dir: file_type.is_dir(),
            is_symbol: file_type.is_symlink(),
        });
    }

    return files;
}
