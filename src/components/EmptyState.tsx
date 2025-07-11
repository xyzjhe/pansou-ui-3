import { useTheme } from '../contexts/ThemeContext';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ 
  title = '暂无数据',
  description = '请尝试其他搜索条件',
  icon,
  className = 'py-12'
}: EmptyStateProps) => {
  const { isDarkMode } = useTheme();

  const defaultIcon = (
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  return (
    <div className={`text-center ${className}`}>
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon || defaultIcon}
      </div>
      <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {title}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {description}
      </p>
    </div>
  );
}; 