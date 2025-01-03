// src/locale/pl.ts
import { type OptionalTranslations } from "@/locale/en";

const translations = {
  navigation: {
    info: "Informacje",
    nodes: "Węzły",
    usb: "USB",
    firmwareUpgrade: "Aktualizacja oprogramowania",
    flashNode: "Flashowanie węzła",
    about: "O programie",
  },
  userNav: {
    language: "Język",
    theme: "Motyw",
    themeSystem: "Systemowy",
    themeLight: "Jasny",
    themeDark: "Ciemny",
    logout: "Wyloguj",
  },
  login: {
    header: "Logowanie",
    username: "Nazwa użytkownika",
    password: "Hasło",
    remember: "Zapamiętaj mnie",
    submit: "Zaloguj",
    errorCredentials: "Nieprawidłowa nazwa użytkownika lub hasło",
    errorUnknown: "Wystąpił błąd. Spróbuj ponownie później.",
  },
  info: {
    userStorage: "Pamięć użytkownika",
    ariaStorageUtilization: "Wykorzystanie pamięci",
    backupButton: "Utwórz kopię zapasową",
    fanControl: "Sterowanie wentylatorami",
    networkInterfaces: "Interfejsy sieciowe",
    resetNetworkButton: "Resetuj sieć",
    bmc: "BMC",
    rebootButton: "Uruchom ponownie",
    reloadDaemonButton: "Przeładuj demona",
    rebootModalTitle: "Czy chcesz ponownie uruchomić?",
    rebootModalDescription:
      "Pamiętaj, że węzły stracą zasilanie do czasu ponownego uruchomienia.",
    backupSuccess: "Kopia zapasowa została pomyślnie pobrana.",
    backupFailed: "Nie udało się utworzyć kopii zapasowej.",
    resetNetworkSuccess: "Reset sieci powiódł się.",
    resetNetworkFailed: "Reset sieci nie powiódł się.",
    rebootSuccess: "BMC jest ponownie uruchamiany...",
    rebootFailed: "Nie udało się ponownie uruchomić BMC",
    reloadDaemonSuccess: "Demon BMC jest przeładowywany...",
    reloadDaemonFailed: "Nie udało się przeładować demona BMC",
  },
  nodes: {
    header: "Kontroluj zasilanie podłączonych węzłów",
    restartButton: "Uruchom ponownie",
    editButton: "Edytuj",
    saveButton: "Zapisz",
    ariaNodePowerToggle: "Przełącz zasilanie węzła {{nodeId}}",
    node: "Węzeł {{nodeId}}",
    module: "Moduł {{moduleId}}",
    nodeName: "Nazwa węzła",
    moduleName: "Nazwa modułu",
    powerManagement: "Zarządzanie zasilaniem",
    nodeOn: "Węzeł {{nodeId}} został włączony.",
    nodeOff: "Węzeł {{nodeId}} został wyłączony.",
    nodeRestarted: "Węzeł {{nodeId}} został ponownie uruchomiony.",
    pmError: "Błąd podczas zmiany stanu węzła.",
    persistSuccess: "Informacje o węzłach zostały zapisane.",
    powerOffConfirmTitle: "Wyłączyć Węzeł {{nodeId}}?",
    powerOnConfirmTitle: "Włączyć Węzeł {{nodeId}}?",
    resetConfirmTitle: "Zresetować Węzeł {{nodeId}}?",
    powerOffConfirmDescription:
      "To wyłączy Węzeł {{nodeId}}. Wszystkie uruchomione procesy zostaną zakończone.",
    powerOnConfirmDescription: "To uruchomi Węzeł {{nodeId}}.",
    resetConfirmDescription:
      "To wymusi restart Węzła {{nodeId}}. Wszystkie niezapisane dane zostaną utracone.",
    dontAskAgain: "Nie pytaj ponownie o operacje zasilania węzłów",
  },
  usb: {
    header: "Trasa USB",
    modeSelect: "Tryb USB",
    nodeSelect: "Podłączony węzeł",
    submitButton: "Zmień",
    changeSuccessTitle: "Tryb USB zmieniony",
    changeSuccessMessage: "Tryb USB został pomyślnie zmieniony.",
    changeFailedTitle: "Zmiana trybu USB nie powiodła się",
    mode: {
      definitionsTitle: "Definicje trybu USB",
      usageWord: "Zastosowanie",
      host: "Host",
      hostDefinition: "Włącza zasilanie portu USB_OTG.",
      hostUsage:
        "Użyj, gdy chcesz podłączyć urządzenia USB (np. klawiaturę, mysz, dysk USB itp.) przez port USB_OTG do obsługiwanych modułów.",
      device: "Urządzenie",
      deviceDefinition: "Tryb domyślny. Wyłącza zasilanie USB_OTG.",
      deviceUsage: "Użyj w każdym innym przypadku.",
      flash: "Flash",
      flashDefinition:
        "Przełącza moduł w tryb flashowania i ustawia USB_OTG w tryb urządzenia.",
      flashUsage: "Użyj do flashowania modułu przez port USB_OTG.",
      usbNode1: "Tryb kompatybilności USB-A dla Węzła 1",
      usbNode1Definition:
        "Wybranie tej opcji powoduje przekierowanie głównego interfejsu USB Węzła 1 do portu USB-A. Niektóre moduły, takie jak Raspberry Pi CM4, nie mają interfejsu dodatkowego i dlatego nie będą działać.",
      usbNode1Usage:
        "Użyj tej opcji, jeśli urządzenia USB nie są wykrywane po podłączeniu.",
    },
  },
  firmwareUpgrade: {
    header: "Aktualizacja oprogramowania BMC",
    fileInput: "Plik .tpu (zdalnie lub lokalnie):",
    shaInput: "SHA-256 (opcjonalnie):",
    submitButton: "Aktualizuj",
    ariaProgress: "Postęp aktualizacji oprogramowania",
    flashModalTitle: "Zaktualizować oprogramowanie?",
    flashModalDescription:
      "Wymagany jest restart, aby sfinalizować proces aktualizacji.",
    uploading: "Przesyłanie oprogramowania BMC...",
    writing: "Zapisywanie oprogramowania do BMC...",
    success: "Aktualizacja oprogramowania powiodła się",
    successMessage: "Aktualizacja oprogramowania została pomyślnie ukończona.",
    uploadFailed: "Nie udało się przesłać oprogramowania BMC",
    writtenData: "Zapisano {{written}}",
    error: "Wystąpił błąd",
    finishModalTitle: "Aktualizacja zakończona!",
    finishModalDescription:
      "<0>Aby sfinalizować aktualizację, wymagany jest restart systemu.</0><1>Czy chcesz teraz przejść do restartu?</1><2>Węzły tymczasowo stracą zasilanie do czasu zakończenia procesu restartu.</2>",
  },
  flashNode: {
    header: "Zainstaluj obraz systemu operacyjnego na wybranym węźle",
    nodeSelect: "Wybrany węzeł:",
    fileInput: "Plik (zdalnie lub lokalnie):",
    shaInput: "SHA-256 (opcjonalnie):",
    skipCrc: "Pomiń CRC",
    submitButton: "Zainstaluj system",
    ariaProgress: "Postęp flashowania",
    flashModalTitle: "Zainstalować obraz systemu?",
    flashModalDescription: "Masz zamiar nadpisać nowy obraz na wybranym węźle.",
    uploading: "Przesyłanie obrazu do węzła {{nodeId}}...",
    flashing: "Flashowanie obrazu do węzła {{nodeId}}...",
    flashingCrc: "Sprawdzanie CRC i flashowanie obrazu do węzła {{nodeId}}...",
    transferFailed: "Nie udało się przesłać obrazu do węzła {{nodeId}}",
    success: "Flashowanie zakończone pomyślnie",
    successMessage: "Obraz został pomyślnie sflashowany na węźle",
  },
  about: {
    boardModel: "Model płyty",
    hostname: "Nazwa hosta",
    daemonVersion: "Wersja demona",
    buildTime: "Czas kompilacji",
    buildVersion: "Wersja kompilacji",
    buildrootRelease: "Wydanie Buildroot",
    apiVersion: "Wersja API",
    bmcUI: "BMC UI",
  },
  ui: {
    cancel: "Anuluj",
    continue: "Kontynuuj",
    reboot: "Uruchom ponownie",
    selectPlaceholder: "Wybierz...",
    navigation: "Nawigacja",
    pageNotFound: "Nie znaleziono strony",
    backToHome: "Powrót do strony głównej",
    ariaPasswordVisibility: "Przełącz widoczność hasła",
    ariaUploadFile: "Prześlij plik",
    ariaSliderThumb: "Suwak",
  },
} satisfies OptionalTranslations;

export default translations;
