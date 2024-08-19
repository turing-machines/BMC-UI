import { type OptionalTranslations } from "@/locale/en";

const translations = {
  navigation: {
    info: "Info",
    nodes: "Knoten",
    usb: "USB",
    firmwareUpgrade: "Firmware-Upgrade",
    flashNode: "Knoten flashen",
    about: "Über",
  },
  userNav: {
    language: "Sprache",
    theme: "Thema",
    themeSystem: "System",
    themeLight: "Hell",
    themeDark: "Dunkel",
    logout: "Abmelden",
  },
  login: {
    header: "Einloggen",
    username: "Benutzername",
    password: "Passwort",
    remember: "Angemeldet bleiben",
    submit: "Einloggen",
    errorCredentials: "Ungültiger Benutzername oder Passwort",
    errorUnknown:
      "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
  },
  info: {
    userStorage: "Benutzerspeicher",
    ariaStorageUtilization: "Speicherauslastung",
    backupButton: "Benutzerdaten sichern",
    fanControl: "Lüftersteuerung",
    networkInterfaces: "Netzwerkschnittstellen",
    resetNetworkButton: "Netzwerk zurücksetzen",
    bmc: "BMC",
    rebootButton: "Neustarten",
    reloadDaemonButton: "Daemon neu laden",
    rebootModalTitle: "Möchten Sie neu starten?",
    rebootModalDescription:
      "Beachten Sie, dass die Knoten bis zum Neustart keine Stromversorgung haben.",
    backupSuccess: "Sicherungsdatei erfolgreich heruntergeladen.",
    backupFailed: "Sicherung der Benutzerdaten fehlgeschlagen.",
    resetNetworkSuccess: "Netzwerk erfolgreich zurückgesetzt.",
    resetNetworkFailed: "Netzwerk-Reset fehlgeschlagen.",
    rebootSuccess: "Das BMC wird neu gestartet...",
    rebootFailed: "Neustart des BMC fehlgeschlagen",
    reloadDaemonSuccess: "Der BMC-Daemon wird neu geladen...",
    reloadDaemonFailed: "Neuladen des BMC-Daemons fehlgeschlagen",
  },
  nodes: {
    header: "Stromversorgung der verbundenen Knoten steuern",
    restartButton: "Neu starten",
    editButton: "Bearbeiten",
    saveButton: "Speichern",
    ariaNodePowerToggle: "Stromversorgung von Knoten {{nodeId}} umschalten",
    node: "Knoten {{nodeId}}",
    module: "Modul {{moduleId}}",
    nodeName: "Knotenname",
    moduleName: "Modulname",
    powerManagement: "Stromverwaltung",
    nodeOn: "Knoten {{nodeId}} wurde eingeschaltet.",
    nodeOff: "Knoten {{nodeId}} wurde ausgeschaltet.",
    nodeRestarted: "Knoten {{nodeId}} wurde neu gestartet.",
    pmError: "Fehler beim Ändern des Knotenstatus.",
    persistSuccess: "Knoteninformationen gespeichert.",
  },
  usb: {
    header: "USB-Route",
    modeSelect: "USB-Modus",
    nodeSelect: "Verbundener Knoten",
    submitButton: "Ändern",
    changeSuccessTitle: "USB-Modus geändert",
    changeSuccessMessage: "USB-Modus erfolgreich geändert.",
    changeFailedTitle: "Ändern des USB-Modus fehlgeschlagen",
    mode: {
      definitionsTitle: "Definitionen des USB-Modus",
      usageWord: "Verwendung",
      host: "Host",
      hostDefinition: "Schaltet die Stromversorgung des USB_OTG-Ports ein.",
      hostUsage:
        "Verwenden Sie diese Option, wenn Sie USB-Geräte (wie Tastatur, Maus, USB-Laufwerk usw.) über den USB_OTG-Port mit unterstützten Modulen verbinden möchten.",
      device: "Gerät",
      deviceDefinition:
        "Der Standardmodus. Schaltet die USB_OTG-Stromversorgung aus.",
      deviceUsage: "In allen anderen Fällen verwenden.",
      flash: "Flash",
      flashDefinition:
        "Versetzt das Modul in den Flash-Modus und setzt den USB_OTG in den Gerätemodus.",
      flashUsage:
        "Verwenden Sie diese Option, um das Modul über den USB_OTG-Port zu flashen.",
      usbNode1: "Node 1 USB-A Kompatibilitätsmodus",
      usbNode1Definition:
        "Durch Auswahl dieser Option wird die primäre USB-Schnittstelle von Node 1 zum USB-A-Anschluss geleitet. Einige Module wie Raspberry Pi CM4 haben keine sekundäre Schnittstelle und funktionieren daher nicht.",
      usbNode1Usage:
        "Verwenden Sie diese Option, wenn USB-Geräte beim Einstecken nicht erkannt werden.",
    },
  },
  firmwareUpgrade: {
    header: "BMC-Firmware aktualisieren",
    fileInput: ".tpu-Datei (Remote oder lokal):",
    shaInput: "SHA-256 (optional):",
    submitButton: "Aktualisieren",
    ariaProgress: "Fortschritt der Firmware-Aktualisierung",
    flashModalTitle: "Firmware aktualisieren?",
    flashModalDescription:
      "Ein Neustart ist erforderlich, um den Aktualisierungsvorgang abzuschließen.",
    uploading: "BMC-Firmware wird hochgeladen...",
    writing: "Firmware wird auf das BMC geschrieben...",
    success: "Firmware-Aktualisierung erfolgreich",
    successMessage: "Firmware-Aktualisierung erfolgreich abgeschlossen.",
    uploadFailed: "Hochladen der BMC-Firmware fehlgeschlagen",
    writtenData: "{{written}} geschrieben",
    error: "Ein Fehler ist aufgetreten",
    finishModalTitle: "Aktualisierung abgeschlossen!",
    finishModalDescription:
      "<0>Um die Aktualisierung abzuschließen, ist ein Systemneustart erforderlich.</0><1>Möchten Sie jetzt mit dem Neustart fortfahren?</1><2>Die Knoten verlieren vorübergehend die Stromversorgung, bis der Neustart abgeschlossen ist.</2>",
  },
  flashNode: {
    header_one:
      "Installiere ein Betriebssystemabbild auf einem ausgewählten Knoten",
    header_other:
      "Installiere ein Betriebssystemabbild auf ausgewählten Knoten",
    nodeSelect_one: "Ausgewählter Knoten:",
    nodeSelect_other: "Ausgewählte Knoten:",
    fileInput: "Datei (Remote oder lokal):",
    shaInput: "SHA-256 (optional):",
    skipCrc: "CRC überspringen",
    submitButton: "Betriebssystem installieren",
    ariaProgress: "Fortschritt beim Flashen",
    flashModalTitle: "Betriebssystemabbild installieren",
    flashModalDescription:
      "Sie sind dabei, ein neues Image auf den ausgewählten Knoten zu überschreiben.",
    uploading_one: "Übertrage Image auf Knoten...",
    uploading_other: "Übertrage Image auf Knoten...",
    flashing_one: "Flashe Image auf Knoten...",
    flashing_other: "Flashe Image auf Knoten...",
    flashingCrc_one: "Prüfe CRC und flashe Image auf Knoten...",
    flashingCrc_other: "Prüfe CRC und flashe Image auf Knoten...",
    transferFailed_one: "Übertragung des Images auf Knoten fehlgeschlagen",
    transferFailed_other: "Übertragung des Images auf Knoten fehlgeschlagen",
    success: "Flashen erfolgreich",
    successMessage: "Image erfolgreich auf den Knoten geflasht",
  },
  about: {
    boardModel: "Board-Modell",
    hostname: "Hostname",
    daemonVersion: "Daemon-Version",
    buildTime: "Build-Zeit",
    buildVersion: "Build-Version",
    buildrootRelease: "Buildroot-Release",
    apiVersion: "API-Version",
    bmcUI: "BMC UI",
  },
  ui: {
    cancel: "Abbrechen",
    continue: "Fortfahren",
    reboot: "Neu starten",
    selectPlaceholder: "Auswählen...",
    navigation: "Navigation",
    pageNotFound: "Seite nicht gefunden",
    backToHome: "Zurück zur Startseite",
    ariaPasswordVisibility: "Passwort-Sichtbarkeit umschalten",
    ariaUploadFile: "Datei hochladen",
    ariaSliderThumb: "Schieberegler-Daumen",
  },
} satisfies OptionalTranslations;

export default translations;
