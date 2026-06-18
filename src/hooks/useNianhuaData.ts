import { useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import nianhuaData from '@/mock/nianhua.json';
import type {
  NianhuaItem,
  SearchKeyword,
  NianhuaListFilter,
  NianhuaTheme,
} from '@/types/nianhua';

const allItems = nianhuaData as NianhuaItem[];

/**
 * 加载并筛选年画 Mock 数据
 * 支持按题材过滤与关键词过滤（作品名称 / 产地 / 寓意）组合生效
 * @param theme   题材筛选键，`all` 表示全部题材
 * @param keyword 搜索关键词，为空时不执行关键词过滤
 */
export function useNianhuaList(
  theme: NianhuaListFilter['theme'],
  keyword?: SearchKeyword,
) {
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
 * @param id 年画条目唯一标识，undefined 时返回 undefined
 */
export function useNianhuaDetail(id: string | undefined) {
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

/**
 * 获取与指定作品同题材的其他作品（排除当前作品本身）
 * @param currentId 当前作品 ID
 * @param theme 题材名称
 * @param limit 最大返回数量，默认 6
 * @returns 同题材其他作品列表和该题材剩余作品总数
 */
export function useSameThemeRecommendations(
  currentId: string | undefined,
  theme: NianhuaTheme | undefined,
  limit: number = 6,
) {
  const { items, total } = useMemo(() => {
    if (!theme) {
      return { items: [], total: 0 };
    }
    const filtered = allItems.filter(
      (item) => item.theme === theme && item.id !== currentId,
    );
    return {
      items: filtered.slice(0, limit),
      total: filtered.length,
    };
  }, [currentId, theme, limit]);

  return { items, total };
}
