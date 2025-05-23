use tauri::{AppHandle, Manager, Runtime};

#[tauri::command]
pub async fn open_window<R: Runtime>(app: AppHandle<R>) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        window.center().map_err(|e| e.to_string())?;
        window.show().map_err(|e| e.to_string())?;
    }
    Ok(())
}
