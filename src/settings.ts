import { App, PluginSettingTab, Setting, Plugin } from 'obsidian';
import { Translations } from './i18n';

interface Img2HtmlPlugin extends Plugin {
	settings: {
		imageWidth: string;
		showNotice: boolean;
		imagePath: string;
		useCustomPath: boolean;
		includeAlt: boolean;
		useCustomAttributes: boolean;
		customAttributes: string;
	};
	i18n: Translations;
	saveSettings(): Promise<void>;
}

export class Img2HtmlSettingTab extends PluginSettingTab {
	plugin: Img2HtmlPlugin;

	constructor(app: App, plugin: Img2HtmlPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		const i18n = this.plugin.i18n;

		containerEl.empty();

		new Setting(containerEl)
			.setName(i18n.settings.imageWidth.name)
			.setDesc(i18n.settings.imageWidth.desc)
			.addText(text => text
				.setPlaceholder('auto')
				.setValue(this.plugin.settings.imageWidth)
				.onChange(async (value) => {
					this.plugin.settings.imageWidth = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(i18n.settings.useCustomPath.name)
			.setDesc(i18n.settings.useCustomPath.desc)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.useCustomPath)
				.onChange(async (value) => {
					this.plugin.settings.useCustomPath = value;
					await this.plugin.saveSettings();
				}));
				
		new Setting(containerEl)
			.setName(i18n.settings.imagePath.name)
			.setDesc(i18n.settings.imagePath.desc)
			.addText(text => text
				.setPlaceholder('./assets')
				.setValue(this.plugin.settings.imagePath)
				.onChange(async (value) => {
					this.plugin.settings.imagePath = value;
					await this.plugin.saveSettings();
				}));
				
		new Setting(containerEl)
			.setName(i18n.settings.includeAlt.name)
			.setDesc(i18n.settings.includeAlt.desc)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.includeAlt)
				.onChange(async (value) => {
					this.plugin.settings.includeAlt = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(i18n.settings.useCustomAttributes.name)
			.setDesc(i18n.settings.useCustomAttributes.desc)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.useCustomAttributes)
				.onChange(async (value) => {
					this.plugin.settings.useCustomAttributes = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
		.setName(i18n.settings.customAttributes.name)
		.setDesc(i18n.settings.customAttributes.desc)
		.addTextArea(text => {
			text.setPlaceholder('class="custom-style"')
				.setValue(this.plugin.settings.customAttributes)
				.onChange(async (value) => {
					this.plugin.settings.customAttributes = value;
					await this.plugin.saveSettings();
				});

			text.inputEl.style.resize = 'none';
			text.inputEl.style.height = '100px';
			text.inputEl.style.width = '100%';
		});


		new Setting(containerEl)
			.setName(i18n.settings.showNotice.name)
			.setDesc(i18n.settings.showNotice.desc)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showNotice)
				.onChange(async (value) => {
					this.plugin.settings.showNotice = value;
					await this.plugin.saveSettings();
				}));
	}
} 