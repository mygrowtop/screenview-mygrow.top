"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UrlInput from "@/components/UrlInput";
import DeviceSelector from "@/components/DeviceSelector";
import { Device } from "@/components/DeviceSelector";
import { FiInfo, FiSettings, FiGrid, FiX } from "react-icons/fi";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle URL submission
  const handleUrlSubmit = (submittedUrl: string) => {
    setUrl(submittedUrl);
  };

  // 处理设备选择
  const handleDeviceSelect = (device: Device) => {
    console.log("Device selected:", device.name);
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  // 处理关闭模态窗口
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
    <div className="min-h-screen flex flex-col">
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
              响应式查看器
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto"
            >
              在不同设备和屏幕尺寸上同时预览和测试网站
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <UrlInput onSubmit={handleUrlSubmit} initialUrl={url} />
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
          
          {/* 模态窗口 */}
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
                    <span className="ml-2 text-xs text-gray-400">{selectedDevice.width} × {selectedDevice.height}</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="关闭"
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
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    loading="eager"
                    allow="fullscreen"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* 信息提示区域 */}
          {!url && !isModalOpen ? (
            <div className="text-center py-12 bg-gray-800 rounded-lg mt-8">
              <FiInfo size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">请输入URL</h3>
              <p className="text-gray-400">
                请在上方输入框中输入网站URL，以便在选定的设备上预览。
              </p>
            </div>
          ) : !url && !isModalOpen ? (
            <section className="mt-16 mb-12">
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
                  <h3 className="text-xl font-bold text-white mb-2">多设备预览</h3>
                  <p className="text-gray-400">
                    同时在多个设备上查看您的网站，确保在所有屏幕尺寸上都有一致的体验。
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
                  <h3 className="text-xl font-bold text-white mb-2">可自定义设备</h3>
                  <p className="text-gray-400">
                    从流行的设备预设中选择或创建自定义屏幕尺寸来测试您的响应式设计。
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
                  <h3 className="text-xl font-bold text-white mb-2">易于使用</h3>
                  <p className="text-gray-400">
                    只需输入URL，选择您的设备，即可立即看到您的网站在不同屏幕上的响应方式。
                  </p>
                </motion.div>
              </div>
            </section>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
