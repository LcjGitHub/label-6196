import { useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import nianhuaData from '@/mock/nianhua.json';
import type { NianhuaItem, NianhuaTheme } from '@/types/nianhua';

/**
 * 加载并筛选年画 Mock 数据
 */
export function useNianhuaList(theme: 'all' | NianhuaTheme, keyword?: string) {
  const allItems = nianhuaData as NianhuaItem[];

  const filteredItems = useMemo(() => {
    let result = allItems;
    if (theme !== 'all') {
      result = result.filter((item) => item.theme === theme);
    }
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(kw) ||
          item.origin.toLowerCase().includes(kw) ||
          item.meaning.toLowerCase().includes(kw),
      );
    }
    return result;
  }, [allItems, theme, keyword]);

  return { items: filteredItems, total: filteredItems.length };
}

/**
 * 根据 id 获取单条年画详情
 */
export function useNianhuaDetail(id: string | undefined) {
  const allItems = nianhuaData as NianhuaItem[];

  const getItemById = useMemoizedFn((itemId: string) =>
    allItems.find((item) => item.id === itemId),
  );

  const item = useMemo(() => {
    if (!id) {
      return undefined;
    }
    return getItemById(id);
  }, [id, getItemById]);

  return { item };
}
