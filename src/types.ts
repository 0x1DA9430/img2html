/**
 * Plugin settings interface
 */
export interface Img2HtmlSettings {
	// Image width setting, can be fixed value or percentage
	imageWidth: string;
	// Whether to show notification when pasting
	showNotice: boolean;
	// Custom image save path
	imagePath: string;
	// Whether to use custom path
	useCustomPath: boolean;
	// Whether to include alt attribute
	includeAlt: boolean;
	// Whether to use custom HTML attributes
	useCustomAttributes: boolean;
	// String of custom HTML attributes
	customAttributes: string;
}

/**
 * Default settings
 */
export const DEFAULT_SETTINGS: Img2HtmlSettings = {
	imageWidth: 'auto',
	showNotice: true,
	imagePath: './assets',
	useCustomPath: false,
	includeAlt: false,
	useCustomAttributes: false,
	customAttributes: ''
};
 