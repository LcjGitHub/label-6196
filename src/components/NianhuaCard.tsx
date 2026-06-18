import { Card, Image, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { NianhuaItem } from '@/types/nianhua';
import styles from './NianhuaCard.module.css';

const { Text, Title } = Typography;

interface NianhuaCardProps {
  /** 年画数据 */
  item: NianhuaItem;
}

/**
 * 瀑布流中的年画卡片
 */
export function NianhuaCard({ item }: NianhuaCardProps) {
  const aspectRatio = `${item.width} / ${item.height}`;

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
