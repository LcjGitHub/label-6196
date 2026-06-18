import { useRankings } from '@/hooks/useRankings';
import { RankingSection } from './RankingSection';
import styles from './RankingsArea.module.css';

/**
 * 全部榜单容器组件 Props
 */
interface RankingsAreaProps {
  /** 是否为侧栏模式，侧栏模式下不显示上下边框 */
  isSidebar?: boolean;
}

/**
 * 全部榜单容器组件
 *
 * - 聚合「今日推荐」与各题材精选榜单
 * - 根据 isSidebar 属性切换展示样式（侧栏无边框，上方区域有上下边框）
 * - 内部按顺序渲染每个 {@link RankingSection}
 */
export function RankingsArea({ isSidebar = false }: RankingsAreaProps) {
  const { allRankings } = useRankings();

  return (
    <section className={`${styles.area} ${isSidebar ? styles.sidebar : ''}`}>
      {allRankings.map((section) => (
        <RankingSection key={section.id} section={section} />
      ))}
    </section>
  );
}
