"use client";

import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiMaximize, FiMinimize, FiX, FiExternalLink, FiAlertTriangle, FiHelpCircle } from "react-icons/fi";
import Link from "next/link";

interface DeviceFrameProps {
  url: string;
  deviceType: string;
  width: number;
  height: number;
  deviceName: string;
  scale?: number;
  onModalClose?: () => void;
}

// Define component reference type
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
  const [iframeError, setIframeError] = useState(false);
  const [modalIframeError, setModalIframeError] = useState(false);
  const mainIframeRef = useRef<HTMLIFrameElement>(null);
  const modalIframeRef = useRef<HTMLIFrameElement>(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    openModal: () => {
      console.log("openModal method called");
      setIsModalOpen(true);
      setIsModalLoading(true);
      // Delay setting iframe key to ensure modal window DOM is rendered
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

  // Add useEffect for debugging
  useEffect(() => {
    if (isModalOpen) {
      console.log("Modal is open");
    } else {
      console.log("Modal is closed");
    }
  }, [isModalOpen]);

  const handleIframeLoad = (isModal: boolean = false) => {
    try {
      if (isModal) {
        setIsModalLoading(false);
        setModalIframeError(false);
        // Check if frame content is accessible
        if (modalIframeRef.current?.contentWindow?.document) {
          // Content loaded successfully
        }
      } else {
        setIsLoading(false);
        setIframeError(false);
        if (mainIframeRef.current?.contentWindow?.document) {
          // Content loaded successfully
        }
      }
    } catch (e) {
      // This exception will be thrown if there's a cross-origin issue
      console.warn("Cross-origin frame access error (expected):", e);
      // We set error to false because this is actually an expected case for cross-origin frames
      // and doesn't mean the content didn't load
    }
  };

  const handleIframeError = (isModal: boolean = false) => {
    if (isModal) {
      setIsModalLoading(false);
      setModalIframeError(true);
    } else {
      setIsLoading(false);
      setIframeError(true);
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
    // When opening modal window, ensure iframe reloads
    setTimeout(() => {
      console.log("Setting modal iframe key (direct)");
      setModalIframeKey(Date.now());
    }, 300);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Call onModalClose callback if provided
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
                aria-label="Refresh"
              >
                <FiRefreshCw size={16} />
              </button>
              <button
                onClick={openModal}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                aria-label="Open in modal"
              >
                <FiExternalLink size={16} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
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
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-10">
                <div className="loader">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              </div>
            )}
            
            {iframeError && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 z-10 p-4 text-center">
                <FiAlertTriangle size={36} className="text-yellow-500 mb-3" />
                <h3 className="text-white font-medium mb-2">Content Cannot Be Displayed</h3>
                <p className="text-gray-300 text-sm mb-4">This website may block display within iframes or have cross-origin restrictions.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center"
                  >
                    <FiExternalLink className="mr-2" />
                    Open in New Window
                  </a>
                  <Link 
                    href="/troubleshooting" 
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center"
                  >
                    <FiHelpCircle className="mr-2" />
                    View Troubleshooting
                  </Link>
                </div>
              </div>
            )}
            
            <iframe
              ref={mainIframeRef}
              key={iframeKey}
              src={url || "https://example.com"}
              title={`${deviceName} preview`}
              className="w-full h-full bg-white"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                border: "none",
              }}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-downloads"
              loading="eager"
              allow="fullscreen; camera; microphone; payment"
              referrerPolicy="no-referrer"
              onError={() => handleIframeError(false)}
              onLoad={() => handleIframeLoad(false)}
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-transparent" onClick={openModal}>
              {/* Empty div for click handling */}
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            {width} x {height}
          </div>
        </div>
      </motion.div>

      {/* Modal window */}
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
                  <span className="ml-2 text-xs text-gray-400">{width} x {height}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalLoading(true);
                      setModalIframeKey(Date.now());
                    }}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Refresh"
                  >
                    <FiRefreshCw size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
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
                
                {modalIframeError && !isModalLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10 p-4 text-center">
                    <FiAlertTriangle size={48} className="text-yellow-500 mb-4" />
                    <h3 className="text-white text-xl font-medium mb-3">Content Cannot Be Displayed</h3>
                    <p className="text-gray-300 mb-6 max-w-md">This website may block display within iframes or have cross-origin restrictions. Try using your own websites or those that allow loading in iframes for testing.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                      >
                        <FiExternalLink className="mr-2" />
                        Open in New Window
                      </a>
                      <Link 
                        href="/troubleshooting" 
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                      >
                        <FiHelpCircle className="mr-2" />
                        View Troubleshooting
                      </Link>
                    </div>
                  </div>
                )}
                
                <iframe
                  ref={modalIframeRef}
                  key={`modal-${modalIframeKey}`}
                  src={url || "https://example.com"}
                  title={`${deviceName} modal preview`}
                  className="w-full h-full bg-white"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    border: "none",
                  }}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-downloads"
                  loading="eager"
                  allow="fullscreen; camera; microphone; payment"
                  referrerPolicy="no-referrer"
                  onError={() => handleIframeError(true)}
                  onLoad={() => handleIframeLoad(true)}
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