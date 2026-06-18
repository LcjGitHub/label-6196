import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useOrigins } from '@/hooks/useOrigins';
import styles from './OriginsPage.module.css';

/**
 * 产地索引页：以卡片形式展示所有年画产地
 * - 从 Mock 数据提取不重复产地并按名称排序
 * - 每个卡片显示产地名称、作品数量和产地简介
 * - 点击卡片跳转至对应产地详情页
 * - 卡片使用 Link 元素，支持键盘聚焦和无障碍访问
 */
export function OriginsPage() {
  const { origins, total } = useOrigins();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>年画产地索引</h1>
        <p className={styles.subtitle}>共收录 {total} 个年画产地</p>
      </header>

      <div className={styles.grid}>
        {origins.map((origin) => (
          <Link
            key={origin.name}
            to={`/origins/${encodeURIComponent(origin.name)}`}
            className={styles.card}
            aria-label={`查看${origin.name}的${origin.count}件年画作品`}
          >
            <h3 className={styles.cardTitle}>{origin.name}</h3>
            <span className={styles.cardCount}>{origin.count} 件作品</span>
            <p className={styles.cardDescription}>{origin.description}</p>
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
