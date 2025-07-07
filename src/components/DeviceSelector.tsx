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
  year?: number;
}

interface DeviceSelectorProps {
  selectedDevices: Device[];
  onSelectDevice: (device: Device) => void;
  onRemoveDevice: (deviceId: string) => void;
  onOpenDeviceModal?: (device: Device) => void;
}

const PRESET_DEVICES: Device[] = [
  // 最新设备 (2025年)
  // iPhone 16系列
  { id: "iphone-16", name: "iPhone 16", type: "mobile", width: 393, height: 852, brand: "Apple", year: 2025 },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", type: "mobile", width: 430, height: 932, brand: "Apple", year: 2025 },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", type: "mobile", width: 393, height: 852, brand: "Apple", year: 2025 },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", type: "mobile", width: 430, height: 932, brand: "Apple", year: 2025 },
  { id: "iphone-16e", name: "iPhone 16e", type: "mobile", width: 393, height: 852, brand: "Apple", year: 2025 },
  
  // Samsung Galaxy S25系列
  { id: "samsung-galaxy-s25", name: "Samsung Galaxy S25", type: "mobile", width: 360, height: 780, brand: "Samsung", year: 2025 },
  { id: "samsung-galaxy-s25-plus", name: "Samsung Galaxy S25+", type: "mobile", width: 390, height: 844, brand: "Samsung", year: 2025 },
  { id: "samsung-galaxy-s25-ultra", name: "Samsung Galaxy S25 Ultra", type: "mobile", width: 412, height: 915, brand: "Samsung", year: 2025 },
  { id: "samsung-galaxy-s24-fe", name: "Samsung Galaxy S24 FE", type: "mobile", width: 390, height: 844, brand: "Samsung", year: 2024 },
  
  // Google Pixel 10系列
  { id: "google-pixel-10", name: "Google Pixel 10", type: "mobile", width: 412, height: 915, brand: "Google", year: 2025 },
  { id: "google-pixel-10-pro", name: "Google Pixel 10 Pro", type: "mobile", width: 428, height: 926, brand: "Google", year: 2025 },
  { id: "google-pixel-10-fold", name: "Google Pixel 10 Fold", type: "mobile", width: 412, height: 915, brand: "Google", year: 2025 },
  
  // Xiaomi 15系列
  { id: "xiaomi-15", name: "Xiaomi 15", type: "mobile", width: 393, height: 851, brand: "Xiaomi", year: 2024 },
  { id: "xiaomi-15-pro", name: "Xiaomi 15 Pro", type: "mobile", width: 412, height: 915, brand: "Xiaomi", year: 2024 },
  { id: "xiaomi-15-ultra", name: "Xiaomi 15 Ultra", type: "mobile", width: 412, height: 915, brand: "Xiaomi", year: 2024 },
  
  // Huawei P70系列
  { id: "huawei-p70", name: "Huawei P70", type: "mobile", width: 393, height: 873, brand: "Huawei", year: 2024 },
  { id: "huawei-p70-pro", name: "Huawei P70 Pro", type: "mobile", width: 412, height: 915, brand: "Huawei", year: 2024 },
  { id: "huawei-p70-pro-plus", name: "Huawei P70 Pro+", type: "mobile", width: 428, height: 926, brand: "Huawei", year: 2024 },
  
  // OPPO Find X8系列
  { id: "oppo-find-x8", name: "OPPO Find X8", type: "mobile", width: 393, height: 851, brand: "OPPO", year: 2024 },
  { id: "oppo-find-x8-pro", name: "OPPO Find X8 Pro", type: "mobile", width: 412, height: 915, brand: "OPPO", year: 2024 },
  { id: "oppo-find-x8-ultra", name: "OPPO Find X8 Ultra", type: "mobile", width: 428, height: 926, brand: "OPPO", year: 2024 },
  
  // Vivo X200系列
  { id: "vivo-x200", name: "Vivo X200", type: "mobile", width: 393, height: 851, brand: "Vivo", year: 2024 },
  { id: "vivo-x200-pro", name: "Vivo X200 Pro", type: "mobile", width: 412, height: 915, brand: "Vivo", year: 2024 },
  { id: "vivo-x200-ultra", name: "Vivo X200 Ultra", type: "mobile", width: 428, height: 926, brand: "Vivo", year: 2024 },
  
  // Honor Magic7系列
  { id: "honor-magic7", name: "Honor Magic7", type: "mobile", width: 393, height: 851, brand: "Honor", year: 2024 },
  { id: "honor-magic7-pro", name: "Honor Magic7 Pro", type: "mobile", width: 412, height: 915, brand: "Honor", year: 2024 },
  
  // Mobile Devices (2024年及更早)
  { id: "iphone-se", name: "iPhone SE", type: "mobile", width: 375, height: 667, brand: "Apple", year: 2022 },
  { id: "iphone-xr", name: "iPhone XR", type: "mobile", width: 414, height: 896, brand: "Apple", year: 2018 },
  { id: "iphone-12-mini", name: "iPhone 12 Mini", type: "mobile", width: 360, height: 780, brand: "Apple", year: 2020 },
  { id: "iphone-12", name: "iPhone 12/13", type: "mobile", width: 390, height: 844, brand: "Apple", year: 2020 },
  { id: "iphone-12-pro-max", name: "iPhone 12/13 Pro Max", type: "mobile", width: 428, height: 926, brand: "Apple", year: 2020 },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", type: "mobile", width: 393, height: 852, brand: "Apple", year: 2022 },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", type: "mobile", width: 430, height: 932, brand: "Apple", year: 2022 },
  { id: "iphone-15", name: "iPhone 15", type: "mobile", width: 393, height: 852, brand: "Apple", year: 2023 },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", type: "mobile", width: 430, height: 932, brand: "Apple", year: 2023 },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", type: "mobile", width: 393, height: 852, brand: "Apple", year: 2023 },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", type: "mobile", width: 430, height: 932, brand: "Apple", year: 2023 },
  { id: "pixel-5", name: "Google Pixel 5", type: "mobile", width: 393, height: 851, brand: "Google", year: 2020 },
  { id: "pixel-6", name: "Google Pixel 6", type: "mobile", width: 412, height: 915, brand: "Google", year: 2021 },
  { id: "pixel-6-pro", name: "Google Pixel 6 Pro", type: "mobile", width: 412, height: 915, brand: "Google", year: 2021 },
  { id: "pixel-7", name: "Google Pixel 7", type: "mobile", width: 412, height: 915, brand: "Google", year: 2022 },
  { id: "pixel-7-pro", name: "Google Pixel 7 Pro", type: "mobile", width: 412, height: 915, brand: "Google", year: 2022 },
  { id: "pixel-8", name: "Google Pixel 8", type: "mobile", width: 412, height: 915, brand: "Google", year: 2023 },
  { id: "pixel-8-pro", name: "Google Pixel 8 Pro", type: "mobile", width: 428, height: 926, brand: "Google", year: 2023 },
  { id: "pixel-9", name: "Google Pixel 9", type: "mobile", width: 412, height: 915, brand: "Google", year: 2024 },
  { id: "pixel-9-pro", name: "Google Pixel 9 Pro", type: "mobile", width: 428, height: 926, brand: "Google", year: 2024 },
  { id: "samsung-galaxy-s21", name: "Samsung Galaxy S21", type: "mobile", width: 360, height: 800, brand: "Samsung", year: 2021 },
  { id: "samsung-galaxy-s22", name: "Samsung Galaxy S22", type: "mobile", width: 360, height: 780, brand: "Samsung", year: 2022 },
  { id: "samsung-galaxy-s22-plus", name: "Samsung Galaxy S22+", type: "mobile", width: 390, height: 844, brand: "Samsung", year: 2022 },
  { id: "samsung-galaxy-s22-ultra", name: "Samsung Galaxy S22 Ultra", type: "mobile", width: 412, height: 915, brand: "Samsung", year: 2022 },
  { id: "samsung-galaxy-s23", name: "Samsung Galaxy S23", type: "mobile", width: 360, height: 780, brand: "Samsung", year: 2023 },
  { id: "samsung-galaxy-s23-plus", name: "Samsung Galaxy S23+", type: "mobile", width: 390, height: 844, brand: "Samsung", year: 2023 },
  { id: "samsung-galaxy-s23-ultra", name: "Samsung Galaxy S23 Ultra", type: "mobile", width: 412, height: 915, brand: "Samsung", year: 2023 },
  { id: "samsung-galaxy-s24", name: "Samsung Galaxy S24", type: "mobile", width: 360, height: 780, brand: "Samsung", year: 2024 },
  { id: "samsung-galaxy-s24-plus", name: "Samsung Galaxy S24+", type: "mobile", width: 390, height: 844, brand: "Samsung", year: 2024 },
  { id: "samsung-galaxy-s24-ultra", name: "Samsung Galaxy S24 Ultra", type: "mobile", width: 412, height: 915, brand: "Samsung", year: 2024 },
  { id: "samsung-galaxy-z-fold5", name: "Samsung Galaxy Z Fold5", type: "mobile", width: 412, height: 934, brand: "Samsung", year: 2023 },
  { id: "samsung-galaxy-z-flip5", name: "Samsung Galaxy Z Flip5", type: "mobile", width: 360, height: 800, brand: "Samsung", year: 2023 },
  { id: "xiaomi-mi-11", name: "Xiaomi Mi 11", type: "mobile", width: 393, height: 873, brand: "Xiaomi", year: 2021 },
  { id: "xiaomi-13", name: "Xiaomi 13", type: "mobile", width: 393, height: 851, brand: "Xiaomi", year: 2022 },
  { id: "xiaomi-13-pro", name: "Xiaomi 13 Pro", type: "mobile", width: 412, height: 915, brand: "Xiaomi", year: 2022 },
  { id: "xiaomi-14", name: "Xiaomi 14", type: "mobile", width: 393, height: 851, brand: "Xiaomi", year: 2023 },
  { id: "xiaomi-14-pro", name: "Xiaomi 14 Pro", type: "mobile", width: 412, height: 915, brand: "Xiaomi", year: 2023 },
  { id: "huawei-p50", name: "Huawei P50", type: "mobile", width: 393, height: 873, brand: "Huawei", year: 2021 },
  { id: "huawei-p50-pro", name: "Huawei P50 Pro", type: "mobile", width: 412, height: 915, brand: "Huawei", year: 2021 },
  { id: "huawei-mate-50", name: "Huawei Mate 50", type: "mobile", width: 393, height: 873, brand: "Huawei", year: 2022 },
  { id: "huawei-mate-50-pro", name: "Huawei Mate 50 Pro", type: "mobile", width: 412, height: 915, brand: "Huawei", year: 2022 },
  { id: "huawei-mate-60", name: "Huawei Mate 60", type: "mobile", width: 393, height: 873, brand: "Huawei", year: 2023 },
  { id: "huawei-mate-60-pro", name: "Huawei Mate 60 Pro", type: "mobile", width: 412, height: 915, brand: "Huawei", year: 2023 },
  { id: "oppo-find-x5", name: "OPPO Find X5", type: "mobile", width: 393, height: 851, brand: "OPPO", year: 2022 },
  { id: "oppo-find-x5-pro", name: "OPPO Find X5 Pro", type: "mobile", width: 412, height: 915, brand: "OPPO", year: 2022 },
  { id: "oppo-find-x6", name: "OPPO Find X6", type: "mobile", width: 393, height: 851, brand: "OPPO", year: 2023 },
  { id: "oppo-find-x6-pro", name: "OPPO Find X6 Pro", type: "mobile", width: 412, height: 915, brand: "OPPO", year: 2023 },
  { id: "oppo-find-x7", name: "OPPO Find X7", type: "mobile", width: 393, height: 851, brand: "OPPO", year: 2023 },
  { id: "oppo-find-x7-pro", name: "OPPO Find X7 Pro", type: "mobile", width: 412, height: 915, brand: "OPPO", year: 2023 },
  { id: "vivo-x90", name: "Vivo X90", type: "mobile", width: 393, height: 851, brand: "Vivo", year: 2022 },
  { id: "vivo-x90-pro", name: "Vivo X90 Pro", type: "mobile", width: 412, height: 915, brand: "Vivo", year: 2022 },
  { id: "vivo-x100", name: "Vivo X100", type: "mobile", width: 393, height: 851, brand: "Vivo", year: 2023 },
  { id: "vivo-x100-pro", name: "Vivo X100 Pro", type: "mobile", width: 412, height: 915, brand: "Vivo", year: 2023 },
  { id: "oneplus-11", name: "OnePlus 11", type: "mobile", width: 412, height: 915, brand: "OnePlus", year: 2023 },
  { id: "oneplus-12", name: "OnePlus 12", type: "mobile", width: 412, height: 915, brand: "OnePlus", year: 2024 },
  { id: "oneplus-13", name: "OnePlus 13", type: "mobile", width: 412, height: 915, brand: "OnePlus", year: 2025 },
  
  // Tablet Devices
  { id: "ipad-mini", name: "iPad Mini", type: "tablet", width: 768, height: 1024, brand: "Apple", year: 2019 },
  { id: "ipad-mini-6", name: "iPad Mini 6", type: "tablet", width: 744, height: 1133, brand: "Apple", year: 2021 },
  { id: "ipad-9", name: "iPad 9", type: "tablet", width: 810, height: 1080, brand: "Apple", year: 2021 },
  { id: "ipad-10", name: "iPad 10", type: "tablet", width: 820, height: 1180, brand: "Apple", year: 2022 },
  { id: "ipad-11", name: "iPad 11", type: "tablet", width: 820, height: 1180, brand: "Apple", year: 2024 },
  { id: "ipad-air", name: "iPad Air", type: "tablet", width: 820, height: 1180, brand: "Apple", year: 2020 },
  { id: "ipad-air-5", name: "iPad Air 5", type: "tablet", width: 820, height: 1180, brand: "Apple", year: 2022 },
  { id: "ipad-air-6", name: "iPad Air 6", type: "tablet", width: 820, height: 1180, brand: "Apple", year: 2024 },
  { id: "ipad-air-7", name: "iPad Air 7", type: "tablet", width: 820, height: 1180, brand: "Apple", year: 2025 },
  { id: "ipad-pro-11", name: "iPad Pro 11\"", type: "tablet", width: 834, height: 1194, brand: "Apple", year: 2021 },
  { id: "ipad-pro-11-m2", name: "iPad Pro 11\" M2", type: "tablet", width: 834, height: 1194, brand: "Apple", year: 2022 },
  { id: "ipad-pro-11-m3", name: "iPad Pro 11\" M3", type: "tablet", width: 834, height: 1194, brand: "Apple", year: 2023 },
  { id: "ipad-pro-11-m4", name: "iPad Pro 11\" M4", type: "tablet", width: 834, height: 1194, brand: "Apple", year: 2025 },
  { id: "ipad-pro-12.9", name: "iPad Pro 12.9\"", type: "tablet", width: 1024, height: 1366, brand: "Apple", year: 2021 },
  { id: "ipad-pro-12.9-m2", name: "iPad Pro 12.9\" M2", type: "tablet", width: 1024, height: 1366, brand: "Apple", year: 2022 },
  { id: "ipad-pro-12.9-m3", name: "iPad Pro 12.9\" M3", type: "tablet", width: 1024, height: 1366, brand: "Apple", year: 2023 },
  { id: "ipad-pro-12.9-m4", name: "iPad Pro 12.9\" M4", type: "tablet", width: 1024, height: 1366, brand: "Apple", year: 2025 },
  { id: "surface-pro-8", name: "Surface Pro 8", type: "tablet", width: 1440, height: 960, brand: "Microsoft", year: 2021 },
  { id: "surface-pro-9", name: "Surface Pro 9", type: "tablet", width: 1440, height: 960, brand: "Microsoft", year: 2022 },
  { id: "surface-pro-10", name: "Surface Pro 10", type: "tablet", width: 1440, height: 960, brand: "Microsoft", year: 2024 },
  { id: "surface-go-3", name: "Surface Go 3", type: "tablet", width: 1024, height: 768, brand: "Microsoft", year: 2021 },
  { id: "galaxy-tab-s7", name: "Galaxy Tab S7", type: "tablet", width: 1600, height: 2560, brand: "Samsung", year: 2020 },
  { id: "galaxy-tab-s8", name: "Galaxy Tab S8", type: "tablet", width: 1600, height: 2560, brand: "Samsung", year: 2022 },
  { id: "galaxy-tab-s8-plus", name: "Galaxy Tab S8+", type: "tablet", width: 1752, height: 2800, brand: "Samsung", year: 2022 },
  { id: "galaxy-tab-s8-ultra", name: "Galaxy Tab S8 Ultra", type: "tablet", width: 1848, height: 2960, brand: "Samsung", year: 2022 },
  { id: "galaxy-tab-s9", name: "Galaxy Tab S9", type: "tablet", width: 1600, height: 2560, brand: "Samsung", year: 2023 },
  { id: "galaxy-tab-s9-plus", name: "Galaxy Tab S9+", type: "tablet", width: 1752, height: 2800, brand: "Samsung", year: 2023 },
  { id: "galaxy-tab-s9-ultra", name: "Galaxy Tab S9 Ultra", type: "tablet", width: 1848, height: 2960, brand: "Samsung", year: 2023 },
  { id: "galaxy-tab-s10", name: "Galaxy Tab S10", type: "tablet", width: 1600, height: 2560, brand: "Samsung", year: 2024 },
  { id: "galaxy-tab-s10-plus", name: "Galaxy Tab S10+", type: "tablet", width: 1752, height: 2800, brand: "Samsung", year: 2024 },
  { id: "galaxy-tab-s10-ultra", name: "Galaxy Tab S10 Ultra", type: "tablet", width: 1848, height: 2960, brand: "Samsung", year: 2024 },
  { id: "xiaomi-pad-6", name: "Xiaomi Pad 6", type: "tablet", width: 1800, height: 2880, brand: "Xiaomi", year: 2023 },
  { id: "xiaomi-pad-6-pro", name: "Xiaomi Pad 6 Pro", type: "tablet", width: 1800, height: 2880, brand: "Xiaomi", year: 2023 },
  { id: "xiaomi-pad-7", name: "Xiaomi Pad 7", type: "tablet", width: 1800, height: 2880, brand: "Xiaomi", year: 2024 },
  { id: "xiaomi-pad-7-pro", name: "Xiaomi Pad 7 Pro", type: "tablet", width: 1800, height: 2880, brand: "Xiaomi", year: 2024 },
  { id: "huawei-matepad-pro", name: "Huawei MatePad Pro", type: "tablet", width: 1600, height: 2560, brand: "Huawei", year: 2021 },
  { id: "huawei-matepad-pro-12.6", name: "Huawei MatePad Pro 12.6", type: "tablet", width: 1600, height: 2560, brand: "Huawei", year: 2022 },
  { id: "huawei-matepad-pro-13.2", name: "Huawei MatePad Pro 13.2", type: "tablet", width: 1600, height: 2560, brand: "Huawei", year: 2023 },
  { id: "lenovo-tab-p12-pro", name: "Lenovo Tab P12 Pro", type: "tablet", width: 1600, height: 2560, brand: "Lenovo", year: 2022 },
  { id: "nexus-10", name: "Nexus 10", type: "tablet", width: 800, height: 1280, brand: "Google", year: 2012 },
  
  // Laptop Devices
  { id: "macbook-air", name: "MacBook Air", type: "laptop", width: 1280, height: 800, brand: "Apple", year: 2019 },
  { id: "macbook-air-m1", name: "MacBook Air M1", type: "laptop", width: 1280, height: 800, brand: "Apple", year: 2020 },
  { id: "macbook-air-m2", name: "MacBook Air M2", type: "laptop", width: 1280, height: 800, brand: "Apple", year: 2022 },
  { id: "macbook-air-m3", name: "MacBook Air M3", type: "laptop", width: 1280, height: 800, brand: "Apple", year: 2024 },
  { id: "macbook-air-m4", name: "MacBook Air M4", type: "laptop", width: 1280, height: 800, brand: "Apple", year: 2025 },
  { id: "macbook-air-15", name: "MacBook Air 15\"", type: "laptop", width: 1280, height: 800, brand: "Apple", year: 2023 },
  { id: "macbook-pro-13", name: "MacBook Pro 13\"", type: "laptop", width: 1440, height: 900, brand: "Apple", year: 2020 },
  { id: "macbook-pro-14", name: "MacBook Pro 14\"", type: "laptop", width: 1512, height: 982, brand: "Apple", year: 2021 },
  { id: "macbook-pro-16", name: "MacBook Pro 16\"", type: "laptop", width: 1728, height: 1117, brand: "Apple", year: 2021 },
  { id: "macbook-pro-m1", name: "MacBook Pro M1", type: "laptop", width: 1440, height: 900, brand: "Apple", year: 2020 },
  { id: "macbook-pro-m1-pro", name: "MacBook Pro M1 Pro", type: "laptop", width: 1512, height: 982, brand: "Apple", year: 2021 },
  { id: "macbook-pro-m1-max", name: "MacBook Pro M1 Max", type: "laptop", width: 1728, height: 1117, brand: "Apple", year: 2021 },
  { id: "macbook-pro-m2", name: "MacBook Pro M2", type: "laptop", width: 1440, height: 900, brand: "Apple", year: 2022 },
  { id: "macbook-pro-m2-pro", name: "MacBook Pro M2 Pro", type: "laptop", width: 1512, height: 982, brand: "Apple", year: 2023 },
  { id: "macbook-pro-m2-max", name: "MacBook Pro M2 Max", type: "laptop", width: 1728, height: 1117, brand: "Apple", year: 2023 },
  { id: "macbook-pro-m3", name: "MacBook Pro M3", type: "laptop", width: 1440, height: 900, brand: "Apple", year: 2023 },
  { id: "macbook-pro-m3-pro", name: "MacBook Pro M3 Pro", type: "laptop", width: 1512, height: 982, brand: "Apple", year: 2023 },
  { id: "macbook-pro-m3-max", name: "MacBook Pro M3 Max", type: "laptop", width: 1728, height: 1117, brand: "Apple", year: 2023 },
  { id: "macbook-pro-m4", name: "MacBook Pro M4", type: "laptop", width: 1440, height: 900, brand: "Apple", year: 2025 },
  { id: "macbook-pro-m4-pro", name: "MacBook Pro M4 Pro", type: "laptop", width: 1512, height: 982, brand: "Apple", year: 2025 },
  { id: "macbook-pro-m4-max", name: "MacBook Pro M4 Max", type: "laptop", width: 1728, height: 1117, brand: "Apple", year: 2025 },
  
  // 恢复被删除的非Apple笔记本设备
  { id: "dell-xps-13", name: "Dell XPS 13", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2022 },
  { id: "dell-xps-13-plus", name: "Dell XPS 13 Plus", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2022 },
  { id: "dell-xps-13-2-in-1", name: "Dell XPS 13 2-in-1", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2022 },
  { id: "dell-xps-13-4k", name: "Dell XPS 13 4K", type: "laptop", width: 3840, height: 2160, brand: "Dell", year: 2022 },
  { id: "dell-xps-15", name: "Dell XPS 15", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2023 },
  { id: "dell-xps-15-4k", name: "Dell XPS 15 4K", type: "laptop", width: 3840, height: 2160, brand: "Dell", year: 2023 },
  { id: "dell-xps-15-oled", name: "Dell XPS 15 OLED", type: "laptop", width: 3456, height: 2160, brand: "Dell", year: 2023 },
  { id: "dell-xps-17", name: "Dell XPS 17", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2023 },
  { id: "dell-xps-17-4k", name: "Dell XPS 17 4K", type: "laptop", width: 3840, height: 2160, brand: "Dell", year: 2023 },
  { id: "dell-inspiron-14", name: "Dell Inspiron 14", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2023 },
  { id: "dell-inspiron-15", name: "Dell Inspiron 15", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2023 },
  { id: "dell-inspiron-16", name: "Dell Inspiron 16", type: "laptop", width: 1920, height: 1080, brand: "Dell", year: 2023 },
  { id: "hp-spectre-x360", name: "HP Spectre x360", type: "laptop", width: 1920, height: 1080, brand: "HP", year: 2022 },
  { id: "hp-spectre-x360-14", name: "HP Spectre x360 14", type: "laptop", width: 1920, height: 1280, brand: "HP", year: 2022 },
  { id: "hp-spectre-x360-16", name: "HP Spectre x360 16", type: "laptop", width: 3072, height: 1920, brand: "HP", year: 2022 },
  { id: "hp-envy-13", name: "HP Envy 13", type: "laptop", width: 1920, height: 1080, brand: "HP", year: 2022 },
  { id: "hp-envy-15", name: "HP Envy 15", type: "laptop", width: 1920, height: 1080, brand: "HP", year: 2022 },
  { id: "hp-envy-17", name: "HP Envy 17", type: "laptop", width: 1920, height: 1080, brand: "HP", year: 2022 },
  { id: "lenovo-thinkpad-x1", name: "Lenovo ThinkPad X1", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2022 },
  { id: "lenovo-thinkpad-x1-carbon", name: "Lenovo ThinkPad X1 Carbon", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2022 },
  { id: "lenovo-thinkpad-x1-yoga", name: "Lenovo ThinkPad X1 Yoga", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2022 },
  { id: "lenovo-thinkpad-x1-nano", name: "Lenovo ThinkPad X1 Nano", type: "laptop", width: 2160, height: 1350, brand: "Lenovo", year: 2022 },
  { id: "lenovo-thinkpad-t14", name: "Lenovo ThinkPad T14", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2022 },
  { id: "lenovo-thinkpad-t15", name: "Lenovo ThinkPad T15", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2022 },
  { id: "lenovo-thinkpad-p15", name: "Lenovo ThinkPad P15", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2022 },
  { id: "lenovo-thinkpad-p17", name: "Lenovo ThinkPad P17", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2022 },
  { id: "lenovo-yoga-9i", name: "Lenovo Yoga 9i", type: "laptop", width: 3840, height: 2160, brand: "Lenovo", year: 2023 },
  { id: "lenovo-yoga-7i", name: "Lenovo Yoga 7i", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2023 },
  { id: "lenovo-ideapad-5", name: "Lenovo IdeaPad 5", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2023 },
  { id: "lenovo-ideapad-slim-7", name: "Lenovo IdeaPad Slim 7", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2023 },
  { id: "lenovo-legion-5", name: "Lenovo Legion 5", type: "laptop", width: 1920, height: 1080, brand: "Lenovo", year: 2023 },
  { id: "lenovo-legion-7", name: "Lenovo Legion 7", type: "laptop", width: 2560, height: 1600, brand: "Lenovo", year: 2023 },
  { id: "asus-zenbook-13", name: "ASUS ZenBook 13", type: "laptop", width: 1920, height: 1080, brand: "ASUS", year: 2022 },
  { id: "asus-zenbook-14", name: "ASUS ZenBook 14", type: "laptop", width: 1920, height: 1080, brand: "ASUS", year: 2022 },
  { id: "asus-zenbook-15", name: "ASUS ZenBook 15", type: "laptop", width: 1920, height: 1080, brand: "ASUS", year: 2022 },
  { id: "asus-zenbook-pro-14", name: "ASUS ZenBook Pro 14", type: "laptop", width: 2880, height: 1800, brand: "ASUS", year: 2023 },
  { id: "asus-zenbook-pro-16", name: "ASUS ZenBook Pro 16", type: "laptop", width: 3840, height: 2160, brand: "ASUS", year: 2023 },
  { id: "asus-vivobook-14", name: "ASUS VivoBook 14", type: "laptop", width: 1920, height: 1080, brand: "ASUS", year: 2023 },
  { id: "asus-vivobook-15", name: "ASUS VivoBook 15", type: "laptop", width: 1920, height: 1080, brand: "ASUS", year: 2023 },
  { id: "asus-vivobook-16", name: "ASUS VivoBook 16", type: "laptop", width: 1920, height: 1080, brand: "ASUS", year: 2023 },
  { id: "asus-rog-zephyrus-g14", name: "ASUS ROG Zephyrus G14", type: "laptop", width: 2560, height: 1600, brand: "ASUS", year: 2023 },
  { id: "asus-rog-zephyrus-g15", name: "ASUS ROG Zephyrus G15", type: "laptop", width: 2560, height: 1440, brand: "ASUS", year: 2023 },
  { id: "asus-rog-strix-scar-15", name: "ASUS ROG Strix SCAR 15", type: "laptop", width: 2560, height: 1440, brand: "ASUS", year: 2023 },
  { id: "asus-rog-strix-scar-17", name: "ASUS ROG Strix SCAR 17", type: "laptop", width: 2560, height: 1440, brand: "ASUS", year: 2023 },
  { id: "acer-swift-3", name: "Acer Swift 3", type: "laptop", width: 1920, height: 1080, brand: "Acer", year: 2022 },
  { id: "acer-swift-5", name: "Acer Swift 5", type: "laptop", width: 1920, height: 1080, brand: "Acer", year: 2022 },
  { id: "acer-swift-x", name: "Acer Swift X", type: "laptop", width: 1920, height: 1080, brand: "Acer", year: 2022 },
  { id: "acer-aspire-5", name: "Acer Aspire 5", type: "laptop", width: 1920, height: 1080, brand: "Acer", year: 2022 },
  { id: "acer-nitro-5", name: "Acer Nitro 5", type: "laptop", width: 1920, height: 1080, brand: "Acer", year: 2022 },
  { id: "acer-predator-helios-300", name: "Acer Predator Helios 300", type: "laptop", width: 1920, height: 1080, brand: "Acer", year: 2022 },
  { id: "acer-predator-triton-500", name: "Acer Predator Triton 500", type: "laptop", width: 1920, height: 1080, brand: "Acer", year: 2022 },
  { id: "msi-prestige-14", name: "MSI Prestige 14", type: "laptop", width: 1920, height: 1080, brand: "MSI", year: 2022 },
  { id: "msi-prestige-15", name: "MSI Prestige 15", type: "laptop", width: 3840, height: 2160, brand: "MSI", year: 2022 },
  { id: "msi-creator-z16", name: "MSI Creator Z16", type: "laptop", width: 2560, height: 1600, brand: "MSI", year: 2022 },
  { id: "msi-stealth-15", name: "MSI Stealth 15", type: "laptop", width: 1920, height: 1080, brand: "MSI", year: 2023 },
  { id: "msi-raider-ge66", name: "MSI Raider GE66", type: "laptop", width: 1920, height: 1080, brand: "MSI", year: 2022 },
  { id: "msi-raider-ge76", name: "MSI Raider GE76", type: "laptop", width: 3840, height: 2160, brand: "MSI", year: 2022 },
  { id: "razer-blade-14", name: "Razer Blade 14", type: "laptop", width: 2560, height: 1440, brand: "Razer", year: 2023 },
  { id: "razer-blade-15", name: "Razer Blade 15", type: "laptop", width: 1920, height: 1080, brand: "Razer", year: 2023 },
  { id: "razer-blade-15-4k", name: "Razer Blade 15 4K", type: "laptop", width: 3840, height: 2160, brand: "Razer", year: 2023 },
  { id: "razer-blade-17", name: "Razer Blade 17", type: "laptop", width: 2560, height: 1440, brand: "Razer", year: 2023 },
  { id: "surface-laptop-4-13", name: "Surface Laptop 4 13.5\"", type: "laptop", width: 2256, height: 1504, brand: "Microsoft", year: 2021 },
  { id: "surface-laptop-4-15", name: "Surface Laptop 4 15\"", type: "laptop", width: 2496, height: 1664, brand: "Microsoft", year: 2021 },
  { id: "surface-laptop-5-13", name: "Surface Laptop 5 13.5\"", type: "laptop", width: 2256, height: 1504, brand: "Microsoft", year: 2022 },
  { id: "surface-laptop-5-15", name: "Surface Laptop 5 15\"", type: "laptop", width: 2496, height: 1664, brand: "Microsoft", year: 2022 },
  { id: "surface-laptop-studio", name: "Surface Laptop Studio", type: "laptop", width: 2400, height: 1600, brand: "Microsoft", year: 2022 },
  { id: "surface-book-3-13", name: "Surface Book 3 13.5\"", type: "laptop", width: 3000, height: 2000, brand: "Microsoft", year: 2020 },
  { id: "surface-book-3-15", name: "Surface Book 3 15\"", type: "laptop", width: 3240, height: 2160, brand: "Microsoft", year: 2020 },
  { id: "google-pixelbook", name: "Google Pixelbook", type: "laptop", width: 2400, height: 1600, brand: "Google", year: 2017 },
  { id: "google-pixelbook-go", name: "Google Pixelbook Go", type: "laptop", width: 1920, height: 1080, brand: "Google", year: 2019 },
  { id: "samsung-galaxy-book3-pro", name: "Samsung Galaxy Book3 Pro", type: "laptop", width: 2880, height: 1800, brand: "Samsung", year: 2023 },
  { id: "samsung-galaxy-book3-ultra", name: "Samsung Galaxy Book3 Ultra", type: "laptop", width: 2880, height: 1800, brand: "Samsung", year: 2023 },
  { id: "huawei-matebook-x-pro", name: "Huawei MateBook X Pro", type: "laptop", width: 3000, height: 2000, brand: "Huawei", year: 2022 },
  { id: "huawei-matebook-14", name: "Huawei MateBook 14", type: "laptop", width: 2160, height: 1440, brand: "Huawei", year: 2022 },
  { id: "huawei-matebook-16", name: "Huawei MateBook 16", type: "laptop", width: 2520, height: 1680, brand: "Huawei", year: 2022 },
  { id: "xiaomi-notebook-pro", name: "Xiaomi Notebook Pro", type: "laptop", width: 2560, height: 1600, brand: "Xiaomi", year: 2022 },
  { id: "framework-laptop-13", name: "Framework Laptop 13", type: "laptop", width: 2256, height: 1504, brand: "Framework", year: 2023 },
  { id: "framework-laptop-16", name: "Framework Laptop 16", type: "laptop", width: 2560, height: 1600, brand: "Framework", year: 2023 },
  
  // Desktop Devices
  { id: "desktop-hd", name: "Desktop HD", type: "desktop", width: 1920, height: 1080, brand: "Generic", year: 2020 },
  { id: "desktop-full-hd", name: "Desktop Full HD", type: "desktop", width: 1920, height: 1080, brand: "Generic", year: 2020 },
  { id: "desktop-2k", name: "Desktop 2K", type: "desktop", width: 2560, height: 1440, brand: "Generic", year: 2020 },
  { id: "desktop-4k", name: "Desktop 4K", type: "desktop", width: 3840, height: 2160, brand: "Generic", year: 2020 },
  { id: "desktop-5k", name: "Desktop 5K", type: "desktop", width: 5120, height: 2880, brand: "Generic", year: 2020 },
  { id: "desktop-ultrawide", name: "Desktop Ultrawide", type: "desktop", width: 3440, height: 1440, brand: "Generic", year: 2020 },
  { id: "desktop-super-ultrawide", name: "Desktop Super Ultrawide", type: "desktop", width: 5120, height: 1440, brand: "Generic", year: 2020 },
  { id: "imac-24", name: "iMac 24\"", type: "desktop", width: 4480, height: 2520, brand: "Apple", year: 2021 },
  { id: "imac-27", name: "iMac 27\"", type: "desktop", width: 5120, height: 2880, brand: "Apple", year: 2020 },
  { id: "apple-studio-display", name: "Apple Studio Display", type: "desktop", width: 5120, height: 2880, brand: "Apple", year: 2022 },
  { id: "apple-pro-display-xdr", name: "Apple Pro Display XDR", type: "desktop", width: 6016, height: 3384, brand: "Apple", year: 2019 },
];

const DeviceSelector = ({
  selectedDevices,
  onSelectDevice,
  onRemoveDevice,
  onOpenDeviceModal,
}: DeviceSelectorProps) => {
  const [customWidth, setCustomWidth] = useState("375");
  const [customHeight, setCustomHeight] = useState("667");
  const [customName, setCustomName] = useState("Custom Device");
  const [activeTab, setActiveTab] = useState<"mobile" | "tablet" | "laptop" | "desktop" | "custom">("mobile");
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleAddCustomDevice = () => {
    const width = parseInt(customWidth, 10);
    const height = parseInt(customHeight, 10);
    
    if (width > 0 && height > 0) {
      const newDevice: Device = {
        id: `custom-${Date.now()}`,
        name: customName || "Custom Device",
        type: "custom",
        width,
        height,
      };
      
      onSelectDevice(newDevice);
      setIsAddingCustom(false);
    }
  };

  // Get all brands for current category
  const getBrandsForActiveTab = () => {
    const brands = PRESET_DEVICES
      .filter(device => device.type === activeTab && device.brand)
      .map(device => device.brand as string);
    
    // Remove duplicates and sort
    return Array.from(new Set(brands)).sort();
  };

  // Get all years for current category
  const getYearsForActiveTab = () => {
    const years = PRESET_DEVICES
      .filter(device => device.type === activeTab && device.year)
      .map(device => device.year as number);
    
    // Remove duplicates and sort (descending, newest first)
    return Array.from(new Set(years)).sort((a, b) => b - a);
  };

  // Reset brand filter
  const resetBrandFilter = () => {
    setSelectedBrand(null);
  };

  // Reset year filter
  const resetYearFilter = () => {
    setSelectedYear(null);
  };

  // Reset filters when changing tabs
  const handleTabChange = (tab: "mobile" | "tablet" | "laptop" | "desktop" | "custom") => {
    setActiveTab(tab);
    resetBrandFilter();
    resetYearFilter();
  };

  // Filter devices based on active tab, search query, selected brand and selected year
  const filteredDevices = PRESET_DEVICES.filter((device) => {
    const matchesTab = device.type === activeTab;
    const matchesBrand = selectedBrand ? device.brand === selectedBrand : true;
    const matchesYear = selectedYear ? device.year === selectedYear : true;
    const matchesSearch = searchQuery 
      ? device.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        `${device.width}x${device.height}`.includes(searchQuery)
      : true;
    return matchesTab && matchesSearch && matchesBrand && matchesYear;
  })
  // 按照上市年份从近到远排序
  .sort((a, b) => {
    // 如果设备没有年份信息，将其排在最后
    if (!a.year) return 1;
    if (!b.year) return -1;
    // 年份从大到小排序（最新的在前面）
    return b.year - a.year;
  });

  const availableBrands = getBrandsForActiveTab();
  const availableYears = getYearsForActiveTab();

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-8">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white mb-2 md:mb-0">Device Selection</h2>
        
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
            Mobile
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
            pad
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
            Laptop
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
            Desktop
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
            Custom
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search devices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Brand filter */}
      {activeTab !== "custom" && availableBrands.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400">Brand:</span>
            <button
              onClick={() => resetBrandFilter()}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedBrand === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              All
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
      
      {/* Year filter */}
      {activeTab !== "custom" && availableYears.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400">Year:</span>
            <button
              onClick={() => resetYearFilter()}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedYear === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              All
            </button>
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedYear === year
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {year}
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
              <div className="flex justify-between items-center mt-1">
                {device.brand && (
                  <div className="text-xs text-gray-500">
                    {device.brand}
                  </div>
                )}
                {device.year && (
                  <div className="text-xs text-gray-500">
                    {device.year}年
                  </div>
                )}
              </div>
            </motion.button>
          ))}
          
          {filteredDevices.length === 0 && (
            <div className="col-span-full text-center py-6 text-gray-400">
              No devices found. Please try different keywords or create a custom device.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg p-4">
          {isAddingCustom ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="custom-name" className="block text-sm font-medium text-gray-300 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  id="custom-name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Custom Device"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-width" className="block text-sm font-medium text-gray-300 mb-1">
                    Width (pixels)
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
                    Height (pixels)
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
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomDevice}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Add Device
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-400 mb-4">Create a custom device with specific dimensions</p>
              <button
                onClick={() => setIsAddingCustom(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors inline-flex items-center"
              >
                <FiPlus className="mr-1" />
                Add Custom Device
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeviceSelector; 