import { Tabs } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { MasonryGrid } from '@/components/MasonryGrid';
import { SearchBar } from '@/components/SearchBar';
import { RankingsArea } from '@/components/RankingsArea';
import { useNianhuaList } from '@/hooks/useNianhuaData';
import { THEME_TABS, type NianhuaThemeKey } from '@/types/nianhua';
import styles from './HomePage.module.css';

/**
 * 首页：热门推荐榜单 + 题材 Tab + 关键词搜索 + 瀑布流图录
 *
 * 布局（响应式）：
 * - ≥ 1100px：左右双栏，左侧 340px 宽榜单侧栏（sticky 粘性定位），右侧主瀑布流
 * - < 1100px：上下堆叠，榜单在上，瀑布流在下
 *
 * 交互：
 * - 题材筛选与搜索关键词均同步到 URL 查询参数，刷新后保留
 * - 两层过滤可组合生效（关键词按作品名称、寓意文字匹配）
 * - 榜单卡片支持收藏，与瀑布流卡片共享收藏状态
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

      <div className={styles.mainLayout}>
        <div className={styles.rankingsCol}>
          <RankingsArea isSidebar />
        </div>
        <div className={styles.contentCol}>
          <p className={styles.count}>共 {total} 件作品</p>
          <MasonryGrid items={items} keyword={keywordParam} />
        </div>
      </div>
    </div>
  );
}
