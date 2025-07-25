"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UrlInput from "@/components/UrlInput";
import DeviceSelector from "@/components/DeviceSelector";
import { Device } from "@/components/DeviceSelector";
import { FiInfo, FiSettings, FiGrid, FiX, FiMonitor, FiSmartphone, FiTablet, FiCheck, FiAward, FiHelpCircle, FiAlertTriangle } from "react-icons/fi";
import Link from "next/link";
import DeviceFrame from "@/components/DeviceFrame";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle URL submission
  const handleUrlSubmit = (submittedUrl: string) => {
    console.log("URL submitted:", submittedUrl);
    
    // Ensure URL is formatted correctly
    let processedUrl = submittedUrl;
    if (!/^https?:\/\//i.test(submittedUrl)) {
      processedUrl = `https://${submittedUrl}`;
    }
    
    // Update the URL state
    setUrl(processedUrl);
    
    // Always select a default device and show preview when URL is submitted
    // This makes the example buttons work immediately
    const defaultDeviceData = {
      id: "iphone-12",
      name: "iPhone 12/13",
      type: "mobile" as const,
      width: 390,
      height: 844,
      brand: "Apple",
      year: 2020
    };
    
    // Use a small timeout to ensure state updates properly
    setTimeout(() => {
      handleDeviceSelect(defaultDeviceData);
    }, 50);
  };

  // Handle device selection
  const handleDeviceSelect = (device: Device) => {
    console.log("Device selected:", device.name);
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  // Load saved URL from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUrl = localStorage.getItem("lastUrl");
        if (savedUrl) {
          setUrl(savedUrl);
        }
      } catch (error) {
        console.error("Failed to load saved URL:", error);
      }
    }
  }, []);

  // Save URL to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && url) {
      localStorage.setItem("lastUrl", url);
    }
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="py-12 md:py-20 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              ScreenView
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Preview and test websites on different devices and screen sizes
            </motion.p>
            
            {/* Statistics */}
            <div className="flex justify-center gap-8 md:gap-16 mt-10 mb-10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">200+</div>
                <div className="text-sm text-gray-400 mt-1">Preset Devices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">4</div>
                <div className="text-sm text-gray-400 mt-1">Device Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-400">10K+</div>
                <div className="text-sm text-gray-400 mt-1">Satisfied Users</div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4"
            >
              <UrlInput onSubmit={handleUrlSubmit} initialUrl={url} />
                
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="text-gray-400 text-sm mr-2 mt-1">Example sites:</span>
                  {[
                    { name: "Example", url: "https://example.com" },
                    { name: "HTML5 Test", url: "https://html5test.com" },
                    { name: "MDN", url: "https://developer.mozilla.org" },
                    { name: "Wikipedia", url: "https://en.wikipedia.org" }
                  ].map((site) => (
                    <button
                      key={site.url}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Example site clicked:", site.url);
                        
                        // Add visual feedback
                        const btn = e.currentTarget;
                        btn.classList.add('bg-blue-600');
                        setTimeout(() => btn.classList.remove('bg-blue-600'), 200);
                        
                        handleUrlSubmit(site.url);
                      }}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 active:bg-blue-600 text-sm rounded-md text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {site.name}
                    </button>
                  ))}
                </div>
            </motion.div>
          </section>
          
          {/* Device Selection Section */}
          <section className="mt-8">
            <DeviceSelector
              selectedDevices={[]}
              onSelectDevice={handleDeviceSelect}
              onRemoveDevice={() => {}}
              onOpenDeviceModal={() => {}}
            />
          </section>
          
          {/* Modal */}
          {isModalOpen && selectedDevice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 p-4 sm:p-6 md:p-10">
              <div 
                className="relative bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: `${selectedDevice.width}px`,
                  height: `${selectedDevice.height + 40}px`,
                  maxWidth: "95vw",
                  maxHeight: "95vh",
                }}
              >
                <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-700">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-white">{selectedDevice.name}</span>
                    <span className="ml-2 text-xs text-gray-400">{selectedDevice.width} x {selectedDevice.height}</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div 
                  className="overflow-auto"
                  style={{
                    height: `${selectedDevice.height}px`,
                    maxHeight: "calc(95vh - 40px)",
                  }}
                >
                  <iframe
                    key={`modal-${selectedDevice.id}-${Date.now()}`}
                    src={url || "https://example.com"}
                    title={`${selectedDevice.name} preview`}
                    className="w-full h-full bg-white"
                    style={{
                      width: `${selectedDevice.width}px`,
                      height: `${selectedDevice.height}px`,
                      border: "none",
                    }}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-downloads"
                    loading="eager"
                    allow="fullscreen; camera; microphone; payment"
                    referrerPolicy="no-referrer"
                    onLoad={() => console.log("iframe loaded:", url || "https://example.com")}
                    onError={(e) => console.error("iframe error:", e)}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Info Area */}
          {!url && !isModalOpen ? (
            <div className="text-center py-12 bg-gray-800 rounded-lg mt-8">
              <FiInfo size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Enter a URL</h3>
              <p className="text-gray-400 mb-6">
                Please enter a website URL in the input field above to preview it on selected devices.
              </p>
              
              <div className="max-w-2xl mx-auto bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="text-white font-medium flex items-center mb-2">
                  <FiAlertTriangle className="mr-2 text-yellow-500" />
                  Important Note
                </h4>
                <p className="text-sm text-gray-300">
                  For security reasons, many websites use X-Frame-Options or Content-Security-Policy to restrict display in iframes, causing blank screens. This is a security mechanism of the website itself and not something our tool can control. We recommend using:
                </p>
                <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
                  <li>Your own developed websites</li>
                  <li>Websites that allow loading in iframes (like some open-source documentation)</li>
                  <li>Websites without strict security settings</li>
                </ul>
              </div>
            </div>
          ) : null}
          
          {/* Why Use ScreenView */}
          <section className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Why Use ScreenView?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                  <FiGrid size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Precise Device Preview</h3>
                <p className="text-gray-400">
                  Preview your website at real device dimensions to ensure a great user experience on specific screen sizes, saving development and testing time.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                  <FiSettings size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Customizable Devices</h3>
                <p className="text-gray-400">
                  Choose from over 200 popular device presets or create custom screen sizes to cover almost any common device on the market.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
                  <FiInfo size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Easy to Use</h3>
                <p className="text-gray-400">
                  No software installation required. Simply enter a URL in your browser, select a device, and immediately test your responsive design.
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* How to Use */}
          <section className="mt-20 mb-16 bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-10">How to Use ScreenView</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Enter URL</h3>
                <p className="text-gray-400">
                  Enter the website URL you want to test in the input field at the top
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Select Device</h3>
                <p className="text-gray-400">
                  Choose a device from the preset list that you want to test
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">View Preview</h3>
                <p className="text-gray-400">
                  The website will display in a simulated window of the selected device
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Test Responsiveness</h3>
                <p className="text-gray-400">
                  Try different devices to ensure your website performs well on various screen sizes
                </p>
              </div>
            </div>
          </section>
          
          {/* Featured Devices */}
          <section className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Device Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                  <FiSmartphone size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smartphones</h3>
                <p className="text-gray-400 text-center">
                  iPhone, Samsung, Google Pixel and other popular mobile devices
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                  <FiTablet size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tablets</h3>
                <p className="text-gray-400 text-center">
                  iPad, Samsung Galaxy Tab, Microsoft Surface and other tablet devices
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
                  <FiMonitor size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Laptops</h3>
                <p className="text-gray-400 text-center">
                  MacBook, Dell XPS, ThinkPad and other laptop screen sizes
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center mb-4">
                  <FiMonitor size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Desktop Monitors</h3>
                <p className="text-gray-400 text-center">
                  Various desktop monitor sizes, from small to ultrawide screens
                </p>
              </div>
            </div>
          </section>
          
          {/* FAQ */}
          <section className="mt-20 mb-16 bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  Why can't some websites be displayed in the viewer?
                </h3>
                <p className="text-gray-400">
                  Some websites set X-Frame-Options or Content-Security-Policy headers for security reasons, which prevent them from loading in iframes. This is a security mechanism of the website itself and not something our tool can control. You can try using your own developed websites or those that allow loading in iframes for testing.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  How do I create a custom device?
                </h3>
                <p className="text-gray-400">
                  Click on the "Custom" tab in the device selection area, enter a device name, width, and height, then click the "Add Device" button to create a custom device. Custom devices will be available during the current session.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  How is ScreenView different from browser developer tools?
                </h3>
                <p className="text-gray-400">
                  ScreenView offers richer preset device options and brand filtering features, allowing you to more precisely test display effects on specific devices. Additionally, our interface is more intuitive and user-friendly.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  Does ScreenView support all browsers?
                </h3>
                <p className="text-gray-400">
                  Yes, ScreenView supports all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  Can I save my device configurations?
                </h3>
                <p className="text-gray-400">
                  Currently, ScreenView automatically saves your most recently used URL. We are developing features to save custom devices and device configurations, so stay tuned.
                </p>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="mt-20 mb-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Test Your Responsive Design?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Enter your website URL, select a device, and start experiencing the convenience of ScreenView!
            </p>
            <button 
              onClick={() => document.getElementById('url-input')?.focus()}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Start Testing
            </button>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
