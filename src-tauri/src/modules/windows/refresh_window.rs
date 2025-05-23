use tauri::{AppHandle, Manager, Runtime};

#[tauri::command]
pub fn refresh_window<R: Runtime>(app: AppHandle<R>) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.eval("window.location.reload();");
    }

    Ok(())
}
