import { Tabs } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { MasonryGrid } from '@/components/MasonryGrid';
import { useNianhuaList } from '@/hooks/useNianhuaData';
import { THEME_TABS, type NianhuaTheme } from '@/types/nianhua';
import styles from './HomePage.module.css';

/**
 * 首页：题材 Tab + 瀑布流图录
 */
export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const themeParam = searchParams.get('theme') ?? 'all';
  const activeTheme = THEME_TABS.some((tab) => tab.key === themeParam)
    ? (themeParam as 'all' | NianhuaTheme)
    : 'all';

  const { items, total } = useNianhuaList(activeTheme);

  const handleTabChange = useMemoizedFn((key: string) => {
    if (key === 'all') {
      setSearchParams({});
      return;
    }
    setSearchParams({ theme: key });
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>年画题材图录</h1>
        <p className={styles.subtitle}>门神 · 娃娃 · 戏曲 · 吉祥 · 民俗</p>
      </header>

      <Tabs
        activeKey={activeTheme}
        items={THEME_TABS.map((tab) => ({
          key: tab.key,
          label: tab.label,
        }))}
        onChange={handleTabChange}
        className={styles.tabs}
      />

      <p className={styles.count}>共 {total} 件作品</p>
      <MasonryGrid items={items} />
    </div>
  );
}
