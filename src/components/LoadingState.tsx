import { useTheme } from '../contexts/ThemeContext';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = ({ 
  message = '加载中...', 
  className = 'py-12' 
}: LoadingStateProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4 ${
        isDarkMode ? 'border-gray-500' : 'border-blue-500'
      }`}></div>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{message}</p>
      </div>
    </div>
  );
}; 