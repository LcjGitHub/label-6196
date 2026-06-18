import { Layout, Typography, Badge, Dropdown, type MenuProps } from 'antd';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { HeartOutlined, DownOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { useFavorites } from '@/hooks/useFavorites';
import { useOrigins } from '@/hooks/useOrigins';
import styles from './AppLayout.module.css';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

/**
 * 全局布局：顶栏 + 内容区 + 页脚
 * - 顶栏左侧：Logo 链接到首页
 * - 顶栏右侧：按产地浏览下拉菜单、我的收藏入口
 * - 内容区：通过 Outlet 渲染子路由页面
 * - 页脚：版权信息
 *
 * 产地浏览下拉菜单：
 * - 支持点击和 hover 触发展开，兼容触控设备
 * - 菜单项包含「全部产地索引」和各具体产地
 * - 点击菜单项自动跳转并关闭菜单
 */
export function AppLayout() {
  const { favoriteIds } = useFavorites();
  const { origins } = useOrigins();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = useMemoizedFn(({ key }) => {
    if (key === 'index') {
      navigate('/origins');
    } else {
      navigate(`/origins/${encodeURIComponent(key)}`);
    }
  });

  const menuItems: MenuProps['items'] = useMemoizedFn(() => [
    {
      key: 'index',
      label: '全部产地索引',
      icon: <EnvironmentOutlined />,
    },
    { type: 'divider' },
    ...origins.map((origin) => ({
      key: origin.name,
      label: (
        <span>
          {origin.name}
          <span style={{ marginLeft: 8, color: '#8c8c8c', fontSize: 12 }}>
            {origin.count}件
          </span>
        </span>
      ),
    })),
  ])() as MenuProps['items'];

  const menuProps: MenuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.logo}>
            年画图录
          </Link>
          <Text className={styles.tagline}>Mock 数据 · 无 CMS</Text>
        </div>
        <div className={styles.headerRight}>
          <Dropdown
            menu={menuProps}
            placement="bottomRight"
            trigger={['click', 'hover']}
          >
            <NavLink
              to="/origins"
              className={styles.originsLink}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <EnvironmentOutlined className={styles.originsIcon} />
              <span className={styles.originsText}>按产地浏览</span>
              <DownOutlined style={{ fontSize: 10 }} />
            </NavLink>
          </Dropdown>
          <NavLink to="/favorites" className={styles.favoritesLink}>
            <Badge count={favoriteIds.length} size="small" offset={[-4, 4]}>
              <HeartOutlined className={styles.favoritesIcon} />
            </Badge>
            <span className={styles.favoritesText}>我的收藏</span>
          </NavLink>
        </div>
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
