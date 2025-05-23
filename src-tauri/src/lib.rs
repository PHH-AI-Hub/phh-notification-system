use modules::{
    informations::{
        application_information::get_application_version,
        device_information::get_device_information, system_information::get_system_information,
    },
    updaters::latest_version_updater::update_to_latest_version,
    windows::{
        focus_window::focus_window, hide_window::hide_window, open_window::open_window,
        refresh_window::refresh_window, set_default_size_window::set_default_size_window,
    },
};
pub mod models;
pub mod modules;

use tauri::{Manager, WindowEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .setup(|app| {
            #[cfg(desktop)]
            {
                // Auto Start
                use tauri_plugin_autostart::MacosLauncher;
                use tauri_plugin_autostart::ManagerExt;

                _ = app.handle().plugin(tauri_plugin_autostart::init(
                    MacosLauncher::LaunchAgent,
                    Some(vec!["--flag1", "--flag2"]),
                ));

                let autostart_manager = app.autolaunch();
                let _ = autostart_manager.enable();

                // Single Instance
                _ = app
                    .handle()
                    .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
                        let _ = app
                            .get_webview_window("main")
                            .expect("no main window")
                            .set_focus();
                    }));

                // Global Shortcuts
                use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut};

                let app_update_shortcut = Shortcut::new(
                    Some(Modifiers::CONTROL | Modifiers::ALT | Modifiers::SHIFT),
                    Code::KeyU,
                );

                let app_handle_for_shortcut = app.handle();
                app_handle_for_shortcut.plugin(
                    tauri_plugin_global_shortcut::Builder::new()
                        .with_handler({
                            let app_update_shortcut = app_update_shortcut.clone();
                            move |app_handle, shortcut, _event| {
                                if shortcut == &app_update_shortcut {
                                    let handle = app_handle.clone();
                                    tauri::async_runtime::spawn(async move {
                                        update_to_latest_version(handle).await.unwrap();
                                    });
                                } else {
                                    println!("Unhandled shortcut: {:?}", shortcut);
                                }
                            }
                        })
                        .build(),
                )?;
                let shortcut_manager = app.global_shortcut();
                shortcut_manager.register(app_update_shortcut)?;
            }

            // Label Window as main
            let app_handle_main_window_event = app.handle().clone(); // Renamed for clarity
            let main_window = app
                .get_webview_window("main")
                .expect("Failed to get main window");

            // Prevent the window from being closed and Hide Instead
            main_window.on_window_event(move |event| {
                if let WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                    let window = app_handle_main_window_event
                        .get_webview_window("main")
                        .unwrap();
                    window.hide().unwrap();
                }
            });

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Informations
            get_application_version,
            get_device_information,
            get_system_information,
            // Windows
            focus_window,
            hide_window,
            open_window,
            refresh_window,
            set_default_size_window,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
