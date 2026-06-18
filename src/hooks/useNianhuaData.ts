import { useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import nianhuaData from '@/mock/nianhua.json';
import type {
  NianhuaItem,
  SearchKeyword,
  NianhuaListFilter,
} from '@/types/nianhua';

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
 * @param id 年画条目唯一标识，undefined 时返回 undefined
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
