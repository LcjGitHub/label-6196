import { Tabs } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { MasonryGrid } from '@/components/MasonryGrid';
import { SearchBar } from '@/components/SearchBar';
import { useNianhuaList } from '@/hooks/useNianhuaData';
import { THEME_TABS, type NianhuaTheme } from '@/types/nianhua';
import styles from './HomePage.module.css';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const themeParam = searchParams.get('theme') ?? 'all';
  const keywordParam = searchParams.get('keyword') ?? '';
  const activeTheme = THEME_TABS.some((tab) => tab.key === themeParam)
    ? (themeParam as 'all' | NianhuaTheme)
    : 'all';

  const { items, total } = useNianhuaList(activeTheme, keywordParam || undefined);

  const handleTabChange = useMemoizedFn((key: string) => {
    const next = new URLSearchParams(searchParams);
    if (key === 'all') {
      next.delete('theme');
    } else {
      next.set('theme', key);
    }
    setSearchParams(next);
  });

  const handleKeywordChange = useMemoizedFn((value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('keyword', value);
    } else {
      next.delete('keyword');
    }
    setSearchParams(next);
  });

  const handleKeywordClear = useMemoizedFn(() => {
    const next = new URLSearchParams(searchParams);
    next.delete('keyword');
    setSearchParams(next);
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

      <SearchBar
        value={keywordParam}
        onChange={handleKeywordChange}
        onClear={handleKeywordClear}
      />

      <p className={styles.count}>共 {total} 件作品</p>
      <MasonryGrid items={items} keyword={keywordParam} />
    </div>
  );
}
