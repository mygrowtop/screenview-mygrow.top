import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiCode, FiUsers, FiGithub, FiExternalLink, FiMonitor } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About ScreenView - Our Story and Mission",
  description: "Learn about the ScreenView tool's features, development team, and how it helps developers create responsive websites across all devices.",
  keywords: ["about ScreenView", "responsive testing tool", "web development team", "cross-device testing", "website compatibility"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ScreenView - Our Story and Mission",
    description: "Learn about the ScreenView tool's features, development team, and how it helps developers create responsive websites.",
    url: "https://screenview.mygrow.top/about",
    type: "website",
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">About ScreenView</h1>
            <p className="text-xl text-gray-300">
              A powerful tool helping developers and designers test responsive designs
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              ScreenView was created to solve a common problem in web development:
              efficiently testing websites across multiple devices and screen sizes.
            </p>
            <p className="text-gray-300 mb-4">
              Our mission is to provide a simple yet powerful tool that helps developers and designers ensure 
              their websites look great and function properly on any device, from smartphones to large desktop monitors.
            </p>
            <p className="text-gray-300">
              By allowing you to view multiple device sizes simultaneously, ScreenView saves time
              and helps identify layout issues early in the development process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                <FiCode size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Technology Stack</h3>
              <p className="text-gray-300 mb-4">
                Built with modern web technologies including Next.js, React, and Tailwind CSS.
                The application uses iframes to accurately render websites at different viewport sizes.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Next.js for server-side rendering</li>
                <li>React for component-based UI</li>
                <li>Tailwind CSS for styling</li>
                <li>Framer Motion for animations</li>
                <li>TypeScript for type safety</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                <FiUsers size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Who It's For</h3>
              <p className="text-gray-300 mb-4">
                ScreenView is designed for:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <span className="font-medium">Web Developers</span> - Test responsive layouts across multiple devices simultaneously
                </li>
                <li>
                  <span className="font-medium">UI/UX Designers</span> - Verify design implementations across different screen sizes
                </li>
                <li>
                  <span className="font-medium">QA Testers</span> - Quickly identify layout issues across devices
                </li>
                <li>
                  <span className="font-medium">Project Managers</span> - View website responsiveness without switching devices
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Open Source Project</h2>
            <p className="text-gray-300 mb-4">
              ScreenView is an open source project. We believe in the power of community collaboration to build better tools for everyone.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href="https://github.com/your-username/screen-view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors"
              >
                <FiGithub className="mr-2" />
                View on GitHub
              </a>
              <a 
                href="https://github.com/your-username/screen-view/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors"
              >
                <FiExternalLink className="mr-2" />
                Report Issues
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 