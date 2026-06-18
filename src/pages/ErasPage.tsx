import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useEras } from '@/hooks/useEras';
import styles from './ErasPage.module.css';

/**
 * 年代索引页：以卡片形式展示所有年画年代
 * - 从 Mock 数据提取不重复年代并按历史顺序排序
 * - 每个卡片显示年代名称、作品数量和年代简介
 * - 点击卡片跳转至对应年代详情页
 * - 卡片使用 Link 元素，支持键盘聚焦和无障碍访问
 */
export function ErasPage() {
  const { eras, total } = useEras();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>年画年代索引</h1>
        <p className={styles.subtitle}>共收录 {total} 个历史年代</p>
      </header>

      <div className={styles.grid}>
        {eras.map((era) => (
          <Link
            key={era.name}
            to={`/eras/${encodeURIComponent(era.name)}`}
            className={styles.card}
            aria-label={`查看${era.name}的${era.count}件年画作品`}
          >
            <h3 className={styles.cardTitle}>{era.name}</h3>
            <span className={styles.cardCount}>{era.count} 件作品</span>
            <p className={styles.cardDescription}>{era.description}</p>
            <div className={styles.cardFooter}>
              查看作品
              <ArrowRightOutlined />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
