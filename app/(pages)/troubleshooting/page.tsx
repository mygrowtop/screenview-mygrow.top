import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiAlertTriangle, FiCheckCircle, FiX, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Troubleshooting - ScreenView",
  description: "Resolve common issues encountered when using ScreenView, including website display problems and blank screens.",
};

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Troubleshooting</h1>
            <p className="text-xl text-gray-300">
              Solutions for common issues when using ScreenView
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Blank Screen Issues */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <div className="flex items-start mb-6">
                <FiAlertTriangle size={24} className="text-yellow-500 mr-4 mt-1" />
                <h2 className="text-2xl font-bold text-white">Website Shows as Blank Screen</h2>
              </div>
              
              <div className="space-y-6 text-gray-300">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Why do blank screens happen?</h3>
                  <p>
                    Many modern websites set HTTP headers to prevent their content from being displayed in iframes
                    for security reasons. This is a common security mechanism to prevent clickjacking and other
                    security vulnerabilities. When a website forbids display in an iframe, you'll see a blank screen
                    or an error message.
                  </p>
                </div>
                
                <h3 className="text-xl font-medium text-white mt-6 mb-3">Common security headers that block iframe display:</h3>
                <ul className="list-disc list-inside space-y-4">
                  <li>
                    <span className="font-medium text-white">X-Frame-Options</span>
                    <p className="ml-6 mt-1">
                      Websites with this set to "DENY" or "SAMEORIGIN" will not allow display in iframes,
                      or only allow display in iframes from the same domain.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Content-Security-Policy</span>
                    <p className="ml-6 mt-1">
                      The frame-ancestors directive restricts which domains can embed the website.
                      If set to 'none' or not including our domain, the website won't display in iframes.
                    </p>
                  </li>
                </ul>
                
                <h3 className="text-xl font-medium text-white mt-6 mb-3">Solutions:</h3>
                <ol className="list-decimal list-inside space-y-4">
                  <li>
                    <span className="font-medium text-white">Use your own websites for testing</span>
                    <p className="ml-6 mt-1">
                      If you're developing your own website, you can control these security headers,
                      ensuring iframe display is allowed during development and testing.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Try example websites</span>
                    <p className="ml-6 mt-1">
                      We provide several example websites on the homepage that allow iframe display,
                      which are perfect for testing responsive designs.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Use the open in new window option</span>
                    <p className="ml-6 mt-1">
                      When a website can't display in an iframe, you'll see an error message
                      with an "Open in New Window" button that lets you view the site directly in a new tab.
                    </p>
                  </li>
                </ol>
                
                <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500 mt-6">
                  <h4 className="font-medium text-white mb-2">Technical Note</h4>
                  <p className="text-sm">
                    ScreenView uses iframe technology to display website previews at different device sizes. An iframe is an HTML tag
                    used to embed one page within another. Websites can control whether they allow embedding through HTTP headers or META tags.
                    These security restrictions are implemented by the websites themselves, not limitations of ScreenView.
                  </p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-green-500 mt-6">
                  <div className="flex items-start">
                    <FiCheckCircle size={20} className="text-green-500 mr-2 mt-1" />
                    <p className="text-sm">
                      <span className="font-medium text-white">Tip:</span> For your own websites,
                      if you want to allow display in tools like ScreenView, you can set
                      <code className="bg-gray-900 px-2 py-1 rounded mx-1 text-xs">X-Frame-Options: ALLOW-FROM https://your-domain.com</code>
                      or set appropriate frame-ancestors values in your Content-Security-Policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Other Common Issues */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Other Common Issues</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-700 pb-6">
                  <h3 className="text-xl font-medium text-white mb-3">Slow Page Loading</h3>
                  <p className="text-gray-300">
                    If pages load slowly, it might be because you're trying to load multiple device previews simultaneously,
                    or the target website itself loads slowly. Try reducing the number of devices displayed at once,
                    or testing other websites to determine the source of the issue.
                  </p>
                </div>
                
                <div className="border-b border-gray-700 pb-6">
                  <h3 className="text-xl font-medium text-white mb-3">Interactive Features Not Working</h3>
                  <p className="text-gray-300">
                    Due to iframe security restrictions, some website interactions (like clicks, form submissions, etc.)
                    may not work properly in the preview. This is because websites in iframes may not have access to
                    cookies, localStorage, or other necessary resources.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">Device Sizes Not Accurate</h3>
                  <p className="text-gray-300">
                    We strive to provide accurate device dimensions, but some devices may have multiple versions or resolution variants.
                    If you need to test with the exact dimensions of a specific device, we recommend using the "Custom" option
                    to create precise screen sizes.
                  </p>
                </div>
              </div>
            </section>
            
            <div className="text-center">
              <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 