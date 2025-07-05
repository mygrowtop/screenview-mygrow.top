"use client";

import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                响应式查看器
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              一个强大的工具，用于在不同设备和屏幕尺寸上预览网站。
              适合开发者、设计师和 QA 测试人员使用。
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://github.com/your-username/responsive-viewer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://twitter.com/your-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://linkedin.com/in/your-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              资源
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/guide" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  使用指南
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/your-username/responsive-viewer/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  报告问题
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              法律
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  隐私政策
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  服务条款
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} 响应式查看器. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 