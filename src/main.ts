import { App, Editor, MarkdownView, Notice, Plugin, TFile, normalizePath } from 'obsidian';
import { getTranslations, Translations } from './i18n';
import { Img2HtmlSettings, DEFAULT_SETTINGS } from './types';
import { Img2HtmlSettingTab } from './settings';
import { getFileExtension, createHtmlImgTag } from './utils';

export default class Img2HtmlPlugin extends Plugin {
	settings: Img2HtmlSettings;
	i18n: Translations;
	settingTab: Img2HtmlSettingTab;

	async onload() {
		await this.loadSettings();
		
		// Load translations
		this.i18n = getTranslations();

		// Register editor paste event
		this.registerEvent(
			this.app.workspace.on('editor-paste', this.handlePaste.bind(this))
		);

		// Add settings tab
		this.settingTab = new Img2HtmlSettingTab(this.app, this);
		this.addSettingTab(this.settingTab);
	}

	onunload() {
		// Cleanup when plugin is disabled
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * Handle paste event
	 */
	async handlePaste(evt: ClipboardEvent, editor: Editor, view: MarkdownView) {
		// If no files in clipboard, do nothing
		if (!evt.clipboardData?.files.length) {
			return;
		}

		// Prevent default paste behavior
		evt.preventDefault();

		const file = evt.clipboardData.files[0];
		
		// Check if file is an image
		if (!file.type.startsWith('image/')) {
			return;
		}

		// Get current file
		const activeFile = view.file;
		if (!activeFile) {
			return;
		}

		// Generate image filename
		const timestamp = new Date().getTime();
		const fileName = `image_${timestamp}.${getFileExtension(file.type)}`;
		
		// Create image file path
		let imagePath = '';
		let imageDir = '';
		
		if (this.settings.useCustomPath) {
			// Use custom path
			const basePath = activeFile.parent?.path || '';
			const customPath = this.settings.imagePath.trim();
			
			// Ensure custom path doesn't start with slash
			const normalizedCustomPath = customPath.startsWith('/') 
				? customPath.substring(1) 
				: customPath;
				
			// If relative path (starts with ./ or ../)
			if (normalizedCustomPath.startsWith('./') || normalizedCustomPath.startsWith('../')) {
				// Use relative path directly
				imageDir = normalizePath(`${basePath}/${normalizedCustomPath}`);
			} else {
				// Otherwise treat as path from vault root
				imageDir = normalizePath(normalizedCustomPath);
			}
			
			// Ensure directory exists
			if (!await this.app.vault.adapter.exists(imageDir)) {
				await this.app.vault.createFolder(imageDir);
			}
			
			imagePath = `${imageDir}/${fileName}`;
		} else {
			// Use default path (same directory as current file)
			const basePath = activeFile.parent?.path || '';
			imageDir = basePath;
			imagePath = `${basePath}/${fileName}`;
		}
		
		// Read image file content
		const buffer = await file.arrayBuffer();
		
		// Save image to vault
		await this.app.vault.createBinary(imagePath, buffer);
		
		// Build HTML image tag
		const imgTag = createHtmlImgTag(
			fileName, 
			imagePath, 
			imageDir, 
			this.settings.useCustomPath,
			this.settings.imagePath,
			this.settings.imageWidth,
			this.settings.includeAlt,
		this.settings.useCustomAttributes,
		this.settings.customAttributes
		);
		
		// Insert HTML image tag into editor
		editor.replaceSelection(imgTag);
		
		// Show notification
		if (this.settings.showNotice) {
			new Notice(`${this.i18n.notice.imagePasted} ${imageDir}`);
		}
	}
} 