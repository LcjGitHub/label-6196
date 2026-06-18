import { Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { NianhuaItem } from '@/types/nianhua';
import styles from './RankingCard.module.css';

const { Text } = Typography;

interface RankingCardProps {
  item: NianhuaItem;
  rank?: number;
}

export function RankingCard({ item, rank }: RankingCardProps) {
  const aspectRatio = `${item.width} / ${item.height}`;

  return (
    <Link
      to={`/item/${item.id}`}
      className={styles.card}
      aria-label={`查看${item.title}详情`}
    >
      <div className={styles.imageWrap} style={{ aspectRatio }}>
        <img
          src={item.imageUrl}
          alt={item.title}
          className={styles.image}
          loading="lazy"
          draggable={false}
        />
        {rank !== undefined && rank >= 1 && rank <= 3 && (
          <div className={`${styles.rankBadge} ${styles[`rank${rank}`]}`}>
            {rank}
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <Text className={styles.cardTitle} ellipsis>
          {item.title}
        </Text>
        <div className={styles.cardMeta}>
          <Tag color="volcano" className={styles.themeTag}>
            {item.theme}
          </Tag>
          <Text type="secondary" className={styles.origin}>
            {item.origin}
          </Text>
        </div>
      </div>
    </Link>
  );
}
