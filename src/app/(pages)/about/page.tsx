import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiCode, FiUsers, FiGithub, FiExternalLink } from "react-icons/fi";

export const metadata: Metadata = {
  title: "关于我们 - Responsive Viewer",
  description: "了解 Responsive Viewer 工具的特点、功能和开发团队。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">关于 Responsive Viewer</h1>
            <p className="text-xl text-gray-300">
              一个强大的工具，帮助开发者和设计师测试响应式设计
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">我们的使命</h2>
            <p className="text-gray-300 mb-4">
              Responsive Viewer 的创建是为了解决 Web 开发中的一个常见问题：
              高效地在多种设备和屏幕尺寸上测试网站。
            </p>
            <p className="text-gray-300 mb-4">
              我们的使命是提供一个简单而强大的工具，帮助开发者和设计师确保他们的网站在任何设备上
              都能看起来很棒并正常运行，从智能手机到大型桌面显示器。
            </p>
            <p className="text-gray-300">
              通过允许同时查看多种设备尺寸，Responsive Viewer 节省了时间，
              并帮助在开发过程的早期发现布局问题。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                <FiCode size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">技术栈</h3>
              <p className="text-gray-300 mb-4">
                使用现代 Web 技术构建，包括 Next.js、React 和 Tailwind CSS。
                应用程序使用 iframe 嵌入来准确呈现不同视口大小的网站。
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Next.js 用于服务端渲染</li>
                <li>React 用于组件化 UI</li>
                <li>Tailwind CSS 用于样式设计</li>
                <li>Framer Motion 用于动画效果</li>
                <li>TypeScript 用于类型安全</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                <FiUsers size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">适用人群</h3>
              <p className="text-gray-300 mb-4">
                Responsive Viewer 专为以下人群设计：
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <span className="font-medium">Web 开发者</span> - 同时测试多个设备上的响应式布局
                </li>
                <li>
                  <span className="font-medium">UI/UX 设计师</span> - 验证不同屏幕尺寸上的设计实现
                </li>
                <li>
                  <span className="font-medium">QA 测试人员</span> - 快速识别各设备上的布局问题
                </li>
                <li>
                  <span className="font-medium">项目经理</span> - 无需切换设备即可查看网站的响应性
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">开源项目</h2>
            <p className="text-gray-300 mb-4">
              Responsive Viewer 是一个开源项目。我们相信社区协作的力量可以为每个人构建更好的工具。
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href="https://github.com/your-username/responsive-viewer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors"
              >
                <FiGithub className="mr-2" />
                在 GitHub 上查看
              </a>
              <a 
                href="https://github.com/your-username/responsive-viewer/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors"
              >
                <FiExternalLink className="mr-2" />
                报告问题
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 