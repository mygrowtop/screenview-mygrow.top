"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UrlInput from "@/components/UrlInput";
import DeviceSelector from "@/components/DeviceSelector";
import { Device } from "@/components/DeviceSelector";
import { FiInfo, FiSettings, FiGrid, FiX, FiMonitor, FiSmartphone, FiTablet, FiCheck, FiAward, FiHelpCircle } from "react-icons/fi";

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
              在不同设备和屏幕尺寸上预览和测试网站
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <UrlInput onSubmit={handleUrlSubmit} initialUrl={url} />
            </motion.div>
            
            {/* 统计数据 */}
            <div className="flex justify-center gap-8 md:gap-16 mt-10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">200+</div>
                <div className="text-sm text-gray-400 mt-1">预设设备</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">4</div>
                <div className="text-sm text-gray-400 mt-1">设备类别</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-400">10K+</div>
                <div className="text-sm text-gray-400 mt-1">满意用户</div>
              </div>
            </div>
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
          ) : null}
          
          {/* 为什么使用响应式查看器 */}
          <section className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">为什么使用响应式查看器？</h2>
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
                <h3 className="text-xl font-bold text-white mb-2">精确设备预览</h3>
                <p className="text-gray-400">
                  在真实设备尺寸上预览您的网站，确保在特定屏幕尺寸上有良好的用户体验，节省开发和测试时间。
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
                  从200多种流行的设备预设中选择或创建自定义屏幕尺寸，覆盖市场上几乎所有常见设备。
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
                  无需安装任何软件，只需在浏览器中输入URL，选择设备，即可立即测试您的响应式设计。
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* 如何使用 */}
          <section className="mt-20 mb-16 bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-10">如何使用响应式查看器</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">输入URL</h3>
                <p className="text-gray-400">
                  在顶部输入框中输入您想要测试的网站URL
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">选择设备</h3>
                <p className="text-gray-400">
                  从预设设备列表中选择一个您想要测试的设备
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">查看预览</h3>
                <p className="text-gray-400">
                  网站将在所选设备的模拟窗口中显示
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">测试响应式</h3>
                <p className="text-gray-400">
                  分析网站在该设备上的表现，发现并解决问题
                </p>
              </div>
            </div>
          </section>
          
          {/* 高级功能 */}
          <section className="mt-20 mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-10">高级功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center mr-4">
                    <FiSmartphone size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">设备分类</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  设备按类型分为手机、平板、笔记本和台式机四大类，方便快速找到所需设备。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 手机设备（iPhone、Samsung、Xiaomi等）
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 平板设备（iPad、Galaxy Tab等）
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 笔记本设备（MacBook、Surface等）
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 台式机设备（包括超宽和多屏设置）
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                    <FiSettings size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">品牌筛选</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  通过品牌筛选功能，快速找到特定品牌的设备，提高工作效率。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 按品牌筛选设备（Apple、Samsung、Google等）
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 搜索特定设备型号
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 组合筛选，精确定位所需设备
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 创建自定义设备尺寸
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <FiMonitor size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">精确模拟</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  精确模拟各种设备的屏幕尺寸和分辨率，确保您的设计在特定设备上能完美展示。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 精确的设备尺寸和分辨率
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 真实的设备框架预览
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 支持横屏和竖屏模式
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 实时响应测试
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                    <FiAward size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">专业功能</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  为专业开发者和设计师提供的高级功能，提升工作效率和测试质量。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 本地存储最近使用的URL
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 自定义设备管理
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 快速切换设备类型
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FiCheck className="text-green-500 mr-2" /> 无需安装，随时随地使用
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* 常见问题 */}
          <section className="mt-20 mb-16 bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-10">常见问题</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  为什么有些网站无法在查看器中显示？
                </h3>
                <p className="text-gray-400">
                  某些网站出于安全考虑设置了X-Frame-Options或Content-Security-Policy头，禁止在iframe中加载。这是网站自身的安全保护机制，非本工具所能控制。您可以尝试使用自己开发的网站或允许在iframe中加载的网站进行测试。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  如何创建自定义设备？
                </h3>
                <p className="text-gray-400">
                  点击设备选择区域中的"自定义"选项卡，输入设备名称、宽度和高度，然后点击"添加设备"按钮即可创建自定义设备。自定义设备将在当前会话中可用。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  响应式查看器与浏览器开发工具有何不同？
                </h3>
                <p className="text-gray-400">
                  响应式查看器提供了更丰富的预设设备选项和品牌筛选功能，让您可以更精确地测试特定设备上的显示效果。此外，我们的界面更加直观友好，使用更加便捷。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  响应式查看器是否支持所有浏览器？
                </h3>
                <p className="text-gray-400">
                  是的，响应式查看器支持所有现代浏览器，包括Chrome、Firefox、Safari和Edge。为获得最佳体验，建议使用最新版本的浏览器。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-400" />
                  是否可以保存我的设备配置？
                </h3>
                <p className="text-gray-400">
                  目前，响应式查看器会自动保存您最近使用的URL。我们正在开发保存自定义设备和设备配置的功能，敬请期待。
                </p>
              </div>
            </div>
          </section>
          
          {/* 行动号召 */}
          <section className="mt-20 mb-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">准备好测试您的响应式设计了吗？</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              立即输入您的网站URL，选择设备，开始体验响应式查看器带来的便捷！
            </p>
            <button 
              onClick={() => document.getElementById('url-input')?.focus()}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              开始测试
            </button>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
