import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Card, Image, Tag, Typography, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import type { NianhuaItem } from '@/types/nianhua';
import styles from './NianhuaCard.module.css';

const { Text, Title } = Typography;

interface NianhuaCardProps {
  item: NianhuaItem;
}

export function NianhuaCard({ item }: NianhuaCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(item.id);
  const aspectRatio = `${item.width} / ${item.height}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <Card
      className={styles.card}
      hoverable
      cover={
        <div className={styles.imageWrap} style={{ aspectRatio }}>
          <Image
            src={item.imageUrl}
            alt={item.title}
            preview={{ mask: '预览' }}
            className={styles.image}
          />
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
      }
    >
      <Link to={`/item/${item.id}`} className={styles.link}>
        <Title level={5} className={styles.title} ellipsis={{ rows: 1 }}>
          {item.title}
        </Title>
      </Link>
      <div className={styles.meta}>
        <Tag color="volcano">{item.theme}</Tag>
        <Text type="secondary" className={styles.origin}>
          {item.origin}
        </Text>
      </div>
    </Card>
  );
}
