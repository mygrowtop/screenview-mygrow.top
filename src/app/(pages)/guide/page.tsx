import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMonitor, FiSmartphone, FiTablet, FiSettings, FiExternalLink } from "react-icons/fi";

export const metadata: Metadata = {
  title: "使用指南 - Responsive Viewer",
  description: "学习如何使用 Responsive Viewer 在不同设备和屏幕尺寸上测试网站。",
};

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">使用指南</h1>
            <p className="text-xl text-gray-300">
              如何有效使用 Responsive Viewer
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Getting Started Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">1</span>
                开始使用
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  Responsive Viewer 允许您同时在多个设备上预览网站。
                  以下是开始使用的步骤：
                </p>
                
                <ol className="list-decimal list-inside space-y-4">
                  <li className="pl-2">
                    <span className="font-medium text-white">输入 URL</span> - 在页面顶部的输入框中输入任何网站 URL。
                    该 URL 将在所有选定的设备框架中加载。
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">选择设备</span> - 从预设设备选项中选择或创建自定义屏幕尺寸。
                    您可以选择多个设备同时查看。
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">查看结果</span> - 网站将显示在每个选定的设备框架中，
                    让您可以比较它在不同屏幕尺寸上的显示效果。
                  </li>
                </ol>
                
                <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-sm">
                    <strong>注意：</strong> 由于安全设置，某些网站可能会阻止在 iframe 中显示。
                    在这些情况下，您将看到错误消息而不是网站内容。
                  </p>
                </div>
              </div>
            </section>
            
            {/* Device Selection Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">2</span>
                设备选择
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  Responsive Viewer 提供了各种不同类别的预设设备：
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiSmartphone className="mr-2 text-blue-400" />
                      <h3 className="font-medium text-white">移动设备</h3>
                    </div>
                    <p className="text-sm">
                      各种智能手机尺寸，包括 iPhone 和 Android 设备。
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiTablet className="mr-2 text-purple-400" />
                      <h3 className="font-medium text-white">平板电脑</h3>
                    </div>
                    <p className="text-sm">
                      iPad、iPad Pro 和其他流行的平板电脑尺寸。
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiMonitor className="mr-2 text-green-400" />
                      <h3 className="font-medium text-white">桌面设备</h3>
                    </div>
                    <p className="text-sm">
                      标准桌面和笔记本电脑屏幕分辨率。
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium text-white mt-8 mb-4">自定义设备</h3>
                <p>
                  需要预设中未包含的特定屏幕尺寸？您可以创建自定义设备：
                </p>
                
                <ol className="list-decimal list-inside space-y-2">
                  <li className="pl-2">点击设备选择区域中的"自定义"选项卡</li>
                  <li className="pl-2">为您的自定义设备输入名称</li>
                  <li className="pl-2">以像素为单位指定宽度和高度</li>
                  <li className="pl-2">点击"添加设备"将其添加到您选择的设备中</li>
                </ol>
              </div>
            </section>
            
            {/* Advanced Features Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">3</span>
                高级功能
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3">查看模式</h3>
                    <p className="mb-3">
                      在网格和列表视图之间切换以组织您的设备预览：
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><span className="font-medium">网格视图</span> - 以响应式网格布局显示设备</li>
                      <li><span className="font-medium">列表视图</span> - 垂直堆叠设备，便于滚动比较</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3">缩放控制</h3>
                    <p className="mb-3">
                      调整缩放滑块以调整设备框架大小，同时保持其纵横比。
                      这对于在屏幕上同时显示更多设备很有用。
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-medium text-white mb-3">设备控制</h3>
                  <p className="mb-3">
                    每个设备框架包括以下控件：
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <span className="font-medium">刷新</span> - 在设备框架中重新加载当前 URL
                    </li>
                    <li>
                      <span className="font-medium">全屏</span> - 展开设备框架以填满您的浏览器窗口
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* Best Practices Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="inline-block mr-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-lg">4</span>
                最佳实践
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  要充分利用 Responsive Viewer，请考虑以下最佳实践：
                </p>
                
                <ul className="list-disc list-inside space-y-4">
                  <li className="pl-2">
                    <span className="font-medium text-white">测试关键断点</span> - 
                    专注于测试布局发生显著变化的常见断点。
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">检查极端尺寸</span> - 
                    始终测试非常小的移动设备和大型桌面屏幕，以确保您的设计能够正确缩放。
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">测试交互元素</span> - 
                    记住，某些交互元素在不同设备上的行为可能不同，尤其是基于触摸的交互。
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-white">保存常用配置</span> - 
                    如果您经常测试相同的设备集，请在选择设备后将 URL 添加到书签，以便快速访问。
                  </li>
                </ul>
                
                <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-yellow-500 mt-6">
                  <p className="text-sm">
                    <strong>请记住：</strong> 虽然 Responsive Viewer 提供了网站在不同设备上显示效果的出色近似值，
                    但在可能的情况下，特别是在重大发布之前，始终建议在实际物理设备上进行测试。
                  </p>
                </div>
              </div>
            </section>
            
            {/* Additional Resources Section */}
            <section className="bg-gray-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">其他资源</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  通过以下有用的资源了解更多关于响应式网页设计的信息：
                </p>
                
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FiExternalLink className="mr-2" />
                      MDN Web 文档：响应式设计
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
                      Google Web.dev：响应式设计基础
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
                      Smashing Magazine：响应式网页设计文章
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