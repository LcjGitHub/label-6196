import { useMemo } from 'react';
import nianhuaData from '@/mock/nianhua.json';
import {
  ORIGIN_DESCRIPTIONS,
  type NianhuaItem,
  type NianhuaOrigin,
  type OriginInfo,
} from '@/types/nianhua';

const allItems = nianhuaData as NianhuaItem[];

/**
 * 获取所有产地及其作品数量
 * - 从 Mock 数据中提取不重复的产地列表
 * - 按产地名称字典序排序
 * - 统计每个产地的作品数量并补充简介
 * @returns 产地信息列表和产地总数
 */
export function useOrigins() {
  const origins = useMemo(() => {
    const originCount = new Map<string, number>();
    allItems.forEach((item) => {
      const origin = item.origin;
      originCount.set(origin, (originCount.get(origin) || 0) + 1);
    });

    const originList: OriginInfo[] = [];
    originCount.forEach((count, name) => {
      if (name in ORIGIN_DESCRIPTIONS) {
        originList.push({
          name: name as NianhuaOrigin,
          count,
          description: ORIGIN_DESCRIPTIONS[name as NianhuaOrigin],
        });
      }
    });

    originList.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));

    return originList;
  }, []);

  return { origins, total: origins.length };
}

/**
 * 根据产地名称获取产地详情及该产地下的所有作品
 * @param originName 产地名称，undefined 时返回 undefined
 * @returns 产地信息和作品列表，若产地不存在则返回 undefined
 */
export function useOriginDetail(originName: string | undefined) {
  const origin = useMemo(() => {
    if (!originName || !(originName in ORIGIN_DESCRIPTIONS)) {
      return undefined;
    }

    const originItems = allItems.filter((item) => item.origin === originName);
    const name = originName as NianhuaOrigin;

    return {
      info: {
        name,
        count: originItems.length,
        description: ORIGIN_DESCRIPTIONS[name],
      },
      items: originItems,
    };
  }, [originName]);

  return { origin };
}
