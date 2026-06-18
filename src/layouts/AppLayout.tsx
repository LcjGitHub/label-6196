import { Layout, Typography, Badge } from 'antd';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';
import { useFavorites } from '@/hooks/useFavorites';
import styles from './AppLayout.module.css';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

/**
 * 全局布局：顶栏 + 内容区 + 页脚
 */
export function AppLayout() {
  const { favoriteIds } = useFavorites();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.logo}>
            年画图录
          </Link>
          <Text className={styles.tagline}>Mock 数据 · 无 CMS</Text>
        </div>
        <NavLink to="/favorites" className={styles.favoritesLink}>
          <Badge count={favoriteIds.length} size="small" offset={[-4, 4]}>
            <HeartOutlined className={styles.favoritesIcon} />
          </Badge>
          <span className={styles.favoritesText}>我的收藏</span>
        </NavLink>
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        年画题材 Mock 图录 · React 18 + Vite + Ant Design 5
      </Footer>
    </Layout>
  );
}
