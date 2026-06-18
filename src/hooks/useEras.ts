import { useMemo } from 'react';
import nianhuaData from '@/mock/nianhua.json';
import {
  ERA_DESCRIPTIONS,
  type NianhuaItem,
  type EraInfo,
} from '@/types/nianhua';

const allItems = nianhuaData as NianhuaItem[];

/**
 * 获取所有年代及其作品数量
 * - 从 Mock 数据中提取不重复的年代列表
 * - 按年代顺序排序（明代 → 清代 → 民国）
 * - 统计每个年代的作品数量并补充简介
 * @returns 年代信息列表和年代总数
 */
export function useEras() {
  const eras = useMemo(() => {
    const eraCount = new Map<string, number>();
    allItems.forEach((item) => {
      const era = item.era;
      eraCount.set(era, (eraCount.get(era) || 0) + 1);
    });

    const eraList: EraInfo[] = [];
    eraCount.forEach((count, name) => {
      if (name in ERA_DESCRIPTIONS) {
        eraList.push({
          name,
          count,
          description: ERA_DESCRIPTIONS[name],
        });
      }
    });

    const eraOrder = ['明代', '清代', '民国'];
    eraList.sort((a, b) => eraOrder.indexOf(a.name) - eraOrder.indexOf(b.name));

    return eraList;
  }, []);

  return { eras, total: eras.length };
}

/**
 * 根据年代名称获取年代详情及该年代下的所有作品
 * @param eraName 年代名称，undefined 时返回 undefined
 * @returns 年代信息和作品列表，若年代不存在则返回 undefined
 */
export function useEraDetail(eraName: string | undefined) {
  const era = useMemo(() => {
    if (!eraName || !(eraName in ERA_DESCRIPTIONS)) {
      return undefined;
    }

    const eraItems = allItems.filter((item) => item.era === eraName);

    return {
      info: {
        name: eraName,
        count: eraItems.length,
        description: ERA_DESCRIPTIONS[eraName],
      },
      items: eraItems,
    };
  }, [eraName]);

  return { era };
}

/**
 * 获取与指定作品同年代的其他作品（排除当前作品本身）
 * @param currentId 当前作品 ID
 * @param era 年代名称
 * @param limit 最大返回数量，默认 10
 * @returns 同年代其他作品列表
 */
export function useSameEraRecommendations(
  currentId: string | undefined,
  era: string | undefined,
  limit: number = 10,
) {
  const recommendations = useMemo(() => {
    if (!era) {
      return [];
    }
    return allItems
      .filter((item) => item.era === era && item.id !== currentId)
      .slice(0, limit);
  }, [currentId, era, limit]);

  return recommendations;
}
