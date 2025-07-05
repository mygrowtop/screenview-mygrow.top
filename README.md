# Responsive Viewer

A powerful tool for previewing websites on different devices and screen sizes simultaneously. Perfect for developers, designers, and QA testers who need to ensure their websites are responsive across multiple devices.

![Responsive Viewer Screenshot](https://via.placeholder.com/1200x600/0f172a/3b82f6?text=Responsive+Viewer)

## Features

- **Multi-device Preview**: View your website on multiple devices simultaneously
- **Device Selection**: Choose from popular device presets or create custom screen sizes
- **Customizable Layout**: Switch between grid and list views to organize your previews
- **Scale Control**: Adjust the scale of device frames to fit more on your screen
- **Real-time Updates**: See changes instantly when you modify your website
- **User-friendly Interface**: Clean, intuitive design with a dark mode UI

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/responsive-viewer.git
cd responsive-viewer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a website URL in the input field at the top of the page
2. Select one or more devices from the device selection panel
3. The website will be displayed in each selected device frame
4. Use the controls to adjust the layout and scale as needed

## Deployment

### Deploying to Cloudflare Pages

1. Push your code to GitHub
2. Log in to Cloudflare Pages and create a new project
3. Connect your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
5. Deploy your site

## Built With

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by browser developer tools and responsive design testing needs
- Thanks to all the open-source projects that made this possible
