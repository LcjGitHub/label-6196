import { useRef, useState, useEffect, useCallback } from 'react';
import { Empty, Tag, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { NianhuaItem, NianhuaTheme } from '@/types/nianhua';
import styles from './SameThemeRecommend.module.css';

const { Title, Text } = Typography;

interface SameThemeRecommendProps {
  items: NianhuaItem[];
  themeName: NianhuaTheme;
  totalCount?: number;
}

/**
 * 同题材作品推荐横滑组件
 * - 横向滚动展示同一题材的其他年画作品
 * - 支持鼠标按住拖拽和触摸滑动
 * - 左右两侧提供滚动按钮
 * - 每个卡片显示封面、标题、年代，点击跳转至详情页
 */
export function SameThemeRecommend({
  items,
  themeName,
  totalCount,
}: SameThemeRecommendProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setHasMoved(false);
      setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
      setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 3) {
        setHasMoved(true);
      }
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [isDragging, startX, scrollLeft],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const preventDefault = (e: globalThis.MouseEvent) => {
        if (hasMoved) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      container.addEventListener('click', preventDefault, true);
      return () => {
        container.removeEventListener('click', preventDefault, true);
      };
    }
  }, [hasMoved]);

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description={`暂无${themeName}题材其他作品`} />
      </div>
    );
  }

  const displayCount = totalCount !== undefined ? totalCount : items.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          同题材推荐 · {themeName}
        </Title>
        <Text type="secondary" className={styles.subtitle}>
          该题材还有 {displayCount} 件作品
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
          ref={scrollContainerRef}
          className={`${styles.scrollContainer} ${
            isDragging ? styles.dragging : ''
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className={styles.card}
              aria-label={`查看${item.title}详情`}
              onClick={(e) => {
                if (hasMoved) {
                  e.preventDefault();
                }
              }}
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
                  draggable={false}
                />
              </div>
              <div className={styles.cardContent}>
                <Text className={styles.cardTitle} ellipsis>
                  {item.title}
                </Text>
                <div className={styles.cardMeta}>
                  <Tag color="gold" className={styles.eraTag}>
                    {item.era}
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
