use serde::Serialize;

#[derive(Serialize)]
pub struct DeviceInformation<'a> {
    pub arch: &'a str,
    pub exe_extension: String,
    pub family: &'a str,
    pub hostname: String,
    pub locale: Option<String>,
    pub platform: &'a str,
    pub version: String,
    pub username: String,
}
