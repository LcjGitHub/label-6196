import { useMemo } from 'react';
import nianhuaData from '@/mock/nianhua.json';
import type {
  NianhuaItem,
  NianhuaTheme,
  NianhuaThemeKey,
  SearchKeyword,
} from '@/types/nianhua';

/**
 * 单个榜单区块数据结构
 */
export interface RankingSection {
  /** 榜单唯一标识 */
  id: string;
  /** 榜单标题，如「今日推荐」「门神精选」 */
  title: string;
  /** 榜单副标题，说明性文字 */
  subtitle?: string;
  /** 榜单内的年画作品列表 */
  items: NianhuaItem[];
}

/** 全部题材枚举，用于生成各题材精选榜单 */
const THEMES: NianhuaTheme[] = ['门神', '娃娃', '戏曲', '吉祥', '民俗'];
/** 每个榜单默认展示的作品数量上限 */
const SECTION_SIZE = 6;

/**
 * 基于种子的 Fisher–Yates 洗牌算法，保证同一天内榜单顺序稳定
 * @param arr  待打乱的数组
 * @param seed 随机种子，同一天固定则结果固定
 */
function shuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 获取当天的整数种子值（年×10000 + 月×100 + 日）
 * 用于保证同一天内推荐结果不变，次日自动刷新
 */
function getTodaySeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

/**
 * 按题材和关键词过滤作品（与 useNianhuaList 保持一致的过滤逻辑）
 * @param items   待过滤的作品列表
 * @param theme   题材筛选键，`all` 表示全部题材
 * @param keyword 搜索关键词，为空或 undefined 时不执行关键词过滤
 */
function filterItems(
  items: NianhuaItem[],
  theme: NianhuaThemeKey,
  keyword?: SearchKeyword,
): NianhuaItem[] {
  let result = items;
  if (theme !== 'all') {
    result = result.filter((item) => item.theme === theme);
  }
  if (keyword && keyword.trim()) {
    const kw = keyword.trim().toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(kw) ||
        item.meaning.toLowerCase().includes(kw),
    );
  }
  return result;
}

/**
 * 首页热门推荐榜单数据钩子
 *
 * 功能：
 * - 根据模拟数据生成固定数量的榜单区块
 * - 「今日推荐」：从全部作品中按日期种子随机抽取 6 件
 * - 「题材精选」：对每个题材分别生成精选榜单（门神、娃娃、戏曲、吉祥、民俗）
 * - 各榜单间作品去重：已出现在「今日推荐」的作品不会在题材精选中重复展示
 * - 当某题材可用作品数量不足 6 件时，副标题会自动标注实际数量
 * - 支持按当前题材与关键词联合过滤，只展示匹配作品
 *
 * @param theme   当前选中的题材筛选键
 * @param keyword 当前搜索关键词
 * @returns todayRecommend     今日推荐榜单
 * @returns themeSelections    各题材精选榜单数组
 * @returns allRankings        全部榜单（今日推荐 + 各题材精选）
 */
export function useRankings(
  theme: NianhuaThemeKey = 'all',
  keyword?: SearchKeyword,
) {
  const allItems = useMemo(() => nianhuaData as NianhuaItem[], []);

  /** 应用当前筛选条件后的全部作品（与瀑布流使用同一过滤逻辑） */
  const filteredItems = useMemo(
    () => filterItems(allItems, theme, keyword),
    [allItems, theme, keyword],
  );

  /** 今日推荐：从过滤后的作品中随机取 6 件 */
  const todayRecommend = useMemo<RankingSection>(() => {
    const seed = getTodaySeed();
    const shuffled = shuffle(filteredItems, seed);
    const selected = shuffled.slice(0, SECTION_SIZE);
    return {
      id: 'today',
      title: '今日推荐',
      subtitle: '每日精选 · 年画佳作',
      items: selected,
    };
  }, [filteredItems]);

  /** 今日推荐中已出现的作品 id 集合，用于后续题材精选去重 */
  const todayIds = useMemo(
    () => new Set(todayRecommend.items.map((item) => item.id)),
    [todayRecommend],
  );

  /** 各题材精选榜单：过滤掉今日推荐已出现的作品，不足 6 件时在副标题中标注实际数量 */
  const themeSelections = useMemo<RankingSection[]>(() => {
    return THEMES.map((themeName) => {
      const themeItems = filteredItems.filter(
        (item) => item.theme === themeName && !todayIds.has(item.id),
      );
      const seed = getTodaySeed() + themeName.length;
      const shuffled = shuffle(themeItems, seed);
      const selected = shuffled.slice(0, SECTION_SIZE);
      const count = selected.length;
      return {
        id: `theme-${themeName}`,
        title: `${themeName}精选`,
        subtitle:
          count < SECTION_SIZE
            ? `${themeName}题材佳作 · 共 ${count} 件`
            : `${themeName}题材佳作`,
        items: selected,
      };
    });
  }, [filteredItems, todayIds]);

  /** 全部榜单汇总：今日推荐 + 各题材精选 */
  const allRankings = useMemo<RankingSection[]>(() => {
    return [todayRecommend, ...themeSelections];
  }, [todayRecommend, themeSelections]);

  return {
    todayRecommend,
    themeSelections,
    allRankings,
  };
}
