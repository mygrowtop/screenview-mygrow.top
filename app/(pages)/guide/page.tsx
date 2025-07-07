import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMonitor, FiSmartphone, FiTablet, FiSettings, FiExternalLink } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How to Use ScreenView - Complete User Guide",
  description: "Step-by-step tutorials and instructions for using ScreenView to test and preview your websites across multiple devices and screen sizes.",
  keywords: ["ScreenView guide", "responsive testing tutorial", "device testing instructions", "website preview guide", "cross-device testing"],
  alternates: {
    canonical: "/guide",
  },
  openGraph: {
    title: "How to Use ScreenView - Complete User Guide",
    description: "Step-by-step guide for testing websites on multiple devices using ScreenView",
    url: "https://screenview.mygrow.top/guide",
    type: "article",
  }
};

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">User Guide</h1>
            <p className="text-xl text-gray-300">
              How to effectively use ScreenView
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Getting Started Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">1</span>
                Getting Started
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  ScreenView allows you to preview websites on different devices and screen sizes.
                  Here are the steps to get started:
                </p>
                
                <ol className="list-decimal list-inside space-y-4">
                  <li className="pl-2">
                    <span className="font-medium text-white">Enter URL</span> - Input any website URL in the field at the top of the page.
                    The URL will be loaded within the selected device frames.
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">Select Device</span> - Choose a device from the preset options or create a custom screen size.
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">View Results</span> - The website will be displayed within the frame of the selected device,
                    allowing you to see how it appears at that specific screen size.
                  </li>
                </ol>
                
                <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-sm">
                    <strong>Note:</strong> Due to security settings, some websites may block display within iframes.
                    In these cases, you'll see an error message instead of the website content.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Device Selection Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">2</span>
                Device Selection
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  ScreenView offers various categories of preset devices:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiSmartphone className="mr-2 text-blue-400" />
                      <h3 className="font-medium text-white">Mobile Devices</h3>
                    </div>
                    <p className="text-sm">
                      Various smartphone sizes, including iPhone and Android devices.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiTablet className="mr-2 text-purple-400" />
                      <h3 className="font-medium text-white">Tablets</h3>
                    </div>
                    <p className="text-sm">
                      iPad, iPad Pro, and other popular tablet sizes.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiMonitor className="mr-2 text-green-400" />
                      <h3 className="font-medium text-white">Laptops</h3>
                    </div>
                    <p className="text-sm">
                      Various laptop screen sizes, including MacBook, Surface, and more.
                    </p>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiMonitor className="mr-2 text-indigo-400" />
                      <h3 className="font-medium text-white">Desktop</h3>
                    </div>
                    <p className="text-sm">
                      Standard desktop screen resolutions, including ultrawide and multi-monitor setups.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium text-white mt-8 mb-4">Brand Filtering</h3>
                <p className="mb-4">
                  Within each device category, you can filter devices by brand to find what you need more quickly:
                </p>

                <ul className="list-disc list-inside space-y-2">
                  <li className="pl-2">Select a device category (Mobile, Tablet, Laptop, or Desktop)</li>
                  <li className="pl-2">Use the brand filters to select devices from specific manufacturers</li>
                  <li className="pl-2">Combine with the search box for more precise device finding</li>
                </ul>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">Custom Devices</h3>
                <p>
                  Need a specific screen size not included in the presets? You can create custom devices:
                </p>
                
                <ol className="list-decimal list-inside space-y-2">
                  <li className="pl-2">Click on the "Custom" tab in the device selection area</li>
                  <li className="pl-2">Enter a name for your custom device</li>
                  <li className="pl-2">Specify width and height in pixels</li>
                  <li className="pl-2">Click "Add Device" to add it to your selected devices</li>
                </ol>
              </div>
            </section>
            
            {/* Advanced Features Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">3</span>
                Advanced Features
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3">View Modes</h3>
                    <p className="mb-3">
                      Different ways to view device previews:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><span className="font-medium">Modal Window</span> - Display devices at actual size in a popup window</li>
                      <li><span className="font-medium">Fullscreen Mode</span> - Expand device frames to fill your browser window</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3">Zoom Controls</h3>
                    <p className="mb-3">
                      Adjust the zoom slider to resize device frames while maintaining their aspect ratio.
                      This is useful for fitting more devices on screen at once.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-medium text-white mb-3">Device Controls</h3>
                  <p className="mb-3">
                    Device frames include the following controls:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <span className="font-medium">Close</span> - Close the current device preview
                    </li>
                    <li>
                      <span className="font-medium">Device Info</span> - Shows device name and resolution
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* Best Practices Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">4</span>
                Best Practices
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  To make the most of ScreenView, consider these best practices:
                </p>
                
                <ul className="list-disc list-inside space-y-4">
                  <li className="pl-2">
                    <span className="font-medium text-white">Test Key Breakpoints</span> - 
                    Focus on testing common breakpoints where layouts change significantly.
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">Check Extreme Sizes</span> - 
                    Test devices of varying sizes, from small mobile devices to large desktop screens, to ensure your designs scale properly.
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">Test Interactive Elements</span> - 
                    Remember that some interactive elements may behave differently on different devices, especially touch-based interactions.
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">Save Common URLs</span> - 
                    If you frequently test the same websites, the system automatically saves your recently used URLs for quick access next time.
                  </li>
                </ul>
                
                <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-yellow-500 mt-6">
                  <p className="text-sm">
                    <strong>Remember:</strong> While ScreenView provides an excellent approximation of how websites appear on specific devices,
                    it's always recommended to test on actual physical devices when possible, especially before major releases.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Additional Resources Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  Learn more about responsive web design with these useful resources:
                </p>
                
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FiExternalLink className="mr-2" />
                      MDN Web Docs: Responsive Design
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://web.dev/responsive-web-design-basics/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FiExternalLink className="mr-2" />
                      Google Web.dev: Responsive Design Basics
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.smashingmagazine.com/category/responsive-web-design/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FiExternalLink className="mr-2" />
                      Smashing Magazine: Responsive Web Design Articles
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 