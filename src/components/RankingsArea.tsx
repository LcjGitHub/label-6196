import { useRankings } from '@/hooks/useRankings';
import { RankingSection } from './RankingSection';
import styles from './RankingsArea.module.css';

export function RankingsArea() {
  const { allRankings } = useRankings();

  return (
    <section className={styles.area}>
      {allRankings.map((section) => (
        <RankingSection key={section.id} section={section} />
      ))}
    </section>
  );
}
