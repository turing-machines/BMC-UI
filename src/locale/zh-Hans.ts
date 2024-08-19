import { type OptionalTranslations } from "@/locale/en";

const translations = {
  navigation: {
    info: "信息",
    nodes: "节点",
    usb: "USB",
    firmwareUpgrade: "固件升级",
    flashNode: "刷写节点",
    about: "关于",
  },
  userNav: {
    language: "语言",
    theme: "主题",
    themeSystem: "系统",
    themeLight: "亮",
    themeDark: "暗",
    logout: "登出",
  },
  login: {
    header: "登录",
    username: "用户名",
    password: "密码",
    remember: "记住我",
    submit: "登录",
    errorCredentials: "无效的用户名或密码",
    errorUnknown: "发生错误。请稍后再试。",
  },
  info: {
    userStorage: "用户存储",
    ariaStorageUtilization: "存储使用率",
    backupButton: "备份用户数据",
    fanControl: "风扇控制",
    networkInterfaces: "网络接口",
    resetNetworkButton: "重置网络",
    bmc: "BMC",
    rebootButton: "重启",
    reloadDaemonButton: "重新加载守护进程",
    rebootModalTitle: "是否要重启？",
    rebootModalDescription: "请注意，节点将在重启过程中断电。",
    backupSuccess: "成功下载备份文件。",
    backupFailed: "用户数据备份失败。",
    resetNetworkSuccess: "网络重置成功。",
    resetNetworkFailed: "网络重置失败。",
    rebootSuccess: "BMC 正在重启...",
    rebootFailed: "重启 BMC 失败",
    reloadDaemonSuccess: "BMC 守护进程正在重新加载...",
    reloadDaemonFailed: "重新加载 BMC 守护进程失败",
  },
  nodes: {
    header: "控制连接节点的电源",
    restartButton: "重新启动",
    editButton: "编辑",
    saveButton: "保存",
    ariaNodePowerToggle: "切换节点 {{nodeId}} 电源",
    node: "节点 {{nodeId}}",
    module: "模块 {{moduleId}}",
    nodeName: "节点名称",
    moduleName: "模块名称",
    powerManagement: "电源管理",
    nodeOn: "节点 {{nodeId}} 已开启。",
    nodeOff: "节点 {{nodeId}} 已关闭。",
    nodeRestarted: "节点 {{nodeId}} 已重新启动。",
    pmError: "更改节点状态时出错。",
    persistSuccess: "节点信息已保存。",
  },
  usb: {
    header: "USB 路由",
    modeSelect: "USB 模式",
    nodeSelect: "连接的节点",
    submitButton: "更改",
    changeSuccessTitle: "USB 模式已更改",
    changeSuccessMessage: "USB 模式更改成功。",
    changeFailedTitle: "USB 模式更改失败",
    mode: {
      definitionsTitle: "USB 模式定义",
      usageWord: "用法",
      host: "主机",
      hostDefinition: "打开 USB_OTG 端口电源。",
      hostUsage:
        "当您想通过 USB_OTG 端口将 USB 设备（如键盘、鼠标、USB 驱动器等）连接到支持的模块时使用。",
      device: "设备",
      deviceDefinition: "默认模式。关闭 USB_OTG 电源。",
      deviceUsage: "在任何其他情况下使用。",
      flash: "刷写",
      flashDefinition: "将模块转换为刷写模式，并将 USB_OTG 设置为设备模式。",
      flashUsage: "用于使用 USB_OTG 端口刷写模块。",
      usbNode1: "节点1 USB-A 兼容模式",
      usbNode1Definition:
        "选择此选项会将节点1的主USB接口路由到USB-A端口。某些模块（如Raspberry Pi CM4）没有辅助接口，因此将无法工作。",
      usbNode1Usage: "如果插入时无法检测到USB设备，请使用此选项。",
    },
  },
  firmwareUpgrade: {
    header: "升级 BMC 固件",
    fileInput: ".tpu 文件（远程或本地）：",
    shaInput: "SHA-256（可选）：",
    submitButton: "升级",
    ariaProgress: "固件升级进度",
    flashModalTitle: "升级固件？",
    flashModalDescription: "需要重启以完成升级过程。",
    uploading: "正在上传 BMC 固件...",
    writing: "正在将固件写入 BMC...",
    success: "固件升级成功",
    successMessage: "固件升级已成功完成。",
    uploadFailed: "上传 BMC 固件失败",
    writtenData: "已写入 {{written}}",
    error: "发生错误",
    finishModalTitle: "升级完成！",
    finishModalDescription:
      "<0>要完成升级，需要重启系统。</0><1>是否要立即重启？</1><2>在重启过程完成之前，节点将暂时断电。</2>",
  },
  flashNode: {
    header_one: "在选定的节点上安装操作系统镜像",
    header_other: "在选定的多个节点上安装操作系统镜像",
    nodeSelect_one: "选定的节点：",
    nodeSelect_other: "选定的节点：",
    fileInput: "文件（远程或本地）：",
    shaInput: "SHA-256（可选）：",
    skipCrc: "跳过 CRC",
    submitButton: "安装操作系统",
    ariaProgress: "刷写进度",
    flashModalTitle: "安装操作系统镜像",
    flashModalDescription: "您即将覆盖选定节点上的新镜像。",
    uploading_one: "正在将镜像传输到节点...",
    uploading_other: "正在将镜像传输到多个节点...",
    flashing_one: "正在将镜像刷写到节点...",
    flashing_other: "正在将镜像刷写到多个节点...",
    flashingCrc_one: "正在检查 CRC 并将镜像刷写到节点...",
    flashingCrc_other: "正在检查 CRC 并将镜像刷写到多个节点...",
    transferFailed_one: "将镜像传输到节点失败",
    transferFailed_other: "将镜像传输到多个节点失败",
    success: "刷写成功",
    successMessage: "镜像已成功刷写到节点。",
  },
  about: {
    boardModel: "主板型号",
    hostname: "主机名",
    daemonVersion: "守护进程版本",
    buildTime: "构建时间",
    buildVersion: "构建版本",
    buildrootRelease: "Buildroot 发行版",
    apiVersion: "API 版本",
    bmcUI: "BMC UI",
  },
  ui: {
    cancel: "取消",
    continue: "继续",
    reboot: "重启",
    selectPlaceholder: "选择...",
    navigation: "导航",
    pageNotFound: "找不到页面",
    backToHome: "返回首页",
    ariaPasswordVisibility: "切换密码可见性",
    ariaUploadFile: "上传文件",
    ariaSliderThumb: "滑块标记",
  },
} satisfies OptionalTranslations;

export default translations;
