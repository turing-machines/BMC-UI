const translations = {
  navigation: {
    info: "Info",
    nodes: "Nodes",
    usb: "USB",
    firmwareUpgrade: "Firmware Upgrade",
    flashNode: "Flash Node",
    about: "About",
  },
  userNav: {
    language: "Language",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    logout: "Logout",
  },
  login: {
    header: "Login",
    username: "Username",
    password: "Password",
    remember: "Remember me",
    submit: "Login",
    errorCredentials: "Invalid username or password",
    errorUnknown: "An error has occurred. Please try again later.",
  },
  info: {
    userStorage: "User Storage",
    ariaStorageUtilization: "Storage utilization",
    backupButton: "Backup User Data",
    fanControl: "Fan Control",
    networkInterfaces: "Network Interfaces",
    resetNetworkButton: "Reset Network",
    bmc: "BMC",
    rebootButton: "Reboot",
    reloadDaemonButton: "Reload Daemon",
    rebootModalTitle: "Do you want to reboot?",
    rebootModalDescription:
      "Be aware that the nodes will lose power until booted.",
    backupSuccess: "Successfully downloaded backup file.",
    backupFailed: "User data backup failed.",
    resetNetworkSuccess: "Network reset successful.",
    resetNetworkFailed: "Network reset failed.",
    rebootSuccess: "The BMC is rebooting...",
    rebootFailed: "Failed to reboot BMC",
    reloadDaemonSuccess: "The BMC daemon is reloading...",
    reloadDaemonFailed: "Failed to reload BMC daemon",
  },
  nodes: {
    header: "Control the power supply of connected nodes",
    restartButton: "Restart",
    editButton: "Edit",
    saveButton: "Save",
    ariaNodePowerToggle: "Toggle node {{nodeId}} power",
    node: "Node {{nodeId}}",
    module: "Module {{moduleId}}",
    nodeName: "Node name",
    moduleName: "Module name",
    powerManagement: "Power Management",
    nodeOn: "Node {{nodeId}} was powered on.",
    nodeOff: "Node {{nodeId}} was powered off.",
    nodeRestarted: "Node {{nodeId}} was restarted.",
    pmError: "Error changing node state.",
    persistSuccess: "Nodes information saved.",
  },
  usb: {
    header: "USB route",
    modeSelect: "USB mode",
    nodeSelect: "Connected node",
    submitButton: "Change",
    changeSuccessTitle: "USB mode changed",
    changeSuccessMessage: "USB mode changed successfully.",
    changeFailedTitle: "USB mode change failed",
    mode: {
      definitionsTitle: "USB mode definitions",
      usageWord: "Usage",
      host: "Host",
      hostDefinition: "Turns the USB_OTG port power on.",
      hostUsage:
        "Use when you want to connect USB devices (like keyboard, mouse, USB drive, etc) through the USB_OTG port to supported modules.",
      device: "Device",
      deviceDefinition: "The default mode. Turns the USB_OTG power off.",
      deviceUsage: "Use in any other case.",
      flash: "Flash",
      flashDefinition:
        "Turns the module into flashing mode and sets the USB_OTG into device mode.",
      flashUsage: "Use to flash the module using USB_OTG port.",
      usbNode1: "Node 1 USB-A compatibility mode",
      usbNode1Definition:
        "By selecting this option the primary USB interface of Node 1 gets routed to the USB-A port. Some modules dont have a secondary interface, such as Raspberry Pi CM4's and will therefore not work.",
      usbNode1Usage:
        "Use this option if USB devices are not detected when plugging in.",
    },
  },
  firmwareUpgrade: {
    header: "Upgrade BMC firmware",
    fileInput: ".tpu file (remote or local):",
    shaInput: "SHA-256 (optional):",
    submitButton: "Upgrade",
    ariaProgress: "Firmware upgrade progress",
    flashModalTitle: "Upgrade Firmware?",
    flashModalDescription:
      "A reboot is required to finalise the upgrade process.",
    uploading: "Uploading BMC firmware...",
    writing: "Writing firmware to BMC...",
    success: "Firmware upgrade successful",
    successMessage: "Firmware upgrade completed successfully.",
    uploadFailed: "Failed to upload the BMC firmware",
    writtenData: "{{written}} written",
    error: "An error has occurred",
    finishModalTitle: "Upgrade Finished!",
    finishModalDescription:
      "<0>To finalize the upgrade, a system reboot is necessary.</0><1>Would you like to proceed with the reboot now?</1><2>The nodes will temporarily lose power until the reboot process is completed.</2>",
  },
  flashNode: {
    header: "Install an OS image on a selected node",
    nodeSelect: "Selected node:",
    fileInput: "File (remote or local):",
    shaInput: "SHA-256 (optional):",
    skipCrc: "Skip CRC",
    submitButton: "Install OS",
    ariaProgress: "Flashing progress",
    flashModalTitle: "Install OS Image",
    flashModalDescription:
      "You are about to overwrite a new image to the selected node.",
    uploading: "Transferring image to node {{nodeId}}...",
    flashing: "Flashing image to node {{nodeId}}...",
    flashingCrc: "Checking CRC and flashing image to node {{nodeId}}...",
    transferFailed: "Failed to transfer the image to node {{nodeId}}",
    success: "Flashing successful",
    successMessage: "Image flashed successfully to the node",
  },
  about: {
    hostname: "Hostname",
    daemonVersion: "Daemon version",
    buildTime: "Build time",
    buildVersion: "Build version",
    buildrootRelease: "Buildroot release",
    apiVersion: "API version",
    bmcUI: "BMC UI",
  },
  ui: {
    cancel: "Cancel",
    continue: "Continue",
    reboot: "Reboot",
    selectPlaceholder: "Select...",
    navigation: "Navigation",
    pageNotFound: "Page Not Found",
    backToHome: "Back to home",
    ariaPasswordVisibility: "Toggle password visibility",
    ariaUploadFile: "Upload file",
    ariaSliderThumb: "Slider thumb",
  },
};

export default translations;

export type Translations = typeof translations;

/**
 * This type is used to define optional translations for a component.
 * If a key is not present, the default English translation will be used.
 */
export type OptionalTranslations = {
  [Key in keyof Translations]?: Translations[Key];
};
