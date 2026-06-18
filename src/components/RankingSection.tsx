import { useRef, useState, useEffect, useCallback } from 'react';
import { Empty, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { RankingSection as RankingSectionType } from '@/hooks/useRankings';
import { RankingCard } from './RankingCard';
import styles from './RankingSection.module.css';

const { Title, Text } = Typography;

/**
 * 单个榜单区块组件 Props
 */
interface RankingSectionProps {
  /** 单个榜单数据，含标题、副标题、作品列表 */
  section: RankingSectionType;
}

/**
 * 单个榜单区块组件
 *
 * - 顶部显示榜单标题、副标题、作品总数
 * - 内容区域横向滚动展示榜单缩略卡片
 * - 支持鼠标按住拖拽和触摸滑动
 * - 左右两侧提供滚动按钮（小屏幕下隐藏）
 * - 卡片前三名显示金/银/铜排名徽章
 */
export function RankingSection({ section }: RankingSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  /** 左右滚动按钮点击处理 */
  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  /** 鼠标按下：开始拖拽 */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setHasMoved(false);
      setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
      setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    },
    [],
  );

  /** 鼠标移动：拖拽滚动 */
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

  /** 鼠标抬起：结束拖拽 */
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /** 鼠标离开：结束拖拽 */
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  /** 拖拽过程中阻止默认点击事件，避免误触发卡片跳转 */
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

  if (section.items.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description="暂无匹配作品" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Title level={4} className={styles.title}>
            {section.title}
          </Title>
          {section.subtitle && (
            <Text type="secondary" className={styles.subtitle}>
              {section.subtitle}
            </Text>
          )}
        </div>
        <Text type="secondary" className={styles.count}>
          共 {section.items.length} 件
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
          className={`${styles.scrollContainer} ${isDragging ? styles.dragging : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {section.items.map((item, index) => (
            <div
              key={item.id}
              onClick={(e) => {
                if (hasMoved) {
                  e.preventDefault();
                }
              }}
            >
              <RankingCard item={item} rank={index + 1} />
            </div>
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
