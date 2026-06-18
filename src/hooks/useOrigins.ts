import { useMemo } from 'react';
import nianhuaData from '@/mock/nianhua.json';
import {
  ORIGIN_DESCRIPTIONS,
  type NianhuaItem,
  type NianhuaOrigin,
  type OriginInfo,
} from '@/types/nianhua';

const allItems = nianhuaData as NianhuaItem[];

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

    return originList;
  }, []);

  return { origins, total: origins.length };
}

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

export function useNianhuaByOrigin(originName: string | undefined) {
  const items = useMemo(() => {
    if (!originName) {
      return [];
    }
    return allItems.filter((item) => item.origin === originName);
  }, [originName]);

  return { items, total: items.length };
}
