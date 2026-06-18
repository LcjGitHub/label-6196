/** 年画题材分类 */
export type NianhuaTheme = '门神' | '娃娃' | '戏曲' | '吉祥' | '民俗';

/** 题材筛选键，`all` 代表不按题材过滤 */
export type NianhuaThemeKey = 'all' | NianhuaTheme;

/** 年画产地 */
export type NianhuaOrigin =
  | '天津杨柳青'
  | '苏州桃花坞'
  | '山东潍坊'
  | '河北武强'
  | '河南朱仙镇';

/** 产地信息 */
export interface OriginInfo {
  /** 产地名称 */
  name: NianhuaOrigin;
  /** 该产地的作品数量 */
  count: number;
  /** 产地简介 */
  description: string;
}

/** 年代信息 */
export interface EraInfo {
  /** 年代名称 */
  name: string;
  /** 该年代的作品数量 */
  count: number;
  /** 年代简介 */
  description: string;
}

/** 年代介绍数据 */
export const ERA_DESCRIPTIONS: Record<string, string> = {
  明代: '明代是年画艺术的萌芽与初步发展期，木版印刷技术的进步为年画的普及提供了基础，年画题材以门神、神像为主，风格古朴浑厚。',
  清代: '清代是年画艺术的鼎盛时期，各地年画产地纷纷崛起，题材涵盖娃娃、戏曲、吉祥图案等，技法成熟，色彩丰富，流传广泛，是年画艺术的黄金时代。',
  民国: '民国时期年画艺术在传统基础上有所革新，题材更加贴近现实生活，同时受到西方印刷术和新思潮的影响，呈现出新旧交融的独特风貌。',
};

/** 产地介绍数据 */
export const ORIGIN_DESCRIPTIONS: Record<NianhuaOrigin, string> = {
  '天津杨柳青':
    '杨柳青年画是中国著名的民间木版年画，产自天津杨柳青镇，始于明代崇祯年间，清代达到鼎盛。以笔法细腻、色彩清雅、内容丰富著称，题材涵盖门神、娃娃、戏曲、吉祥图案等。',
  '苏州桃花坞':
    '桃花坞年画是江南地区的民间木版年画，产自江苏苏州，因曾集中在苏州城内桃花坞一带生产而得名。构图对称饱满，色彩鲜艳明快，风格细腻雅致，是南方年画的代表。',
  '山东潍坊':
    '潍坊年画是山东民间木版年画的代表，产自山东潍坊杨家埠，始于明代，清代达到鼎盛。线条粗犷有力，色彩对比强烈，题材以民俗、吉祥图案为主，具有浓厚的乡土气息。',
  '河北武强':
    '武强年画是河北省武强县的传统民间工艺品，以木版水印为特色，构图饱满、线条粗犷、色彩鲜明。题材广泛，包括门神、戏曲故事、吉祥图案等，被誉为「年画之乡」。',
  '河南朱仙镇':
    '朱仙镇木版年画是中国古老的传统工艺品之一，产自河南开封朱仙镇，始于唐代，盛于明清。色彩对比强烈，线条粗犷简练，人物造型夸张，是中原地区年画艺术的代表。',
};

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
