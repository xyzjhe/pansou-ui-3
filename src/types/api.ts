export interface Link {
  type: string;
  url: string;
  password?: string;
}

export interface SearchResult {
  message_id: string;
  unique_id: string;
  channel: string;
  datetime: string;
  title: string;
  content: string;
  links: Link[];
  tags?: string[];
}

export interface MergedLink {
  url: string;
  password?: string;
  note: string;
  datetime: string;
}

export interface MergedByType {
  [key: string]: MergedLink[];
}

export interface SearchData {
  total: number;
  results: SearchResult[];
  merged_by_type: MergedByType;
}

export interface SearchResponse {
  code: number;
  message: string;
  data: SearchData;
}

export interface SearchRequest {
  kw: string;
  channels?: string[];
  conc?: number;
  refresh?: boolean;
  res?: 'all' | 'results' | 'merge';
  src?: 'all' | 'tg' | 'plugin';
  plugins?: string[];
}

export interface ErrorResponse {
  code: number;
  message: string;
} 