import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ResultCard } from './ResultCard';
import type { SearchResult } from '../types/api';

interface SearchResultsProps {
  results: SearchResult[];
  totalResults: number;
  allResults: SearchResult[];
  selectedType: string;
  onTypeSelect: (type: string) => void;
  otherTypes: string[];
  showOtherTypes: boolean;
}

export const SearchResults = ({ 
  results, 
  totalResults, 
  allResults, 
  selectedType, 
  onTypeSelect, 
  otherTypes,
  showOtherTypes
}: SearchResultsProps) => {
  const { isDarkMode } = useTheme();

  // 生成筛选项
  const typeOptions = useMemo(() => {
    const options = [
      { value: 'all', label: '全部网盘' },
      { value: 'baidu', label: '百度网盘' },
      { value: 'aliyun', label: '阿里网盘' },
      { value: 'quark', label: '夸克网盘' }
    ];
    
    // 如果展开了其他网盘类型，则显示具体的其他网盘类型
    if (showOtherTypes && otherTypes.length > 0) {
      otherTypes.forEach(type => {
        options.push({ value: type, label: getTypeDisplayName(type) });
      });
    } else {
      // 如果存在其他类型且未展开，则显示"其他网盘"按钮
      if (otherTypes.length > 0) {
        options.push({ value: 'other', label: '其他网盘' });
      }
    }
    
    return options;
  }, [showOtherTypes, otherTypes]);

  const getTypeCount = (type: string) => {
    if (type === 'all') return totalResults;
    if (type === 'other') {
      return allResults.filter(result => 
        result.links.some(link => otherTypes.includes(link.type))
      ).length;
    }
    return allResults.filter(result => 
      result.links.some(link => link.type === type)
    ).length;
  };

  // 处理筛选类型选择
  const handleTypeSelect = (type: string) => {
    onTypeSelect(type);
  };

  // 获取网盘类型显示名称
  function getTypeDisplayName(type: string): string {
    const nameMap: Record<string, string> = {
      'aliyun': '阿里云盘',
      'baidu': '百度网盘',
      'quark': '夸克网盘',
      'tianyi': '天翼云盘',
      'uc': 'UC网盘',
      'mobile': '移动云盘',
      '115': '115网盘',
      'pikpak': 'PikPak',
      'xunlei': '迅雷网盘',
      '123': '123网盘',
      'magnet': '磁力链接',
      'ed2k': '电驴链接',
      'lanzou': '蓝奏云',
      'weiyun': '微云'
    };
    return nameMap[type] || type;
  }

  return (
    <div className="space-y-6">
      {/* 结果统计和筛选 */}
      <div className="space-y-4">
        {/* 结果统计 */}
        <div className="flex items-center gap-4">
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            搜索结果
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isDarkMode 
              ? 'bg-accent-color/20 text-accent-color border border-accent-color/30' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            共 {totalResults} 个结果
          </span>
        </div>

        {/* 网盘类型筛选 */}
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-text-secondary' : 'text-gray-600'
          }`}>
            筛选：
          </span>
          <div className="flex gap-1 flex-wrap max-w-4xl">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTypeSelect(option.value)}
                className={`px-3 py-1 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedType === option.value
                    ? isDarkMode 
                      ? 'bg-accent-color text-white shadow-lg' 
                      : 'bg-blue-500 text-white'
                    : isDarkMode 
                      ? 'bg-surface-2 text-text-secondary hover:bg-surface-3' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {option.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                  selectedType === option.value
                    ? 'bg-white/20'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {getTypeCount(option.value)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 搜索结果列表 */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={`${result.unique_id}-${index}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ResultCard result={result} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <svg className={`w-8 h-8 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
          </div>
          <p className={`text-lg font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            没有找到相关结果
          </p>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            尝试使用其他关键词或检查筛选条件
          </p>
        </div>
      )}
    </div>
  );
}; 