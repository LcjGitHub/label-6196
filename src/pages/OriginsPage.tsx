import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useOrigins } from '@/hooks/useOrigins';
import type { OriginInfo } from '@/types/nianhua';
import styles from './OriginsPage.module.css';

export function OriginsPage() {
  const { origins, total } = useOrigins();
  const navigate = useNavigate();

  const handleCardClick = useMemoizedFn((origin: OriginInfo) => {
    navigate(`/origins/${encodeURIComponent(origin.name)}`);
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>年画产地索引</h1>
        <p className={styles.subtitle}>共收录 {total} 个年画产地</p>
      </header>

      <div className={styles.grid}>
        {origins.map((origin) => (
          <div
            key={origin.name}
            className={styles.card}
            onClick={() => handleCardClick(origin)}
          >
            <h3 className={styles.cardTitle}>{origin.name}</h3>
            <span className={styles.cardCount}>{origin.count} 件作品</span>
            <p className={styles.cardDescription}>{origin.description}</p>
            <div className={styles.cardFooter}>
              查看作品
              <ArrowRightOutlined />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
