"use client";

import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiMaximize, FiMinimize, FiX, FiExternalLink } from "react-icons/fi";

interface DeviceFrameProps {
  url: string;
  deviceType: string;
  width: number;
  height: number;
  deviceName: string;
  scale?: number;
  onModalClose?: () => void;
}

// 定义组件引用类型
export interface DeviceFrameRef {
  openModal: () => void;
}

const DeviceFrame = forwardRef<DeviceFrameRef, DeviceFrameProps>(({
  url,
  deviceType,
  width,
  height,
  deviceName,
  scale = 1,
  onModalClose,
}, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [modalIframeKey, setModalIframeKey] = useState(Date.now());
  const mainIframeRef = useRef<HTMLIFrameElement>(null);
  const modalIframeRef = useRef<HTMLIFrameElement>(null);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    openModal: () => {
      console.log("openModal method called");
      setIsModalOpen(true);
      setIsModalLoading(true);
      // 延迟设置iframe key，确保模态窗口DOM已经渲染
      setTimeout(() => {
        console.log("Setting modal iframe key");
        setModalIframeKey(Date.now());
      }, 300);
    }
  }));

  useEffect(() => {
    setIsLoading(true);
    setIframeKey(Date.now());
    if (isModalOpen) {
      setIsModalLoading(true);
      setModalIframeKey(Date.now());
    }
  }, [url]);

  // 添加用于调试的useEffect
  useEffect(() => {
    if (isModalOpen) {
      console.log("Modal is open");
    } else {
      console.log("Modal is closed");
    }
  }, [isModalOpen]);

  const handleIframeLoad = (isModal: boolean = false) => {
    if (isModal) {
      setIsModalLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const refreshIframe = () => {
    setIsLoading(true);
    setIframeKey(Date.now());
    if (isModalOpen) {
      setIsModalLoading(true);
      setModalIframeKey(Date.now());
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openModal = () => {
    console.log("openModal function called directly");
    setIsModalOpen(true);
    setIsModalLoading(true);
    // 当打开模态窗口时，确保iframe重新加载
    setTimeout(() => {
      console.log("Setting modal iframe key (direct)");
      setModalIframeKey(Date.now());
    }, 300);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 调用onModalClose回调函数，如果提供了的话
    if (onModalClose) {
      onModalClose();
    }
  };

  // Calculate device frame dimensions
  const frameWidth = width * scale;
  const frameHeight = height * scale;

  // Device-specific styling
  const getDeviceStyle = () => {
    switch (deviceType) {
      case "mobile":
        return {
          borderRadius: "16px",
          border: "10px solid #1e293b",
          boxShadow: "0 0 0 2px #334155",
        };
      case "tablet":
        return {
          borderRadius: "12px",
          border: "16px solid #1e293b",
          boxShadow: "0 0 0 2px #334155",
        };
      case "laptop":
        return {
          borderRadius: "8px",
          border: "20px solid #1e293b",
          borderBottom: "30px solid #1e293b",
          boxShadow: "0 0 0 2px #334155",
        };
      default:
        return {
          border: "1px solid #334155",
          borderRadius: "4px",
        };
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`device-frame relative ${isFullscreen ? "fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90" : ""}`}
        style={{
          width: isFullscreen ? "100%" : frameWidth,
          height: isFullscreen ? "100%" : "auto",
          maxWidth: isFullscreen ? "90vw" : "none",
          maxHeight: isFullscreen ? "90vh" : "none",
          margin: isFullscreen ? "auto" : undefined,
        }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">{deviceName}</span>
            <div className="flex space-x-2">
              <button
                onClick={refreshIframe}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                aria-label="刷新"
              >
                <FiRefreshCw size={16} />
              </button>
              <button
                onClick={openModal}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                aria-label="在模态窗口中打开"
              >
                <FiExternalLink size={16} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                aria-label={isFullscreen ? "退出全屏" : "进入全屏"}
              >
                {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
              </button>
            </div>
          </div>
          
          <div
            className="relative overflow-hidden cursor-pointer"
            style={{
              ...getDeviceStyle(),
              width: isFullscreen ? "auto" : frameWidth,
              height: isFullscreen ? "auto" : frameHeight,
              maxWidth: isFullscreen ? "90vw" : "none",
              maxHeight: isFullscreen ? "80vh" : "none",
            }}
            onClick={openModal}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            <iframe
              ref={mainIframeRef}
              key={iframeKey}
              src={url}
              title={`${deviceName} preview`}
              className="w-full h-full bg-white"
              style={{
                width: "100%",
                height: isFullscreen ? "80vh" : frameHeight - (deviceType === "laptop" ? 50 : 20),
                border: "none",
                display: isLoading ? "none" : "block",
              }}
              onLoad={() => handleIframeLoad(false)}
              sandbox="allow-same-origin allow-scripts allow-forms"
              loading="eager"
              allow="fullscreen"
            />
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            {width} × {height}
          </div>
        </div>
      </motion.div>

      {/* 模态窗口 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 p-4 sm:p-6 md:p-10"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: `${width}px`,
                height: `${height + 40}px`,
                maxWidth: "95vw",
                maxHeight: "95vh",
              }}
            >
              <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-white">{deviceName}</span>
                  <span className="ml-2 text-xs text-gray-400">{width} × {height}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalLoading(true);
                      setModalIframeKey(Date.now());
                    }}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="刷新"
                  >
                    <FiRefreshCw size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="关闭"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>
              
              <div 
                className="overflow-auto"
                style={{
                  height: `${height}px`,
                  maxHeight: "calc(95vh - 40px)",
                }}
              >
                {isModalLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}
                
                <iframe
                  ref={modalIframeRef}
                  key={`modal-${modalIframeKey}`}
                  src={url}
                  title={`${deviceName} modal preview`}
                  className="w-full h-full bg-white"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    border: "none",
                    display: isModalLoading ? "none" : "block",
                  }}
                  onLoad={() => handleIframeLoad(true)}
                  sandbox="allow-same-origin allow-scripts allow-forms"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  allow="fullscreen"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

DeviceFrame.displayName = "DeviceFrame";

export default DeviceFrame; 