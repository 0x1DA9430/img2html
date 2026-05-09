# Image to HTML

[中文文档](README_CN.md)

A plugin for Obsidian that converts pasted images to HTML format instead of Obsidian's wikilink or Markdown format.

## Features

- Saves pasted images as files and inserts them as HTML image tags
- Supports custom image width
- Supports custom image save paths (e.g., `./assets`)
- Optional alt attribute for better accessibility
- Optional paste notifications

## Why HTML Format?

HTML image tags offer better compatibility across different platforms compared to Markdown or Obsidian's wikilink format. This is particularly useful for users who need to share their notes across different platforms and Markdown editors.

## Usage

1. Install the plugin in Obsidian
2. Copy an image (from browser, file explorer, or screenshot tool)
3. Paste in the Obsidian editor
4. The image will be saved and inserted as HTML: `<img src="image_name.jpg" width="auto">`

### Custom Image Path

You can enable the "Use Custom Image Path" option in settings and set a custom save path for your images:

- Relative paths (e.g., `./assets` or `../images`): Images will be saved in the specified directory relative to the current file
- Absolute paths (e.g., `assets` or `images`): Images will be saved in the specified directory under your vault root

When custom path is enabled, the src attribute in HTML tags will be updated accordingly, for example:
```html
<img src="./assets/image_1234567890.jpg" width="auto">
```

If custom path is disabled, images will be saved in the same directory as the current file, and the HTML tag will only use the filename:
```html
<img src="image_1234567890.jpg" width="auto">
```

### About Alt Attribute

By default, the plugin generates HTML tags without the alt attribute to keep the code concise. If you need better accessibility or SEO optimization, you can enable the "Include Alt Attribute" option in settings, which will generate tags like:

```html
<img src="image_1234567890.jpg" width="auto" alt="image_1234567890.jpg">
```

### About Custom Attributes

You can enable "Use custom attributes" to disable both the image width and alt tag setting in favor of a fully custom list of attributes, such as a custom CSS class or variables therein. Using this function, you can generate tags like:

```html
<img src="./assets/image_1778330017341.png" class="image-class" style="--img-width: 40vw;">
```

## Settings

- **Image Width**: Set the image width, can be pixels (e.g., 500px), percentage (e.g., 100%), or auto
- **Use Custom Image Path**: When enabled, images will be saved to the specified path instead of the current file's directory
- **Custom Image Path**: Set the image save path, can be relative (e.g., ./assets) or absolute (e.g., assets)
- **Include Alt Attribute**: When enabled, HTML image tags will include the alt attribute for better accessibility and SEO
- **Use Custom Attributes**: When enabled, uses custom HTML attributes specified below (e.g. a custom class) and ignores the image width and alt tag setting
- **Custom Attributes**: String of custom attributes to use for the final HTML output
- **Show Notifications**: Choose whether to show notifications when pasting images

## Installation

### From Obsidian Community Plugins

1. Open Obsidian Settings
2. Go to "Community Plugins"
3. Disable "Safe Mode"
4. Click "Browse"
5. Search for "Image to HTML"
6. Click Install
7. Enable the plugin

### Manual Installation

1. Download the latest version of `main.js`, `manifest.json`, and `styles.css`
2. Copy these files to your vault's `.obsidian/plugins/img2html/` directory

## Development

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start compilation in watch mode
4. Copy `main.js` and `manifest.json` to your vault's `.obsidian/plugins/img2html/` directory for testing

## License

MIT 
