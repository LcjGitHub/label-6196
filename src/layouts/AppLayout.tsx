import { Layout, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

/**
 * 全局布局：顶栏 + 内容区 + 页脚
 */
export function AppLayout() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Link to="/" className={styles.logo}>
          年画图录
        </Link>
        <Text className={styles.tagline}>Mock 数据 · 无 CMS</Text>
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
