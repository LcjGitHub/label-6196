import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Descriptions, Image, Result, Spin, Tag, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useNianhuaDetail,
  useSameThemeRecommendations,
} from '@/hooks/useNianhuaData';
import { useSameEraRecommendations } from '@/hooks/useEras';
import { SameEraRecommend } from '@/components/SameEraRecommend';
import { SameThemeRecommend } from '@/components/SameThemeRecommend';
import styles from './DetailPage.module.css';

const { Title, Paragraph } = Typography;

/**
 * 年画详情页：寓意、年代（可点击）、产地，以及同题材与同年代作品推荐
 */
export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { item } = useNianhuaDetail(id);
  const { items: recommendations, total: recTotal } = useSameEraRecommendations(
    id,
    item?.era,
    10,
  );
  const {
    items: themeRecommendations,
    total: themeRecTotal,
  } = useSameThemeRecommendations(id, item?.theme, 6);

  if (!id) {
    return (
      <Result
        status="404"
        title="缺少作品编号"
        extra={
          <Link to="/">
            <Button type="primary">返回图录</Button>
          </Link>
        }
      />
    );
  }

  if (!item) {
    return (
      <Result
        status="404"
        title="未找到该作品"
        subTitle={`编号 ${id} 不存在于 Mock 数据中`}
        extra={
          <Link to="/">
            <Button type="primary">返回图录</Button>
          </Link>
        }
      />
    );
  }

  const eraLink = (
    <Link
      to={`/eras/${encodeURIComponent(item.era)}`}
      className={styles.eraLink}
    >
      {item.era}
    </Link>
  );

  return (
    <Spin spinning={false}>
      <div className={styles.page}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className={styles.back}
        >
          返回
        </Button>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            <Image
              src={item.imageUrl}
              alt={item.title}
              preview={{ mask: '点击预览大图' }}
              className={styles.image}
            />
          </div>

          <div className={styles.infoSection}>
            <Title level={2} className={styles.title}>
              {item.title}
            </Title>
            <Tag color="volcano" className={styles.themeTag}>
              {item.theme}
            </Tag>

            <Descriptions
              bordered
              column={1}
              size="middle"
              className={styles.descriptions}
              items={[
                { key: 'meaning', label: '寓意', children: item.meaning },
                { key: 'era', label: '年代', children: eraLink },
                { key: 'origin', label: '产地', children: item.origin },
              ]}
            />

            <Paragraph type="secondary" className={styles.note}>
              以上信息均为 Mock 数据，仅供展示与后续迭代参考。
            </Paragraph>
          </div>
        </div>

        <div className={styles.recommendSection}>
          <SameThemeRecommend
            items={themeRecommendations}
            themeName={item.theme}
            totalCount={themeRecTotal}
          />

          <SameEraRecommend
            items={recommendations}
            eraName={item.era}
            totalCount={recTotal}
          />
        </div>
      </div>
    </Spin>
  );
}
