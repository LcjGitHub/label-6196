import { Empty, Tag, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { NianhuaItem } from '@/types/nianhua';
import styles from './SameEraRecommend.module.css';

const { Title, Text } = Typography;

interface SameEraRecommendProps {
  items: NianhuaItem[];
  eraName: string;
}

/**
 * 同年代作品推荐横滑组件
 * - 横向滚动展示同年代的其他年画作品
 * - 支持鼠标拖拽和触摸滑动
 * - 左右两侧提供滚动按钮
 * - 每个卡片显示封面、标题、题材，点击跳转至详情页
 */
export function SameEraRecommend({ items, eraName }: SameEraRecommendProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description={`暂无${eraName}其他作品`} />
      </div>
    );
  }

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('same-era-scroll-container');
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          同年代推荐 · {eraName}
        </Title>
        <Text type="secondary" className={styles.subtitle}>
          共 {items.length} 件作品
        </Text>
      </div>

      <div className={styles.scrollWrapper}>
        <button
          type="button"
          className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
          onClick={() => handleScroll('left')}
          aria-label="向左滚动"
        >
          <LeftOutlined />
        </button>

        <div
          id="same-era-scroll-container"
          className={styles.scrollContainer}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className={styles.card}
              aria-label={`查看${item.title}详情`}
            >
              <div
                className={styles.imageWrap}
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
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
          ))}
        </div>

        <button
          type="button"
          className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
          onClick={() => handleScroll('right')}
          aria-label="向右滚动"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
