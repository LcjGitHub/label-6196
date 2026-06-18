import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Empty, Result } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MasonryGrid } from '@/components/MasonryGrid';
import { useOriginDetail } from '@/hooks/useOrigins';
import styles from './OriginDetailPage.module.css';

export function OriginDetailPage() {
  const { origin: originParam } = useParams<{ origin: string }>();
  const navigate = useNavigate();
  const decodedOrigin = originParam ? decodeURIComponent(originParam) : undefined;
  const { origin } = useOriginDetail(decodedOrigin);

  if (!decodedOrigin) {
    return (
      <Result
        status="404"
        title="缺少产地参数"
        extra={
          <Link to="/origins">
            <Button type="primary">返回产地索引</Button>
          </Link>
        }
      />
    );
  }

  if (!origin) {
    return (
      <Result
        status="404"
        title="未找到该产地"
        subTitle={`产地「${decodedOrigin}」不存在`}
        extra={
          <Link to="/origins">
            <Button type="primary">返回产地索引</Button>
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
        <h1 className={styles.title}>{origin.info.name}</h1>
        <div className={styles.meta}>
          <span className={styles.count}>{origin.info.count} 件作品</span>
        </div>
        <p className={styles.description}>{origin.info.description}</p>
      </div>

      <h2 className={styles.sectionTitle}>代表作品</h2>
      <p className={styles.countText}>共 {origin.items.length} 件作品</p>

      {origin.items.length === 0 ? (
        <div className={styles.empty}>
          <Empty description="该产地暂无作品" />
        </div>
      ) : (
        <MasonryGrid items={origin.items} />
      )}
    </div>
  );
}
