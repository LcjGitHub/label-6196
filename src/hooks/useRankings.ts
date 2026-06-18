import { useMemo } from 'react';
import nianhuaData from '@/mock/nianhua.json';
import type {
  NianhuaItem,
  NianhuaTheme,
} from '@/types/nianhua';

export interface RankingSection {
  id: string;
  title: string;
  subtitle?: string;
  items: NianhuaItem[];
}

const THEMES: NianhuaTheme[] = ['门神', '娃娃', '戏曲', '吉祥', '民俗'];
const SECTION_SIZE = 6;

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

function getTodaySeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

export function useRankings() {
  const allItems = useMemo(() => nianhuaData as NianhuaItem[], []);

  const todayRecommend = useMemo<RankingSection>(() => {
    const seed = getTodaySeed();
    const shuffled = shuffle(allItems, seed);
    return {
      id: 'today',
      title: '今日推荐',
      subtitle: '每日精选 · 年画佳作',
      items: shuffled.slice(0, SECTION_SIZE),
    };
  }, [allItems]);

  const themeSelections = useMemo<RankingSection[]>(() => {
    return THEMES.map((theme) => {
      const themeItems = allItems.filter((item) => item.theme === theme);
      const seed = getTodaySeed() + theme.length;
      const shuffled = shuffle(themeItems, seed);
      return {
        id: `theme-${theme}`,
        title: `${theme}精选`,
        subtitle: `${theme}题材佳作`,
        items: shuffled.slice(0, SECTION_SIZE),
      };
    }).filter((section) => section.items.length > 0);
  }, [allItems]);

  const allRankings = useMemo<RankingSection[]>(() => {
    return [todayRecommend, ...themeSelections];
  }, [todayRecommend, themeSelections]);

  return {
    todayRecommend,
    themeSelections,
    allRankings,
  };
}
