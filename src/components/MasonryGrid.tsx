import Masonry from 'react-masonry-css';
import { Empty } from 'antd';
import type { NianhuaItem, SearchKeyword } from '@/types/nianhua';
import { NianhuaCard } from './NianhuaCard';
import styles from './MasonryGrid.module.css';

/**
 * 瀑布流布局组件 Props
 */
interface MasonryGridProps {
  /** 待展示的年画条目列表 */
  items: NianhuaItem[];
  /** 当前搜索关键词，用于空结果提示文案区分 */
  keyword?: SearchKeyword;
}

/**
 * 响应式断点下的列数配置
 */
const breakpointColumns = {
  default: 4,
  1200: 3,
  768: 2,
  480: 1,
};

/**
 * 年画瀑布流布局组件
 * - 基于 react-masonry-css 实现响应式瀑布流
 * - 列表为空时，根据是否存在搜索关键词展示差异化的空状态提示
 * - 内部复用 {@link NianhuaCard} 渲染每个条目
 */
export function MasonryGrid({ items, keyword }: MasonryGridProps) {
  if (items.length === 0) {
    const description = keyword
      ? `未找到与「${keyword}」相关的作品`
      : '暂无该题材作品';
    return (
      <div className={styles.empty}>
        <Empty description={description} />
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={styles.masonryGrid}
      columnClassName={styles.masonryColumn}
    >
      {items.map((item) => (
        <NianhuaCard key={item.id} item={item} />
      ))}
    </Masonry>
  );
}
