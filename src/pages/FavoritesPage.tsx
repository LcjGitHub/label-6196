import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { MasonryGrid } from '@/components/MasonryGrid';
import { useFavorites } from '@/hooks/useFavorites';
import { useNianhuaList } from '@/hooks/useNianhuaData';
import styles from './FavoritesPage.module.css';

export function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const { items: allItems } = useNianhuaList('all');

  const favoriteItems = useMemo(() => {
    const idSet = new Set(favoriteIds);
    return allItems.filter((item) => idSet.has(item.id));
  }, [allItems, favoriteIds]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>我的收藏</h1>
        <p className={styles.subtitle}>
          共收藏 <span className={styles.count}>{favoriteItems.length}</span> 件作品
        </p>
      </header>

      {favoriteItems.length === 0 ? (
        <div className={styles.empty}>
          <Empty
            description={
              <span>
                还没有收藏任何作品，<Link to="/">去首页看看</Link>
              </span>
            }
          />
        </div>
      ) : (
        <MasonryGrid items={favoriteItems} />
      )}
    </div>
  );
}
