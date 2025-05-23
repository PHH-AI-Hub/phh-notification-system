use serde::Serialize;

#[derive(Serialize)]
pub struct SystemInformation {
    pub cpu: String,
    pub global_cpu_usage: f32,
    pub available_memory: u64,
    pub total_memory: u64,
    pub used_memory: u64,
    pub free_swap: u64,
    pub used_swap: u64,
    pub total_swap: u64,
    pub processes: u64,
    pub free_memory: u64,
}
