import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Tag, Typography, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import type { NianhuaItem } from '@/types/nianhua';
import styles from './RankingCard.module.css';

const { Text } = Typography;

/**
 * 榜单缩略卡片 Props
 */
interface RankingCardProps {
  /** 年画作品数据 */
  item: NianhuaItem;
  /** 榜单排名（1-3 名会显示金/银/铜徽章） */
  rank?: number;
}

/**
 * 榜单缩略卡片组件
 *
 * - 展示作品封面、标题、题材标签、产地
 * - 前三名显示排名徽章（1金/2银/3铜）
 * - 右上角收藏按钮，与瀑布流卡片共享收藏状态
 * - 点击卡片跳转至作品详情页
 */
export function RankingCard({ item, rank }: RankingCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(item.id);
  const aspectRatio = `${item.width} / ${item.height}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
  };

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
        <Tooltip title={favorited ? '取消收藏' : '加入收藏'}>
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favorited ? `取消收藏 ${item.title}` : `收藏 ${item.title}`}
            className={`${styles.favoriteBtn} ${favorited ? styles.favorited : ''}`}
          >
            {favorited ? (
              <HeartFilled className={styles.favoriteIcon} />
            ) : (
              <HeartOutlined className={styles.favoriteIcon} />
            )}
          </button>
        </Tooltip>
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
