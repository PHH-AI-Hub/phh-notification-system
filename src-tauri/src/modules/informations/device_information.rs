use crate::models::structs::device_information_struct::DeviceInformation;

use tauri_plugin_os::{arch, exe_extension, family, hostname, locale, platform, version};

#[tauri::command]
pub fn get_device_information() -> DeviceInformation<'static> {
    DeviceInformation {
        arch: arch(),
        exe_extension: exe_extension().to_string(),
        family: family(),
        hostname: hostname(),
        locale: locale(),
        platform: platform(),
        version: version().to_string(),
        username: whoami::username(),
    }
}
