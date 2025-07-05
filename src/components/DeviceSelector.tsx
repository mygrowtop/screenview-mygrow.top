"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMonitor, FiTablet, FiSmartphone, FiPlus, FiX, FiExternalLink } from "react-icons/fi";

export interface Device {
  id: string;
  name: string;
  type: "mobile" | "tablet" | "laptop" | "desktop" | "custom";
  width: number;
  height: number;
  brand?: string;
}

interface DeviceSelectorProps {
  selectedDevices: Device[];
  onSelectDevice: (device: Device) => void;
  onRemoveDevice: (deviceId: string) => void;
  onOpenDeviceModal?: (device: Device) => void;
}

const PRESET_DEVICES: Device[] = [
  // Mobile Devices
  { id: "iphone-se", name: "iPhone SE", type: "mobile", width: 375, height: 667, brand: "Apple" },
  { id: "iphone-xr", name: "iPhone XR", type: "mobile", width: 414, height: 896, brand: "Apple" },
  { id: "iphone-12-mini", name: "iPhone 12 Mini", type: "mobile", width: 360, height: 780, brand: "Apple" },
  { id: "iphone-12", name: "iPhone 12/13", type: "mobile", width: 390, height: 844, brand: "Apple" },
  { id: "iphone-12-pro-max", name: "iPhone 12/13 Pro Max", type: "mobile", width: 428, height: 926, brand: "Apple" },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", type: "mobile", width: 393, height: 852, brand: "Apple" },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", type: "mobile", width: 430, height: 932, brand: "Apple" },
  { id: "iphone-15", name: "iPhone 15", type: "mobile", width: 393, height: 852, brand: "Apple" },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", type: "mobile", width: 430, height: 932, brand: "Apple" },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", type: "mobile", width: 393, height: 852, brand: "Apple" },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", type: "mobile", width: 430, height: 932, brand: "Apple" },
  { id: "pixel-5", name: "Google Pixel 5", type: "mobile", width: 393, height: 851, brand: "Google" },
  { id: "pixel-6", name: "Google Pixel 6", type: "mobile", width: 412, height: 915, brand: "Google" },
  { id: "pixel-6-pro", name: "Google Pixel 6 Pro", type: "mobile", width: 412, height: 915, brand: "Google" },
  { id: "pixel-7", name: "Google Pixel 7", type: "mobile", width: 412, height: 915, brand: "Google" },
  { id: "pixel-7-pro", name: "Google Pixel 7 Pro", type: "mobile", width: 412, height: 915, brand: "Google" },
  { id: "pixel-8", name: "Google Pixel 8", type: "mobile", width: 412, height: 915, brand: "Google" },
  { id: "pixel-8-pro", name: "Google Pixel 8 Pro", type: "mobile", width: 428, height: 926, brand: "Google" },
  { id: "samsung-galaxy-s21", name: "Samsung Galaxy S21", type: "mobile", width: 360, height: 800, brand: "Samsung" },
  { id: "samsung-galaxy-s22", name: "Samsung Galaxy S22", type: "mobile", width: 360, height: 780, brand: "Samsung" },
  { id: "samsung-galaxy-s22-plus", name: "Samsung Galaxy S22+", type: "mobile", width: 390, height: 844, brand: "Samsung" },
  { id: "samsung-galaxy-s22-ultra", name: "Samsung Galaxy S22 Ultra", type: "mobile", width: 412, height: 915, brand: "Samsung" },
  { id: "samsung-galaxy-s23", name: "Samsung Galaxy S23", type: "mobile", width: 360, height: 780, brand: "Samsung" },
  { id: "samsung-galaxy-s23-plus", name: "Samsung Galaxy S23+", type: "mobile", width: 390, height: 844, brand: "Samsung" },
  { id: "samsung-galaxy-s23-ultra", name: "Samsung Galaxy S23 Ultra", type: "mobile", width: 412, height: 915, brand: "Samsung" },
  { id: "samsung-galaxy-s24", name: "Samsung Galaxy S24", type: "mobile", width: 360, height: 780, brand: "Samsung" },
  { id: "samsung-galaxy-s24-plus", name: "Samsung Galaxy S24+", type: "mobile", width: 390, height: 844, brand: "Samsung" },
  { id: "samsung-galaxy-s24-ultra", name: "Samsung Galaxy S24 Ultra", type: "mobile", width: 412, height: 915, brand: "Samsung" },
  { id: "samsung-galaxy-z-fold5", name: "Samsung Galaxy Z Fold5", type: "mobile", width: 412, height: 934, brand: "Samsung" },
  { id: "samsung-galaxy-z-flip5", name: "Samsung Galaxy Z Flip5", type: "mobile", width: 360, height: 800, brand: "Samsung" },
  { id: "xiaomi-mi-11", name: "Xiaomi Mi 11", type: "mobile", width: 393, height: 873, brand: "Xiaomi" },
  { id: "xiaomi-13", name: "Xiaomi 13", type: "mobile", width: 393, height: 851, brand: "Xiaomi" },
  { id: "xiaomi-13-pro", name: "Xiaomi 13 Pro", type: "mobile", width: 412, height: 915, brand: "Xiaomi" },
  { id: "xiaomi-14", name: "Xiaomi 14", type: "mobile", width: 393, height: 851, brand: "Xiaomi" },
  { id: "xiaomi-14-pro", name: "Xiaomi 14 Pro", type: "mobile", width: 412, height: 915, brand: "Xiaomi" },
  { id: "huawei-p50", name: "Huawei P50", type: "mobile", width: 393, height: 873, brand: "Huawei" },
  { id: "huawei-p50-pro", name: "Huawei P50 Pro", type: "mobile", width: 412, height: 915, brand: "Huawei" },
  { id: "huawei-mate-50", name: "Huawei Mate 50", type: "mobile", width: 393, height: 873, brand: "Huawei" },
  { id: "huawei-mate-50-pro", name: "Huawei Mate 50 Pro", type: "mobile", width: 412, height: 915, brand: "Huawei" },
  { id: "huawei-mate-60", name: "Huawei Mate 60", type: "mobile", width: 393, height: 873, brand: "Huawei" },
  { id: "huawei-mate-60-pro", name: "Huawei Mate 60 Pro", type: "mobile", width: 412, height: 915, brand: "Huawei" },
  { id: "oppo-find-x5", name: "OPPO Find X5", type: "mobile", width: 393, height: 851, brand: "OPPO" },
  { id: "oppo-find-x5-pro", name: "OPPO Find X5 Pro", type: "mobile", width: 412, height: 915, brand: "OPPO" },
  { id: "oppo-find-x6", name: "OPPO Find X6", type: "mobile", width: 393, height: 851, brand: "OPPO" },
  { id: "oppo-find-x6-pro", name: "OPPO Find X6 Pro", type: "mobile", width: 412, height: 915, brand: "OPPO" },
  { id: "vivo-x90", name: "Vivo X90", type: "mobile", width: 393, height: 851, brand: "Vivo" },
  { id: "vivo-x90-pro", name: "Vivo X90 Pro", type: "mobile", width: 412, height: 915, brand: "Vivo" },
  { id: "vivo-x100", name: "Vivo X100", type: "mobile", width: 393, height: 851, brand: "Vivo" },
  { id: "vivo-x100-pro", name: "Vivo X100 Pro", type: "mobile", width: 412, height: 915, brand: "Vivo" },
  { id: "oneplus-11", name: "OnePlus 11", type: "mobile", width: 412, height: 915, brand: "OnePlus" },
  { id: "oneplus-12", name: "OnePlus 12", type: "mobile", width: 412, height: 915, brand: "OnePlus" },
  
  // Tablet Devices
  { id: "ipad-mini", name: "iPad Mini", type: "tablet", width: 768, height: 1024, brand: "Apple" },
  { id: "ipad-mini-6", name: "iPad Mini 6", type: "tablet", width: 744, height: 1133, brand: "Apple" },
  { id: "ipad-9", name: "iPad 9", type: "tablet", width: 810, height: 1080, brand: "Apple" },
  { id: "ipad-10", name: "iPad 10", type: "tablet", width: 820, height: 1180, brand: "Apple" },
  { id: "ipad-air", name: "iPad Air", type: "tablet", width: 820, height: 1180, brand: "Apple" },
  { id: "ipad-air-5", name: "iPad Air 5", type: "tablet", width: 820, height: 1180, brand: "Apple" },
  { id: "ipad-pro-11", name: "iPad Pro 11\"", type: "tablet", width: 834, height: 1194, brand: "Apple" },
  { id: "ipad-pro-11-m2", name: "iPad Pro 11\" M2", type: "tablet", width: 834, height: 1194, brand: "Apple" },
  { id: "ipad-pro-12.9", name: "iPad Pro 12.9\"", type: "tablet", width: 1024, height: 1366, brand: "Apple" },
  { id: "ipad-pro-12.9-m2", name: "iPad Pro 12.9\" M2", type: "tablet", width: 1024, height: 1366, brand: "Apple" },
  { id: "surface-pro-8", name: "Surface Pro 8", type: "tablet", width: 1440, height: 960, brand: "Microsoft" },
  { id: "surface-pro-9", name: "Surface Pro 9", type: "tablet", width: 1440, height: 960, brand: "Microsoft" },
  { id: "surface-go-3", name: "Surface Go 3", type: "tablet", width: 1024, height: 768, brand: "Microsoft" },
  { id: "galaxy-tab-s7", name: "Galaxy Tab S7", type: "tablet", width: 1600, height: 2560, brand: "Samsung" },
  { id: "galaxy-tab-s8", name: "Galaxy Tab S8", type: "tablet", width: 1600, height: 2560, brand: "Samsung" },
  { id: "galaxy-tab-s8-plus", name: "Galaxy Tab S8+", type: "tablet", width: 1752, height: 2800, brand: "Samsung" },
  { id: "galaxy-tab-s8-ultra", name: "Galaxy Tab S8 Ultra", type: "tablet", width: 1848, height: 2960, brand: "Samsung" },
  { id: "galaxy-tab-s9", name: "Galaxy Tab S9", type: "tablet", width: 1600, height: 2560, brand: "Samsung" },
  { id: "galaxy-tab-s9-plus", name: "Galaxy Tab S9+", type: "tablet", width: 1752, height: 2800, brand: "Samsung" },
  { id: "galaxy-tab-s9-ultra", name: "Galaxy Tab S9 Ultra", type: "tablet", width: 1848, height: 2960, brand: "Samsung" },
  { id: "xiaomi-pad-6", name: "Xiaomi Pad 6", type: "tablet", width: 1800, height: 2880, brand: "Xiaomi" },
  { id: "xiaomi-pad-6-pro", name: "Xiaomi Pad 6 Pro", type: "tablet", width: 1800, height: 2880, brand: "Xiaomi" },
  { id: "huawei-matepad-pro", name: "Huawei MatePad Pro", type: "tablet", width: 1600, height: 2560, brand: "Huawei" },
  { id: "huawei-matepad-pro-12.6", name: "Huawei MatePad Pro 12.6", type: "tablet", width: 1600, height: 2560, brand: "Huawei" },
  { id: "lenovo-tab-p12-pro", name: "Lenovo Tab P12 Pro", type: "tablet", width: 1600, height: 2560, brand: "Lenovo" },
  { id: "nexus-10", name: "Nexus 10", type: "tablet", width: 800, height: 1280, brand: "Google" },
  
  // Laptop Devices
  { id: "macbook-air", name: "MacBook Air", type: "laptop", width: 1280, height: 800, brand: "Apple" },
  { id: "macbook-air-m1", name: "MacBook Air M1", type: "laptop", width: 1280, height: 800, brand: "Apple" },
  { id: "macbook-air-m2", name: "MacBook Air M2", type: "laptop", width: 1280, height: 800, brand: "Apple" },
  { id: "macbook-air-15", name: "MacBook Air 15\"", type: "laptop", width: 1280, height: 800, brand: "Apple" },
  { id: "macbook-pro-13", name: "MacBook Pro 13\"", type: "laptop", width: 1440, height: 900, brand: "Apple" },
  { id: "macbook-pro-14", name: "MacBook Pro 14\"", type: "laptop", width: 1512, height: 982, brand: "Apple" },
  { id: "macbook-pro-16", name: "MacBook Pro 16\"", type: "laptop", width: 1728, height: 1117, brand: "Apple" },
  { id: "macbook-pro-m1", name: "MacBook Pro M1", type: "laptop", width: 1440, height: 900, brand: "Apple" },
  { id: "macbook-pro-m1-pro", name: "MacBook Pro M1 Pro", type: "laptop", width: 1512, height: 982, brand: "Apple" },
  { id: "macbook-pro-m1-max", name: "MacBook Pro M1 Max", type: "laptop", width: 1728, height: 1117, brand: "Apple" },
  { id: "macbook-pro-m2", name: "MacBook Pro M2", type: "laptop", width: 1440, height: 900, brand: "Apple" },
  { id: "macbook-pro-m2-pro", name: "MacBook Pro M2 Pro", type: "laptop", width: 1512, height: 982, brand: "Apple" },
  { id: "macbook-pro-m2-max", name: "MacBook Pro M2 Max", type: "laptop", width: 1728, height: 1117, brand: "Apple" },
  { id: "macbook-pro-m3", name: "MacBook Pro M3", type: "laptop", width: 1440, height: 900, brand: "Apple" },
  { id: "macbook-pro-m3-pro", name: "MacBook Pro M3 Pro", type: "laptop", width: 1512, height: 982, brand: "Apple" },
  { id: "macbook-pro-m3-max", name: "MacBook Pro M3 Max", type: "laptop", width: 1728, height: 1117, brand: "Apple" },
  { id: "dell-xps-13", name: "Dell XPS 13", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "dell-xps-13-plus", name: "Dell XPS 13 Plus", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "dell-xps-13-2-in-1", name: "Dell XPS 13 2-in-1", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "dell-xps-13-4k", name: "Dell XPS 13 4K", type: "laptop", width: 3840, height: 2160, brand: "Dell" },
  { id: "dell-xps-15", name: "Dell XPS 15", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "dell-xps-15-4k", name: "Dell XPS 15 4K", type: "laptop", width: 3840, height: 2160, brand: "Dell" },
  { id: "dell-xps-15-oled", name: "Dell XPS 15 OLED", type: "laptop", width: 3456, height: 2160, brand: "Dell" },
  { id: "dell-xps-17", name: "Dell XPS 17", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "dell-xps-17-4k", name: "Dell XPS 17 4K", type: "laptop", width: 3840, height: 2160, brand: "Dell" },
  { id: "dell-inspiron-14", name: "Dell Inspiron 14", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "dell-inspiron-15", name: "Dell Inspiron 15", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "dell-inspiron-16", name: "Dell Inspiron 16", type: "laptop", width: 1920, height: 1080, brand: "Dell" },
  { id: "hp-spectre-x360", name: "HP Spectre x360", type: "laptop", width: 1920, height: 1080, brand: "HP" },
  { id: "hp-spectre-x360-14", name: "HP Spectre x360 14", type: "laptop", width: 1920, height: 1280, brand: "HP" },
  { id: "hp-spectre-x360-16", name: "HP Spectre x360 16", type: "laptop", width: 3072, height: 1920, brand: "HP" },
  { id: "hp-envy-13", name: "HP Envy 13", type: "laptop", width: 1920, height: 1080, brand: "HP" },
  { id: "hp-envy-15", name: "HP Envy 15", type: "laptop", width: 1920, height: 1080, brand: "HP" },
  { id: "hp-envy-17", name: "HP Envy 17", type: "laptop", width: 1920, height: 1080, brand: "HP" },
  { id: "lenovo-thinkpad-x1", name: "Lenovo ThinkPad X1", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-thinkpad-x1-carbon", name: "Lenovo ThinkPad X1 Carbon", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-thinkpad-x1-yoga", name: "Lenovo ThinkPad X1 Yoga", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-thinkpad-x1-nano", name: "Lenovo ThinkPad X1 Nano", type: "laptop", width: 2160, height: 1350, brand: "Lenovo" },
  { id: "lenovo-thinkpad-t14", name: "Lenovo ThinkPad T14", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-thinkpad-t15", name: "Lenovo ThinkPad T15", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-thinkpad-p15", name: "Lenovo ThinkPad P15", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-thinkpad-p17", name: "Lenovo ThinkPad P17", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-yoga-9i", name: "Lenovo Yoga 9i", type: "laptop", width: 3840, height: 2160, brand: "Lenovo" },
  { id: "lenovo-yoga-7i", name: "Lenovo Yoga 7i", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-ideapad-5", name: "Lenovo IdeaPad 5", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-ideapad-slim-7", name: "Lenovo IdeaPad Slim 7", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-legion-5", name: "Lenovo Legion 5", type: "laptop", width: 1920, height: 1080, brand: "Lenovo" },
  { id: "lenovo-legion-7", name: "Lenovo Legion 7", type: "laptop", width: 2560, height: 1600, brand: "Lenovo" },
  { id: "asus-zenbook-13", name: "ASUS ZenBook 13", type: "laptop", width: 1920, height: 1080, brand: "ASUS" },
  { id: "asus-zenbook-14", name: "ASUS ZenBook 14", type: "laptop", width: 1920, height: 1080, brand: "ASUS" },
  { id: "asus-zenbook-15", name: "ASUS ZenBook 15", type: "laptop", width: 1920, height: 1080, brand: "ASUS" },
  { id: "asus-zenbook-pro-14", name: "ASUS ZenBook Pro 14", type: "laptop", width: 2880, height: 1800, brand: "ASUS" },
  { id: "asus-zenbook-pro-16", name: "ASUS ZenBook Pro 16", type: "laptop", width: 3840, height: 2160, brand: "ASUS" },
  { id: "asus-vivobook-14", name: "ASUS VivoBook 14", type: "laptop", width: 1920, height: 1080, brand: "ASUS" },
  { id: "asus-vivobook-15", name: "ASUS VivoBook 15", type: "laptop", width: 1920, height: 1080, brand: "ASUS" },
  { id: "asus-vivobook-16", name: "ASUS VivoBook 16", type: "laptop", width: 1920, height: 1080, brand: "ASUS" },
  { id: "asus-rog-zephyrus-g14", name: "ASUS ROG Zephyrus G14", type: "laptop", width: 2560, height: 1600, brand: "ASUS" },
  { id: "asus-rog-zephyrus-g15", name: "ASUS ROG Zephyrus G15", type: "laptop", width: 2560, height: 1440, brand: "ASUS" },
  { id: "asus-rog-strix-scar-15", name: "ASUS ROG Strix SCAR 15", type: "laptop", width: 2560, height: 1440, brand: "ASUS" },
  { id: "asus-rog-strix-scar-17", name: "ASUS ROG Strix SCAR 17", type: "laptop", width: 2560, height: 1440, brand: "ASUS" },
  { id: "acer-swift-3", name: "Acer Swift 3", type: "laptop", width: 1920, height: 1080, brand: "Acer" },
  { id: "acer-swift-5", name: "Acer Swift 5", type: "laptop", width: 1920, height: 1080, brand: "Acer" },
  { id: "acer-swift-x", name: "Acer Swift X", type: "laptop", width: 1920, height: 1080, brand: "Acer" },
  { id: "acer-aspire-5", name: "Acer Aspire 5", type: "laptop", width: 1920, height: 1080, brand: "Acer" },
  { id: "acer-nitro-5", name: "Acer Nitro 5", type: "laptop", width: 1920, height: 1080, brand: "Acer" },
  { id: "acer-predator-helios-300", name: "Acer Predator Helios 300", type: "laptop", width: 1920, height: 1080, brand: "Acer" },
  { id: "acer-predator-triton-500", name: "Acer Predator Triton 500", type: "laptop", width: 1920, height: 1080, brand: "Acer" },
  { id: "msi-prestige-14", name: "MSI Prestige 14", type: "laptop", width: 1920, height: 1080, brand: "MSI" },
  { id: "msi-prestige-15", name: "MSI Prestige 15", type: "laptop", width: 3840, height: 2160, brand: "MSI" },
  { id: "msi-creator-z16", name: "MSI Creator Z16", type: "laptop", width: 2560, height: 1600, brand: "MSI" },
  { id: "msi-stealth-15", name: "MSI Stealth 15", type: "laptop", width: 1920, height: 1080, brand: "MSI" },
  { id: "msi-raider-ge66", name: "MSI Raider GE66", type: "laptop", width: 1920, height: 1080, brand: "MSI" },
  { id: "msi-raider-ge76", name: "MSI Raider GE76", type: "laptop", width: 3840, height: 2160, brand: "MSI" },
  { id: "razer-blade-14", name: "Razer Blade 14", type: "laptop", width: 2560, height: 1440, brand: "Razer" },
  { id: "razer-blade-15", name: "Razer Blade 15", type: "laptop", width: 1920, height: 1080, brand: "Razer" },
  { id: "razer-blade-15-4k", name: "Razer Blade 15 4K", type: "laptop", width: 3840, height: 2160, brand: "Razer" },
  { id: "razer-blade-17", name: "Razer Blade 17", type: "laptop", width: 2560, height: 1440, brand: "Razer" },
  { id: "surface-laptop-4-13", name: "Surface Laptop 4 13.5\"", type: "laptop", width: 2256, height: 1504, brand: "Microsoft" },
  { id: "surface-laptop-4-15", name: "Surface Laptop 4 15\"", type: "laptop", width: 2496, height: 1664, brand: "Microsoft" },
  { id: "surface-laptop-5-13", name: "Surface Laptop 5 13.5\"", type: "laptop", width: 2256, height: 1504, brand: "Microsoft" },
  { id: "surface-laptop-5-15", name: "Surface Laptop 5 15\"", type: "laptop", width: 2496, height: 1664, brand: "Microsoft" },
  { id: "surface-laptop-studio", name: "Surface Laptop Studio", type: "laptop", width: 2400, height: 1600, brand: "Microsoft" },
  { id: "surface-book-3-13", name: "Surface Book 3 13.5\"", type: "laptop", width: 3000, height: 2000, brand: "Microsoft" },
  { id: "surface-book-3-15", name: "Surface Book 3 15\"", type: "laptop", width: 3240, height: 2160, brand: "Microsoft" },
  { id: "google-pixelbook", name: "Google Pixelbook", type: "laptop", width: 2400, height: 1600, brand: "Google" },
  { id: "google-pixelbook-go", name: "Google Pixelbook Go", type: "laptop", width: 1920, height: 1080, brand: "Google" },
  { id: "samsung-galaxy-book3-pro", name: "Samsung Galaxy Book3 Pro", type: "laptop", width: 2880, height: 1800, brand: "Samsung" },
  { id: "samsung-galaxy-book3-ultra", name: "Samsung Galaxy Book3 Ultra", type: "laptop", width: 2880, height: 1800, brand: "Samsung" },
  { id: "huawei-matebook-x-pro", name: "Huawei MateBook X Pro", type: "laptop", width: 3000, height: 2000, brand: "Huawei" },
  { id: "huawei-matebook-14", name: "Huawei MateBook 14", type: "laptop", width: 2160, height: 1440, brand: "Huawei" },
  { id: "huawei-matebook-16", name: "Huawei MateBook 16", type: "laptop", width: 2520, height: 1680, brand: "Huawei" },
  { id: "xiaomi-notebook-pro", name: "Xiaomi Notebook Pro", type: "laptop", width: 2560, height: 1600, brand: "Xiaomi" },
  { id: "framework-laptop-13", name: "Framework Laptop 13", type: "laptop", width: 2256, height: 1504, brand: "Framework" },
  { id: "framework-laptop-16", name: "Framework Laptop 16", type: "laptop", width: 2560, height: 1600, brand: "Framework" },
  
  // Desktop Devices
  { id: "imac-24", name: "iMac 24\"", type: "desktop", width: 2240, height: 1260, brand: "Apple" },
  { id: "imac-27", name: "iMac 27\"", type: "desktop", width: 2560, height: 1440, brand: "Apple" },
  { id: "imac-m1", name: "iMac M1", type: "desktop", width: 2240, height: 1260, brand: "Apple" },
  { id: "imac-pro", name: "iMac Pro", type: "desktop", width: 2560, height: 1440, brand: "Apple" },
  { id: "mac-mini", name: "Mac Mini", type: "desktop", width: 1920, height: 1080, brand: "Apple" },
  { id: "mac-studio", name: "Mac Studio", type: "desktop", width: 2560, height: 1440, brand: "Apple" },
  { id: "mac-pro", name: "Mac Pro", type: "desktop", width: 2560, height: 1440, brand: "Apple" },
  { id: "desktop-hd", name: "桌面 HD", type: "desktop", width: 1366, height: 768, brand: "通用" },
  { id: "desktop-fhd", name: "桌面全高清", type: "desktop", width: 1920, height: 1080, brand: "通用" },
  { id: "desktop-qhd", name: "桌面 QHD", type: "desktop", width: 2560, height: 1440, brand: "通用" },
  { id: "desktop-4k", name: "桌面 4K", type: "desktop", width: 3840, height: 2160, brand: "通用" },
  { id: "desktop-5k", name: "桌面 5K", type: "desktop", width: 5120, height: 2880, brand: "通用" },
  { id: "desktop-8k", name: "桌面 8K", type: "desktop", width: 7680, height: 4320, brand: "通用" },
  { id: "ultrawide-fhd", name: "超宽全高清", type: "desktop", width: 2560, height: 1080, brand: "超宽屏" },
  { id: "ultrawide-qhd", name: "超宽 QHD", type: "desktop", width: 3440, height: 1440, brand: "超宽屏" },
  { id: "ultrawide-4k", name: "超宽 4K", type: "desktop", width: 3840, height: 1600, brand: "超宽屏" },
  { id: "dual-monitor-fhd", name: "双屏全高清", type: "desktop", width: 3840, height: 1080, brand: "多屏幕" },
  { id: "dual-monitor-qhd", name: "双屏 QHD", type: "desktop", width: 5120, height: 1440, brand: "多屏幕" },
];

const DeviceSelector = ({
  selectedDevices,
  onSelectDevice,
  onRemoveDevice,
  onOpenDeviceModal,
}: DeviceSelectorProps) => {
  const [customWidth, setCustomWidth] = useState("375");
  const [customHeight, setCustomHeight] = useState("667");
  const [customName, setCustomName] = useState("自定义设备");
  const [activeTab, setActiveTab] = useState<"mobile" | "tablet" | "laptop" | "desktop" | "custom">("mobile");
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleAddCustomDevice = () => {
    const width = parseInt(customWidth, 10);
    const height = parseInt(customHeight, 10);
    
    if (width > 0 && height > 0) {
      const newDevice: Device = {
        id: `custom-${Date.now()}`,
        name: customName || "自定义设备",
        type: "custom",
        width,
        height,
      };
      
      onSelectDevice(newDevice);
      setIsAddingCustom(false);
    }
  };

  // 获取当前分类下的所有品牌
  const getBrandsForActiveTab = () => {
    const brands = PRESET_DEVICES
      .filter(device => device.type === activeTab && device.brand)
      .map(device => device.brand as string);
    
    // 去重并排序
    return Array.from(new Set(brands)).sort();
  };

  // 重置品牌选择
  const resetBrandFilter = () => {
    setSelectedBrand(null);
  };

  // 当切换标签时，重置品牌筛选
  const handleTabChange = (tab: "mobile" | "tablet" | "laptop" | "desktop" | "custom") => {
    setActiveTab(tab);
    resetBrandFilter();
  };

  // Filter devices based on active tab, search query and selected brand
  const filteredDevices = PRESET_DEVICES.filter((device) => {
    const matchesTab = device.type === activeTab;
    const matchesBrand = selectedBrand ? device.brand === selectedBrand : true;
    const matchesSearch = searchQuery 
      ? device.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        `${device.width}x${device.height}`.includes(searchQuery)
      : true;
    return matchesTab && matchesSearch && matchesBrand;
  });

  const availableBrands = getBrandsForActiveTab();

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-8">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white mb-2 md:mb-0">设备选择</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTabChange("mobile")}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "mobile"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiSmartphone className="mr-1" />
            手机
          </button>
          <button
            onClick={() => handleTabChange("tablet")}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "tablet"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiTablet className="mr-1" />
            平板
          </button>
          <button
            onClick={() => handleTabChange("laptop")}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "laptop"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiMonitor className="mr-1" />
            笔记本
          </button>
          <button
            onClick={() => handleTabChange("desktop")}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "desktop"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiMonitor className="mr-1" />
            台式机
          </button>
          <button
            onClick={() => {
              handleTabChange("custom");
              setIsAddingCustom(true);
            }}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "custom"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiPlus className="mr-1" />
            自定义
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="搜索设备..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* 品牌筛选 */}
      {activeTab !== "custom" && availableBrands.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400">品牌:</span>
            <button
              onClick={() => resetBrandFilter()}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedBrand === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              全部
            </button>
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedBrand === brand
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {activeTab !== "custom" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredDevices.map((device) => (
            <motion.button
              key={device.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectDevice(device)}
              className="p-3 rounded-lg border border-gray-700 hover:border-gray-600 bg-gray-800 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-white">{device.name}</span>
                <FiExternalLink className="text-gray-400" />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {device.width} × {device.height}
              </div>
              {device.brand && (
                <div className="text-xs text-gray-500 mt-1">
                  {device.brand}
                </div>
              )}
            </motion.button>
          ))}
          
          {filteredDevices.length === 0 && (
            <div className="col-span-full text-center py-6 text-gray-400">
              没有找到匹配的设备。请尝试不同的关键词或创建自定义设备。
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg p-4">
          {isAddingCustom ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="custom-name" className="block text-sm font-medium text-gray-300 mb-1">
                  设备名称
                </label>
                <input
                  type="text"
                  id="custom-name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="自定义设备"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-width" className="block text-sm font-medium text-gray-300 mb-1">
                    宽度 (像素)
                  </label>
                  <input
                    type="number"
                    id="custom-width"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="custom-height" className="block text-sm font-medium text-gray-300 mb-1">
                    高度 (像素)
                  </label>
                  <input
                    type="number"
                    id="custom-height"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddingCustom(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleAddCustomDevice}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  添加设备
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-400 mb-4">创建具有特定尺寸的自定义设备</p>
              <button
                onClick={() => setIsAddingCustom(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors inline-flex items-center"
              >
                <FiPlus className="mr-1" />
                添加自定义设备
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeviceSelector; 