/** 年画题材分类 */
export type NianhuaTheme = '门神' | '娃娃' | '戏曲' | '吉祥' | '民俗';

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
export const THEME_TABS: Array<{ key: 'all' | NianhuaTheme; label: string }> = [
  { key: 'all', label: '全部' },
  { key: '门神', label: '门神' },
  { key: '娃娃', label: '娃娃' },
  { key: '戏曲', label: '戏曲' },
  { key: '吉祥', label: '吉祥' },
  { key: '民俗', label: '民俗' },
];
