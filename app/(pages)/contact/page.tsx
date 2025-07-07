"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMail, FiGithub, FiTwitter, FiInstagram, FiSend, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

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
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    
    setFormStatus("submitting");
    
    // Submit form to API endpoint
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Reset form after success
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
      } else {
        throw new Error(result.error || "Form submission failed");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage("An error occurred while submitting the form. Please try again later.");
      console.error("Form submission error:", error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Get in touch with the ScreenView team
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg p-6 text-center"
            >
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <FiMail size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-300 mb-4">
                For general inquiries and support
              </p>
              <a 
                href="mailto:aass0810@gmail.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                aass0810@gmail.com
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
                Report issues or contribute to the project
              </p>
              <a 
                href="https://github.com/aass0810" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                github.com/aass0810
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
              <h3 className="text-xl font-bold text-white mb-2">X</h3>
              <p className="text-gray-300 mb-4">
                Follow us for updates and announcements
              </p>
              <a 
                href="https://x.com/aass0810" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                @aass0810
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800 rounded-lg p-6 text-center"
            >
              <div className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-4">
                <FiInstagram size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
              <p className="text-gray-300 mb-4">
                Follow our visual updates and stories
              </p>
              <a 
                href="https://www.instagram.com/aass0810/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                @aass0810
              </a>
            </motion.div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Leave us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name <span className="text-red-500">*</span>
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
                    Email <span className="text-red-500">*</span>
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
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Please select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message <span className="text-red-500">*</span>
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
                    Your message has been sent successfully! We'll get back to you soon.
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
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