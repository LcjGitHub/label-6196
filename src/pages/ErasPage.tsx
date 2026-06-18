import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Segmented, Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useEras } from '@/hooks/useEras';
import styles from './ErasPage.module.css';

const { Title, Paragraph } = Typography;

/**
 * 年代索引页：顶部分段标签展示各年代及作品数量
 * - 从 Mock 数据提取不重复年代并按历史顺序排序
 * - 顶部分段标签显示年代名称和作品数量
 * - 选中标签后下方展示对应年代简介
 * - 提供进入该年代详情页的按钮
 */
export function ErasPage() {
  const { eras, total } = useEras();
  const [selectedEra, setSelectedEra] = useState<string>(
    eras.length > 0 ? eras[0].name : '',
  );

  const currentEra = eras.find((e) => e.name === selectedEra);

  const segmentOptions = eras.map((era) => ({
    label: (
      <span className={styles.segmentLabel}>
        <span className={styles.segmentName}>{era.name}</span>
        <span className={styles.segmentCount}>{era.count}件</span>
      </span>
    ),
    value: era.name,
  }));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Title level={2} className={styles.title}>
          年画年代索引
        </Title>
        <Paragraph type="secondary" className={styles.subtitle}>
          共收录 {total} 个历史年代
        </Paragraph>
      </header>

      <div className={styles.segmentWrapper}>
        <Segmented
          size="large"
          value={selectedEra}
          onChange={(value) => setSelectedEra(value as string)}
          options={segmentOptions}
          className={styles.segmented}
        />
      </div>

      {currentEra && (
        <div className={styles.introCard}>
          <div className={styles.introHeader}>
            <Title level={3} className={styles.eraTitle}>
              {currentEra.name}
            </Title>
            <span className={styles.eraCount}>
              {currentEra.count} 件作品
            </span>
          </div>
          <Paragraph className={styles.eraDescription}>
            {currentEra.description}
          </Paragraph>
          <div className={styles.actionRow}>
            <Link
              to={`/eras/${encodeURIComponent(currentEra.name)}`}
              className={styles.enterLink}
            >
              <Button type="primary" icon={<ArrowRightOutlined />}>
                查看{currentEra.name}全部年画
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
