/**
 * Get file extension from MIME type
 */
export function getFileExtension(mimeType: string): string {
	const mimeToExt: Record<string, string> = {
		'image/jpeg': 'jpg',
		'image/png': 'png',
		'image/gif': 'gif',
		'image/svg+xml': 'svg',
		'image/webp': 'webp',
		'image/bmp': 'bmp',
		'image/tiff': 'tiff'
	};
	
	return mimeToExt[mimeType] || 'png';
}

/**
 * Create HTML image tag
 */
export function createHtmlImgTag(
	fileName: string, 
	imagePath: string, 
	imageDir: string, 
	useCustomPath: boolean,
	customPath: string,
	imageWidth: string,
	includeAlt: boolean,
	useCustomAttributes: boolean,
	customAttributes: string
): string {
	let src = '';
	
	if (useCustomPath) {
		// Use custom path
		const path = customPath.trim();
		
		// If relative path (starts with ./ or ../)
		if (path.startsWith('./') || path.startsWith('../')) {
			src = `${path}/${fileName}`;
		} else {
			// Use custom path directly without ./ prefix
			src = `${path}/${fileName}`.replace(/\/\//g, '/');
		}
	} else {
		// Use default path (same directory as current file)
		src = fileName;
	}
	
	// Build HTML tag
	if (useCustomAttributes) {
		const attrs = customAttributes.trim().replace(/>/g, '');
		const space = attrs ? ' ' : '';
		return `<img src="${src}"${space}${attrs}>`;
	} else if (includeAlt) {
		return `<img src="${src}" width="${imageWidth}" alt="${fileName}">`;
	} else {
		return `<img src="${src}" width="${imageWidth}">`;
	}
} 