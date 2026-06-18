/** 年画题材分类 */
export type NianhuaTheme = '门神' | '娃娃' | '戏曲' | '吉祥' | '民俗';

/** 题材筛选键，`all` 代表不按题材过滤 */
export type NianhuaThemeKey = 'all' | NianhuaTheme;

/** 搜索关键词，支持作品名称、产地、寓意的模糊匹配 */
export type SearchKeyword = string;

/** 年画列表筛选参数：题材 + 关键词，可自由组合 */
export interface NianhuaListFilter {
  /** 题材筛选键，`all` 表示全部题材 */
  theme: NianhuaThemeKey;
  /** 搜索关键词，为空或 undefined 时不执行关键词过滤 */
  keyword?: SearchKeyword;
}

/** 单个题材 Tab 选项 */
export interface ThemeTabOption {
  key: NianhuaThemeKey;
  label: string;
}

/** 年画图录条目 */
export interface NianhuaItem {
  /** 唯一标识 */
  id: string;
  /** 作品名称 */
  title: string;
  /** 题材分类 */
  theme: NianhuaTheme;
  /** 封面图 URL */
  imageUrl: string;
  /** 寓意说明 */
  meaning: string;
  /** 创作或流行年代 */
  era: string;
  /** 产地 */
  origin: string;
  /** 图片宽度，用于瀑布流占位比例 */
  width: number;
  /** 图片高度 */
  height: number;
}

/** 全部题材 Tab 选项 */
export const THEME_TABS: ThemeTabOption[] = [
  { key: 'all', label: '全部' },
  { key: '门神', label: '门神' },
  { key: '娃娃', label: '娃娃' },
  { key: '戏曲', label: '戏曲' },
  { key: '吉祥', label: '吉祥' },
  { key: '民俗', label: '民俗' },
];
