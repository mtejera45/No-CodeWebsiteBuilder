# Interactive No-Code Website Builder Application

This is an interactive No-Code Website Builder application created to demonstrate web development skills using React, Redux and Vite. The application allows users to add and manipulate different elements such as background images, stickers, and text on a canvas.

## Features

- **Interactive Canvas**: Allows create and placing elements.
- **Add Background Image**: Option to select and add a background image.
- **Add Stickers**: Option to select and add stickers.
- **Add Text**: Add and edit text on the canvas.
- **Toolbar**: Tools to manage and manipulate the elements on the canvas.
- **Color Picker**: Choose colors for different elements.
- **Image Gallery**: Desktop and mobile views for selecting images.
- **Previews**: Desktop and mobile previews of the canvas.
- **Pop-Ups**: For notifications and waiting messages.

## Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/mtejera45/noCodeWebsiteBuilder.git
    ```
2. Navigate to the project directory:
    ```sh
    cd noCodeWebsiteBuilder
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To start the application in development mode, use:
```sh
npm run dev
```
This will open the application in your browser at [http://localhost:5174].

To build the application for production, use:
```sh
npm run build
```

## Main Files and Components

### Application Structure
- **`App.jsx`**: Main component of the application.
- **`main.jsx`**: Entry point of the application.

### Canvas and Tools
- **`Canvas.jsx`**: Component for the canvas where elements are drawn and manipulated.
- **`ElementToolBar.jsx`**: Toolbar for selecting and manipulating elements.
- **`ToolBar.jsx`**: Main toolbar.

### Image and Sticker Handling
- **`AddImageBackground.jsx`**: Component to add a background image.
- **`AddImageSticker.jsx`**: Component to add stickers.
- **`ImageGalleryDesktop.jsx`**: Desktop view for selecting images.
- **`ImageGalleryMobile.jsx`**: Mobile view for selecting images.
- **`ImageGalleryStickers.jsx`**: Component for selecting stickers.

### Text and Color
- **`TextArea.jsx`**: Component to add and edit text.
- **`ColorPicker.jsx`**: Component for picking colors.
- **`GetContrastingColor.jsx`**: Utility to get contrasting colors.

### Previews and Opacity
- **`DesktopPreview.jsx`**: Desktop preview of the canvas.
- **`MobilePreview.jsx`**: Mobile preview of the canvas.
- **`AdjustOpacity.jsx`**: Component to adjust opacity of elements.

### Utilities and Helpers
- **`GetErrorMessages.jsx`**: Utility to get error messages.
- **`ImageSearchBar.jsx`**: Component for image search bar.

### Pop-Ups
- **`PopUp.jsx`**: Component for displaying pop-up notifications.
- **`WaitingPopUp.jsx`**: Component for displaying waiting messages.

## Contributing

Contributions are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/new-feature
    ```
3. Make your changes and commit them:
    ```sh
    git commit -am 'Add new feature'
    ```
4. Push the branch:
    ```sh
    git push origin feature/new-feature
    ```
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for checking out this project! I hope you find this demonstration application useful.
