use sysinfo::System;

use crate::models::structs::system_information_struct::SystemInformation;

#[tauri::command]
pub async fn get_system_information() -> SystemInformation {
    let mut sys = System::new_all();
    sys.refresh_all();

    SystemInformation {
        cpu: sys.cpus()[0].brand().to_string(), // Convert &str to String
        global_cpu_usage: sys.global_cpu_usage(),
        available_memory: sys.available_memory(),
        total_memory: sys.total_memory(),
        used_memory: sys.used_memory(),
        free_swap: sys.free_swap(),
        used_swap: sys.used_swap(),
        total_swap: sys.total_swap(),
        processes: sys.processes().len() as u64,
        free_memory: sys.free_memory(),
    }
}
