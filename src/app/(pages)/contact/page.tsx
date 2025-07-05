"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMail, FiGithub, FiTwitter, FiSend, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      setErrorMessage("请填写所有必填字段。");
      return;
    }
    
    setFormStatus("submitting");
    
    // Simulate form submission
    try {
      // In a real application, you would send the form data to a server
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Reset form on success
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setFormStatus("success");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      setFormStatus("error");
      setErrorMessage("发生错误，请稍后再试。");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">联系我们</h1>
            <p className="text-xl text-gray-300">
              与 Responsive Viewer 团队取得联系
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg p-6 text-center"
            >
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <FiMail size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">邮箱</h3>
              <p className="text-gray-300 mb-4">
                用于一般咨询和支持
              </p>
              <a 
                href="mailto:contact@responsive-viewer.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                contact@responsive-viewer.com
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 rounded-lg p-6 text-center"
            >
              <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
                <FiGithub size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
              <p className="text-gray-300 mb-4">
                报告问题或为项目做贡献
              </p>
              <a 
                href="https://github.com/your-username/responsive-viewer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                github.com/your-username/responsive-viewer
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 text-center"
            >
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                <FiTwitter size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Twitter</h3>
              <p className="text-gray-300 mb-4">
                关注我们获取更新和公告
              </p>
              <a 
                href="https://twitter.com/your-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                @responsive_viewer
              </a>
            </motion.div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">给我们留言</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  主题
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择主题</option>
                  <option value="general">一般咨询</option>
                  <option value="support">技术支持</option>
                  <option value="feedback">反馈意见</option>
                  <option value="feature">功能请求</option>
                  <option value="bug">错误报告</option>
                  <option value="other">其他</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  留言内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              {formStatus === "error" && (
                <div className="bg-red-900/30 border border-red-500 rounded-md p-3 flex items-start">
                  <FiAlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
              )}
              
              {formStatus === "success" && (
                <div className="bg-green-900/30 border border-green-500 rounded-md p-3 flex items-start">
                  <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-green-300 text-sm">
                    您的消息已成功发送！我们会尽快回复您。
                  </p>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors ${
                    formStatus === "submitting" ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {formStatus === "submitting" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      发送中...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      发送留言
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 