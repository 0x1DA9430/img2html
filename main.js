/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => Img2HtmlPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/i18n.ts
var zh = {
  settings: {
    title: "Image to HTML \u8BBE\u7F6E",
    imageWidth: {
      name: "\u56FE\u7247\u5BBD\u5EA6",
      desc: "\u8BBE\u7F6E\u7C98\u8D34\u56FE\u7247\u7684\u5BBD\u5EA6\uFF0C\u53EF\u4EE5\u662F\u50CF\u7D20\u503C\uFF08\u5982 500px\uFF09\u6216\u767E\u5206\u6BD4\uFF08\u5982 100%\uFF09\u6216 auto"
    },
    useCustomPath: {
      name: "\u4F7F\u7528\u81EA\u5B9A\u4E49\u56FE\u7247\u8DEF\u5F84",
      desc: "\u542F\u7528\u540E\uFF0C\u56FE\u7247\u5C06\u4FDD\u5B58\u5230\u6307\u5B9A\u8DEF\u5F84\u800C\u4E0D\u662F\u5F53\u524D\u6587\u4EF6\u6240\u5728\u76EE\u5F55"
    },
    imagePath: {
      name: "\u81EA\u5B9A\u4E49\u56FE\u7247\u8DEF\u5F84",
      desc: "\u8BBE\u7F6E\u56FE\u7247\u4FDD\u5B58\u7684\u8DEF\u5F84\uFF0C\u53EF\u4EE5\u662F\u76F8\u5BF9\u8DEF\u5F84\uFF08\u5982 ./assets\uFF09\u6216\u7EDD\u5BF9\u8DEF\u5F84\uFF08\u5982 assets\uFF09"
    },
    includeAlt: {
      name: "\u5305\u542B alt \u5C5E\u6027",
      desc: "\u542F\u7528\u540E\uFF0CHTML \u56FE\u7247\u6807\u7B7E\u5C06\u5305\u542B alt \u5C5E\u6027\uFF0C\u6709\u52A9\u4E8E\u65E0\u969C\u788D\u6027\u548C SEO\uFF0C\u4F46\u4F1A\u4F7F\u6807\u7B7E\u66F4\u957F"
    },
    showNotice: {
      name: "\u663E\u793A\u901A\u77E5",
      desc: "\u7C98\u8D34\u56FE\u7247\u65F6\u663E\u793A\u901A\u77E5"
    }
  },
  statusBar: {
    enabled: "Img2Html: \u5F00\u542F"
  },
  notice: {
    imagePasted: "\u56FE\u7247\u5DF2\u7C98\u8D34\u4E3A HTML \u683C\u5F0F\uFF0C\u4FDD\u5B58\u5728"
  }
};
var en = {
  settings: {
    title: "Image to HTML Settings",
    imageWidth: {
      name: "Image Width",
      desc: "Set the width of pasted images, can be a pixel value (e.g. 500px), percentage (e.g. 100%) or auto"
    },
    useCustomPath: {
      name: "Use Custom Image Path",
      desc: "When enabled, images will be saved to the specified path instead of the current file directory"
    },
    imagePath: {
      name: "Custom Image Path",
      desc: "Set the path to save images, can be a relative path (e.g. ./assets) or absolute path (e.g. assets)"
    },
    includeAlt: {
      name: "Include alt Attribute",
      desc: "When enabled, HTML image tags will include the alt attribute, which helps with accessibility and SEO, but makes the tag longer"
    },
    showNotice: {
      name: "Show Notification",
      desc: "Show notification when pasting images"
    }
  },
  statusBar: {
    enabled: "Img2Html: Enabled"
  },
  notice: {
    imagePasted: "Image pasted as HTML format, saved in"
  }
};
function getTranslations() {
  const lang = window.localStorage.getItem("language");
  if (lang === "zh" || lang === "zh-TW") {
    return zh;
  }
  return en;
}

// main.ts
var DEFAULT_SETTINGS = {
  imageWidth: "auto",
  showNotice: true,
  imagePath: "./assets",
  useCustomPath: false,
  includeAlt: false
};
var Img2HtmlPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.i18n = getTranslations();
    this.registerEvent(
      this.app.workspace.on("editor-paste", this.handlePaste.bind(this))
    );
    this.settingTab = new Img2HtmlSettingTab(this.app, this);
    this.addSettingTab(this.settingTab);
    this.statusBarItemEl = this.addStatusBarItem();
    this.statusBarItemEl.setText(this.i18n.statusBar.enabled);
    this.registerDomEvent(window, "storage", (e) => {
      if (e.key === "language") {
        this.updateI18n();
      }
    });
  }
  onunload() {
  }
  /**
   * 更新国际化翻译并刷新界面
   */
  updateI18n() {
    this.i18n = getTranslations();
    this.statusBarItemEl.setText(this.i18n.statusBar.enabled);
    if (this.settingTab && this.settingTab.containerEl.parentElement) {
      this.settingTab.display();
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  /**
   * 处理粘贴事件
   */
  async handlePaste(evt, editor, view) {
    var _a, _b, _c;
    if (!((_a = evt.clipboardData) == null ? void 0 : _a.files.length)) {
      return;
    }
    evt.preventDefault();
    const file = evt.clipboardData.files[0];
    if (!file.type.startsWith("image/")) {
      return;
    }
    const activeFile = view.file;
    if (!activeFile) {
      return;
    }
    const timestamp = (/* @__PURE__ */ new Date()).getTime();
    const fileName = `image_${timestamp}.${this.getFileExtension(file.type)}`;
    let imagePath = "";
    let imageDir = "";
    if (this.settings.useCustomPath) {
      const basePath = ((_b = activeFile.parent) == null ? void 0 : _b.path) || "";
      const customPath = this.settings.imagePath.trim();
      const normalizedCustomPath = customPath.startsWith("/") ? customPath.substring(1) : customPath;
      if (normalizedCustomPath.startsWith("./") || normalizedCustomPath.startsWith("../")) {
        imageDir = (0, import_obsidian.normalizePath)(`${basePath}/${normalizedCustomPath}`);
      } else {
        imageDir = (0, import_obsidian.normalizePath)(normalizedCustomPath);
      }
      if (!await this.app.vault.adapter.exists(imageDir)) {
        await this.app.vault.createFolder(imageDir);
      }
      imagePath = `${imageDir}/${fileName}`;
    } else {
      const basePath = ((_c = activeFile.parent) == null ? void 0 : _c.path) || "";
      imageDir = basePath;
      imagePath = `${basePath}/${fileName}`;
    }
    const buffer = await file.arrayBuffer();
    await this.app.vault.createBinary(imagePath, buffer);
    const imgTag = this.createHtmlImgTag(fileName, imagePath, imageDir);
    editor.replaceSelection(imgTag);
    if (this.settings.showNotice) {
      new import_obsidian.Notice(`${this.i18n.notice.imagePasted} ${imageDir}`);
    }
  }
  /**
   * 根据 MIME 类型获取文件扩展名
   */
  getFileExtension(mimeType) {
    const mimeToExt = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/svg+xml": "svg",
      "image/webp": "webp",
      "image/bmp": "bmp",
      "image/tiff": "tiff"
    };
    return mimeToExt[mimeType] || "png";
  }
  /**
   * 创建 HTML 图片标签
   */
  createHtmlImgTag(fileName, imagePath, imageDir) {
    let src = "";
    if (this.settings.useCustomPath) {
      const customPath = this.settings.imagePath.trim();
      if (customPath.startsWith("./") || customPath.startsWith("../")) {
        src = `${customPath}/${fileName}`;
      } else {
        src = `./${customPath}/${fileName}`.replace(/\/\//g, "/");
      }
    } else {
      src = fileName;
    }
    if (this.settings.includeAlt) {
      return `<img src="${src}" width="${this.settings.imageWidth}" alt="${fileName}">`;
    } else {
      return `<img src="${src}" width="${this.settings.imageWidth}">`;
    }
  }
};
var Img2HtmlSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const i18n = this.plugin.i18n;
    containerEl.empty();
    containerEl.createEl("h2", { text: i18n.settings.title });
    new import_obsidian.Setting(containerEl).setName(i18n.settings.imageWidth.name).setDesc(i18n.settings.imageWidth.desc).addText((text) => text.setPlaceholder("auto").setValue(this.plugin.settings.imageWidth).onChange(async (value) => {
      this.plugin.settings.imageWidth = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName(i18n.settings.useCustomPath.name).setDesc(i18n.settings.useCustomPath.desc).addToggle((toggle) => toggle.setValue(this.plugin.settings.useCustomPath).onChange(async (value) => {
      this.plugin.settings.useCustomPath = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName(i18n.settings.imagePath.name).setDesc(i18n.settings.imagePath.desc).addText((text) => text.setPlaceholder("./assets").setValue(this.plugin.settings.imagePath).onChange(async (value) => {
      this.plugin.settings.imagePath = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName(i18n.settings.includeAlt.name).setDesc(i18n.settings.includeAlt.desc).addToggle((toggle) => toggle.setValue(this.plugin.settings.includeAlt).onChange(async (value) => {
      this.plugin.settings.includeAlt = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName(i18n.settings.showNotice.name).setDesc(i18n.settings.showNotice.desc).addToggle((toggle) => toggle.setValue(this.plugin.settings.showNotice).onChange(async (value) => {
      this.plugin.settings.showNotice = value;
      await this.plugin.saveSettings();
    }));
  }
};
