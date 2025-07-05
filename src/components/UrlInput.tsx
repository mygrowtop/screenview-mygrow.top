"use client";

import { useState } from "react";
import { FiSearch, FiX, FiLink } from "react-icons/fi";
import { motion } from "framer-motion";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  initialUrl?: string;
}

const UrlInput = ({ onSubmit, initialUrl = "" }: UrlInputProps) => {
  const [inputValue, setInputValue] = useState(initialUrl);
  const [isValid, setIsValid] = useState(true);
  const [recentUrls, setRecentUrls] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    
    // Add http:// if not present
    let processedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      processedUrl = `https://${url}`;
    }
    
    try {
      new URL(processedUrl);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue) return;
    
    // Add http:// if not present
    let processedUrl = inputValue;
    if (!/^https?:\/\//i.test(inputValue)) {
      processedUrl = `https://${inputValue}`;
    }
    
    if (validateUrl(processedUrl)) {
      setIsValid(true);
      onSubmit(processedUrl);
      
      // Save to recent URLs (no duplicates)
      if (!recentUrls.includes(processedUrl)) {
        const newRecentUrls = [processedUrl, ...recentUrls.slice(0, 4)];
        setRecentUrls(newRecentUrls);
        
        // Save to local storage if available
        if (typeof window !== "undefined") {
          localStorage.setItem("recentUrls", JSON.stringify(newRecentUrls));
        }
      }
    } else {
      setIsValid(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setIsValid(true);
  };

  const handleRecentUrlClick = (url: string) => {
    setInputValue(url);
    onSubmit(url);
    setShowRecent(false);
  };

  // Load recent URLs from local storage on component mount
  useState(() => {
    if (typeof window !== "undefined") {
      const savedUrls = localStorage.getItem("recentUrls");
      if (savedUrls) {
        try {
          const parsedUrls = JSON.parse(savedUrls);
          if (Array.isArray(parsedUrls)) {
            setRecentUrls(parsedUrls);
          }
        } catch (e) {
          console.error("Failed to parse recent URLs from localStorage");
        }
      }
    }
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLink className="text-gray-400" />
          </div>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsValid(true);
            }}
            onFocus={() => recentUrls.length > 0 && setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            placeholder="Enter website URL (e.g. example.com)"
            className={`block w-full pl-10 pr-16 py-3 border ${
              isValid ? "border-gray-700" : "border-red-500"
            } bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
              isValid ? "focus:ring-blue-500" : "focus:ring-red-500"
            } text-white placeholder-gray-400`}
          />
          
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-12 flex items-center pr-3 text-gray-400 hover:text-white"
            >
              <FiX />
            </button>
          )}
          
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiSearch />
          </button>
        </div>
        
        {!isValid && (
          <p className="mt-2 text-sm text-red-400">
            Please enter a valid URL
          </p>
        )}
      </form>
      
      {showRecent && recentUrls.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-2">
            <h4 className="text-xs font-medium text-gray-400 px-2 py-1">Recent URLs</h4>
            <ul>
              {recentUrls.map((url, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleRecentUrlClick(url)}
                    className="w-full text-left px-2 py-2 text-sm text-white hover:bg-gray-700 rounded"
                  >
                    {url}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UrlInput; 