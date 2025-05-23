use tauri::{AppHandle, Emitter};

#[tauri::command]
pub fn update_to_latest_version(app: AppHandle) {
    app.emit("update-to-latest-version", true).unwrap();
}
