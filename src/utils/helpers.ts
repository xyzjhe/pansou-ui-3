import type { MergedByType } from '../types/api';

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '未知时间';
    }
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '未知时间';
  }
};

export const getPanTypeName = (type: string): string => {
  const typeMap: Record<string, string> = {
    baidu: '百度网盘',
    aliyun: '阿里云盘',
    tianyi: '天翼云盘',
    uc: 'UC网盘',
    mobile: '移动云盘',
    '115': '115网盘',
    pikpak: 'PikPak',
    xunlei: '迅雷网盘',
    '123': '123网盘',
    magnet: '磁力链接',
    ed2k: '电驴链接',
    lanzou: '蓝奏云',
    weiyun: '微云',
    xunpan: '迅雷网盘',
    '360': '360云盘',
    '189': '天翼云盘',
    '139': '移动云盘',
    '10086': '移动云盘',
    aliyundrive: '阿里云盘',
    alipan: '阿里云盘',
    baidupan: '百度网盘',
    baiduwangpan: '百度网盘',
    quarkpan: '夸克网盘',
    ucpan: 'UC网盘',
    ucwangpan: 'UC网盘',
    xunleipan: '迅雷网盘',
    xunleiwangpan: '迅雷网盘',
    '123pan': '123网盘',
    '123wangpan': '123网盘',
    pikpakpan: 'PikPak',
    pikpakwangpan: 'PikPak',
    magnetlink: '磁力链接',
    ed2klink: '电驴链接',
  };
  return typeMap[type] || type;
};

export const getPanTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    baidu: 'bg-blue-100 text-blue-800',
    aliyun: 'bg-orange-100 text-orange-800',
    tianyi: 'bg-green-100 text-green-800',
    uc: 'bg-yellow-100 text-yellow-800',
    mobile: 'bg-red-100 text-red-800',
    '115': 'bg-indigo-100 text-indigo-800',
    pikpak: 'bg-pink-100 text-pink-800',
    xunlei: 'bg-gray-100 text-gray-800',
    '123': 'bg-teal-100 text-teal-800',
    magnet: 'bg-amber-100 text-amber-800',
    ed2k: 'bg-lime-100 text-lime-800',
    lanzou: 'bg-blue-100 text-blue-800',
    weiyun: 'bg-green-100 text-green-800',
    xunpan: 'bg-gray-100 text-gray-800',
    '360': 'bg-green-100 text-green-800',
    '189': 'bg-green-100 text-green-800',
    '139': 'bg-red-100 text-red-800',
    '10086': 'bg-red-100 text-red-800',
    aliyundrive: 'bg-orange-100 text-orange-800',
    alipan: 'bg-orange-100 text-orange-800',
    baidupan: 'bg-blue-100 text-blue-800',
    baiduwangpan: 'bg-blue-100 text-blue-800',
    quarkpan: 'bg-purple-100 text-purple-800',
    ucpan: 'bg-yellow-100 text-yellow-800',
    ucwangpan: 'bg-yellow-100 text-yellow-800',
    xunleipan: 'bg-gray-100 text-gray-800',
    xunleiwangpan: 'bg-gray-100 text-gray-800',
    '123pan': 'bg-teal-100 text-teal-800',
    '123wangpan': 'bg-teal-100 text-teal-800',
    pikpakpan: 'bg-pink-100 text-pink-800',
    pikpakwangpan: 'bg-pink-100 text-pink-800',
    magnetlink: 'bg-amber-100 text-amber-800',
    ed2klink: 'bg-lime-100 text-lime-800',
  };
  return colorMap[type] || 'bg-gray-100 text-gray-800';
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
};

export const getTotalResults = (mergedByType: MergedByType): number => {
  return Object.values(mergedByType).reduce((total, links) => total + links.length, 0);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const cleanUrl = (url: string): string => {
  // 去除URL中的图标和特殊字符
  return url
    .replace(/[📁📂📄📋📌📍🎯🔗🔖📎]/gu, '') // 去除常见图标
    .replace(/[^\u0020-\u007F]/g, '') // 去除所有非ASCII字符
    .trim();
};

export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}; 