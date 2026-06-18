import Masonry from 'react-masonry-css';
import { Empty } from 'antd';
import type { NianhuaItem } from '@/types/nianhua';
import { NianhuaCard } from './NianhuaCard';
import styles from './MasonryGrid.module.css';

interface MasonryGridProps {
  /** 待展示的年画列表 */
  items: NianhuaItem[];
}

const breakpointColumns = {
  default: 4,
  1200: 3,
  768: 2,
  480: 1,
};

/**
 * react-masonry-css 瀑布流布局
 */
export function MasonryGrid({ items }: MasonryGridProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description="暂无该题材作品" />
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
