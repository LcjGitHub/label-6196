import { Tabs } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { MasonryGrid } from '@/components/MasonryGrid';
import { SearchBar } from '@/components/SearchBar';
import { useNianhuaList } from '@/hooks/useNianhuaData';
import { THEME_TABS, type NianhuaThemeKey } from '@/types/nianhua';
import styles from './HomePage.module.css';

/**
 * 首页：题材 Tab + 关键词搜索 + 瀑布流图录
 * - 题材筛选与搜索关键词均同步到 URL 查询参数，刷新后保留
 * - 两层过滤可组合生效
 */
export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const themeParam = searchParams.get('theme') ?? 'all';
  const keywordParam = searchParams.get('keyword') ?? '';
  const activeTheme = THEME_TABS.some((tab) => tab.key === themeParam)
    ? (themeParam as NianhuaThemeKey)
    : 'all';

  const { items, total } = useNianhuaList(activeTheme, keywordParam || undefined);

  /**
   * 题材 Tab 切换：将主题 key 写入 URL，不影响已有搜索关键词
   */
  const handleTabChange = useMemoizedFn((key: string) => {
    const next = new URLSearchParams(searchParams);
    if (key === 'all') {
      next.delete('theme');
    } else {
      next.set('theme', key);
    }
    setSearchParams(next);
  });

  /**
   * 关键词输入变更：将 keyword 写入 URL，不影响已有题材筛选
   */
  const handleKeywordChange = useMemoizedFn((value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('keyword', value);
    } else {
      next.delete('keyword');
    }
    setSearchParams(next);
  });

  /**
   * 清空搜索关键词：从 URL 中移除 keyword 参数
   */
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
