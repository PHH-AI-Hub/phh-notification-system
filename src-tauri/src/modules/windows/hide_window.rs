use tauri::{AppHandle, Manager, Runtime};

#[tauri::command]
pub async fn hide_window<R: Runtime>(app: AppHandle<R>) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        window.hide().map_err(|e| e.to_string())?;
    }
    Ok(())
}
