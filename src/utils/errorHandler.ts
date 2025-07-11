/**
 * 统一错误处理工具
 */

export interface AppError {
  message: string;
  code?: string;
  details?: string;
}

/**
 * 将各种错误转换为标准化的AppError
 */
export const normalizeError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error
    };
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: String(error.message),
      code: 'code' in error ? String(error.code) : undefined
    };
  }
  
  return {
    message: '发生未知错误'
  };
};

/**
 * 处理API错误
 */
export const handleApiError = (error: unknown): AppError => {
  const normalized = normalizeError(error);
  
  // 网络错误处理
  if (normalized.message.includes('Network Error') || normalized.message.includes('fetch')) {
    return {
      message: '网络连接失败，请检查网络设置',
      code: 'NETWORK_ERROR'
    };
  }
  
  // 超时错误处理
  if (normalized.message.includes('timeout')) {
    return {
      message: '请求超时，请稍后重试',
      code: 'TIMEOUT_ERROR'
    };
  }
  
  // 服务器错误处理
  if (normalized.code && normalized.code.startsWith('5')) {
    return {
      message: '服务器暂时不可用，请稍后重试',
      code: 'SERVER_ERROR'
    };
  }
  
  return normalized;
};

/**
 * 获取用户友好的错误消息
 */
export const getErrorMessage = (error: AppError): string => {
  const errorMessages: Record<string, string> = {
    'NETWORK_ERROR': '网络连接失败，请检查网络设置',
    'TIMEOUT_ERROR': '请求超时，请稍后重试',
    'SERVER_ERROR': '服务器暂时不可用，请稍后重试',
    'SEARCH_FAILED': '搜索失败，请检查关键词或稍后重试',
    'API_UNAVAILABLE': 'API服务暂时不可用，请稍后重试'
  };
  
  return errorMessages[error.code || ''] || error.message;
}; 