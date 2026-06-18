import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Empty, Result } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MasonryGrid } from '@/components/MasonryGrid';
import { useOriginDetail } from '@/hooks/useOrigins';
import styles from './OriginDetailPage.module.css';

/**
 * 产地详情页：展示产地介绍及该产地下的所有年画作品
 * - 顶部显示产地名称、作品数量和产地详细介绍
 * - 下方使用瀑布流布局展示该产地下的所有年画作品
 * - 支持返回上一页导航
 * - 处理参数缺失和产地不存在的错误场景
 */
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
