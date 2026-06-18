import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Empty, Result } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MasonryGrid } from '@/components/MasonryGrid';
import { useEraDetail } from '@/hooks/useEras';
import styles from './EraDetailPage.module.css';

/**
 * 年代详情页：展示年代介绍及该年代下的所有年画作品
 * - 顶部显示年代名称、作品数量和年代详细介绍
 * - 下方使用瀑布流布局展示该年代下的所有年画作品
 * - 支持返回上一页导航
 * - 处理参数缺失和年代不存在的错误场景
 */
export function EraDetailPage() {
  const { era: eraParam } = useParams<{ era: string }>();
  const navigate = useNavigate();
  const decodedEra = eraParam ? decodeURIComponent(eraParam) : undefined;
  const { era } = useEraDetail(decodedEra);

  if (!decodedEra) {
    return (
      <Result
        status="404"
        title="缺少年代参数"
        extra={
          <Link to="/eras">
            <Button type="primary">返回年代索引</Button>
          </Link>
        }
      />
    );
  }

  if (!era) {
    return (
      <Result
        status="404"
        title="未找到该年代"
        subTitle={`年代「${decodedEra}」不存在`}
        extra={
          <Link to="/eras">
            <Button type="primary">返回年代索引</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className={styles.page}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className={styles.back}
      >
        返回
      </Button>

      <div className={styles.intro}>
        <h1 className={styles.title}>{era.info.name}</h1>
        <div className={styles.meta}>
          <span className={styles.count}>{era.info.count} 件作品</span>
        </div>
        <p className={styles.description}>{era.info.description}</p>
      </div>

      <h2 className={styles.sectionTitle}>代表作品</h2>

      {era.items.length === 0 ? (
        <div className={styles.empty}>
          <Empty description="该年代暂无作品" />
        </div>
      ) : (
        <MasonryGrid items={era.items} />
      )}
    </div>
  );
}
