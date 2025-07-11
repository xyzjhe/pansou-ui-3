import { useTheme } from '../contexts/ThemeContext';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`rounded-2xl p-6 border ${
      isDarkMode 
        ? 'bg-red-900/20 border-red-700/30' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${
            isDarkMode ? 'text-red-300' : 'text-red-800'
          }`}>
            搜索失败
          </h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-red-200' : 'text-red-700'
          }`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}; 