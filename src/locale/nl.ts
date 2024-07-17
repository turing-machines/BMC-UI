import { type OptionalTranslations } from "@/locale/en";

const translations = {
  navigation: {
    info: "Info",
    nodes: "Nodes",
    usb: "USB",
    firmwareUpgrade: "Firmware-upgrade",
    flashNode: "Flash-node",
    about: "Over",
  },
  userNav: {
    language: "Taal",
    theme: "Thema",
    themeSystem: "Systeem",
    themeLight: "Licht",
    themeDark: "Donker",
    logout: "Uitloggen",
  },
  login: {
    header: "Inloggen",
    username: "Gebruikersnaam",
    password: "Wachtwoord",
    remember: "Onthoud mij",
    submit: "Inloggen",
    errorCredentials: "Ongeldige gebruikersnaam of wachtwoord",
    errorUnknown: "Er is een fout opgetreden. Probeer het later opnieuw.",
  },
  info: {
    userStorage: "Gebruikersopslag",
    ariaStorageUtilization: "Opslaggebruik",
    backupButton: "Back-up gebruikersgegevens",
    fanControl: "Ventilatorregeling",
    networkInterfaces: "Netwerkinterfaces",
    resetNetworkButton: "Netwerk resetten",
    bmc: "BMC",
    rebootButton: "Herstarten",
    reloadDaemonButton: "Daemon herladen",
    rebootModalTitle: "Wilt u opnieuw opstarten?",
    rebootModalDescription:
      "Houd er rekening mee dat de nodes de stroom verliezen totdat het systeem is opgestart.",
    backupSuccess: "Back-upbestand succesvol gedownload.",
    backupFailed: "Back-up van gebruikersgegevens mislukt.",
    resetNetworkSuccess: "Netwerk succesvol gereset.",
    resetNetworkFailed: "Netwerk resetten mislukt.",
    rebootSuccess: "De BMC wordt opnieuw opgestart...",
    rebootFailed: "BMC opnieuw opstarten mislukt",
    reloadDaemonSuccess: "De BMC-daemon wordt opnieuw geladen...",
    reloadDaemonFailed: "BMC-daemon herladen mislukt",
  },
  nodes: {
    header: "Stroomtoevoer van aangesloten nodes regelen",
    restartButton: "Herstarten",
    editButton: "Bewerken",
    saveButton: "Opslaan",
    ariaNodePowerToggle: "Stroomtoevoer van node {{nodeId}} in-/uitschakelen",
    node: "Node {{nodeId}}",
    module: "Module {{moduleId}}",
    nodeName: "Nodenaam",
    moduleName: "Modulenaam",
    powerManagement: "Stroombeheer",
    nodeOn: "Node {{nodeId}} is ingeschakeld.",
    nodeOff: "Node {{nodeId}} is uitgeschakeld.",
    nodeRestarted: "Node {{nodeId}} is opnieuw gestart.",
    pmError: "Fout bij het wijzigen van de nodestatus.",
    persistSuccess: "Node-informatie opgeslagen.",
  },
  usb: {
    header: "USB-route",
    modeSelect: "USB-modus",
    nodeSelect: "Aangesloten node",
    submitButton: "Wijzigen",
    changeSuccessTitle: "USB-modus gewijzigd",
    changeSuccessMessage: "USB-modus succesvol gewijzigd.",
    changeFailedTitle: "Wijzigen van USB-modus mislukt",
    mode: {
      definitionsTitle: "Definities van USB-modi",
      usageWord: "Gebruik",
      host: "Host",
      hostDefinition: "Schakelt de voeding van de USB_OTG-poort in.",
      hostUsage:
        "Gebruik wanneer u USB-apparaten (zoals toetsenbord, muis, USB-station, enz.) via de USB_OTG-poort op ondersteunde modules wilt aansluiten.",
      device: "Apparaat",
      deviceDefinition: "De standaardmodus. Schakelt de USB_OTG-voeding uit.",
      deviceUsage: "Gebruik in alle andere gevallen.",
      flash: "Flash",
      flashDefinition:
        "Zet de module in flashmodus en stelt de USB_OTG in op apparaatmodus.",
      flashUsage: "Gebruik om de module te flashen via de USB_OTG-poort.",
      usbNode1: "Node 1 USB-A compatibiliteitsmodus",
      usbNode1Definition:
        "Door deze optie te selecteren, wordt de primaire USB-interface van Node 1 naar de USB-A-poort geleid. Sommige modules zoals Raspberry Pi CM4 hebben geen secundaire interface en werken daarom niet.",
      usbNode1Usage:
        "Gebruik deze optie als USB-apparaten niet worden gedetecteerd bij het aansluiten.",
    },
  },
  firmwareUpgrade: {
    header: "BMC-firmware upgraden",
    fileInput: ".tpu-bestand (extern of lokaal):",
    shaInput: "SHA-256 (optioneel):",
    submitButton: "Upgraden",
    ariaProgress: "Voortgang firmware-upgrade",
    flashModalTitle: "Firmware upgraden?",
    flashModalDescription:
      "Een herstart is vereist om het upgradeproces te voltooien.",
    uploading: "BMC-firmware uploaden...",
    writing: "Firmware schrijven naar BMC...",
    success: "Firmware-upgrade geslaagd",
    successMessage: "Firmware-upgrade succesvol voltooid.",
    uploadFailed: "Uploaden van BMC-firmware mislukt",
    writtenData: "{{written}} geschreven",
    error: "Er is een fout opgetreden",
    finishModalTitle: "Upgrade voltooid!",
    finishModalDescription:
      "<0>Om de upgrade af te ronden, is een herstart van het systeem nodig.</0><1>Wilt u nu doorgaan met de herstart?</1><2>De nodes verliezen tijdelijk de stroom totdat het herstartsproces is voltooid.</2>",
  },
  flashNode: {
    header: "Installeer een besturingssysteemimage op een geselecteerde node",
    nodeSelect: "Geselecteerde node:",
    fileInput: "Bestand (extern of lokaal):",
    shaInput: "SHA-256 (optioneel):",
    skipCrc: "CRC overslaan",
    submitButton: "Besturingssysteem installeren",
    ariaProgress: "Voortgang flashen",
    flashModalTitle: "Besturingssysteemimage installeren",
    flashModalDescription:
      "U staat op het punt een nieuw image naar de geselecteerde node te schrijven.",
    uploading: "Image overbrengen naar node {{nodeId}}...",
    flashing: "Image flashen naar node {{nodeId}}...",
    flashingCrc: "CRC controleren en image flashen naar node {{nodeId}}...",
    transferFailed: "Overbrengen van image naar node {{nodeId}} mislukt",
    success: "Flashen geslaagd",
    successMessage: "Image succesvol geflasht naar de node",
  },
  about: {
    hostname: "Hostnaam",
    daemonVersion: "Daemonversie",
    buildTime: "Buildtijd",
    buildVersion: "Buildversie",
    buildrootRelease: "Buildroot-release",
    apiVersion: "API-versie",
    bmcUI: "BMC UI",
  },
  ui: {
    cancel: "Annuleren",
    continue: "Doorgaan",
    reboot: "Herstarten",
    selectPlaceholder: "Selecteer...",
    navigation: "Navigatie",
    pageNotFound: "Pagina niet gevonden",
    backToHome: "Terug naar startpagina",
    ariaPasswordVisibility: "Wachtwoordzichtbaarheid wisselen",
    ariaUploadFile: "Bestand uploaden",
    ariaSliderThumb: "Schuifregelaar",
  },
} satisfies OptionalTranslations;

export default translations;
