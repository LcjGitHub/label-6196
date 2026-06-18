import { useState, useMemo } from 'react';
import { Layout, Typography, Badge, Dropdown, type MenuProps } from 'antd';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  HeartOutlined,
  DownOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { useFavorites } from '@/hooks/useFavorites';
import { useOrigins } from '@/hooks/useOrigins';
import { useEras } from '@/hooks/useEras';
import styles from './AppLayout.module.css';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

/**
 * 全局布局：顶栏 + 内容区 + 页脚
 * - 顶栏左侧：Logo 链接到首页
 * - 顶栏右侧：按年代浏览（下拉菜单 + 单击跳转索引页）、按产地浏览下拉菜单、我的收藏入口
 * - 内容区：通过 Outlet 渲染子路由页面
 * - 页脚：版权信息
 */
export function AppLayout() {
  const { favoriteIds } = useFavorites();
  const { origins } = useOrigins();
  const { eras } = useEras();
  const navigate = useNavigate();

  const [eraDropdownOpen, setEraDropdownOpen] = useState(false);
  const [originDropdownOpen, setOriginDropdownOpen] = useState(false);

  const handleOriginMenuClick: MenuProps['onClick'] = useMemoizedFn(
    ({ key }) => {
      setOriginDropdownOpen(false);
      if (key === 'index') {
        navigate('/origins');
      } else {
        navigate(`/origins/${encodeURIComponent(key)}`);
      }
    },
  );

  const handleEraMenuClick: MenuProps['onClick'] = useMemoizedFn(({ key }) => {
    setEraDropdownOpen(false);
    if (key === 'index') {
      navigate('/eras');
    } else {
      navigate(`/eras/${encodeURIComponent(key)}`);
    }
  });

  const originMenuItems = useMemo<MenuProps['items']>(
    () => [
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
    ],
    [origins],
  );

  const eraMenuItems = useMemo<MenuProps['items']>(
    () => [
      {
        key: 'index',
        label: '全部年代索引',
        icon: <HistoryOutlined />,
      },
      { type: 'divider' },
      ...eras.map((era) => ({
        key: era.name,
        label: (
          <span>
            {era.name}
            <span style={{ marginLeft: 8, color: '#8c8c8c', fontSize: 12 }}>
              {era.count}件
            </span>
          </span>
        ),
      })),
    ],
    [eras],
  );

  const originMenuProps: MenuProps = {
    items: originMenuItems,
    onClick: handleOriginMenuClick,
  };

  const eraMenuProps: MenuProps = {
    items: eraMenuItems,
    onClick: handleEraMenuClick,
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
            menu={eraMenuProps}
            placement="bottomRight"
            trigger={['hover']}
            open={eraDropdownOpen}
            onOpenChange={setEraDropdownOpen}
          >
            <NavLink
              to="/eras"
              className={styles.erasLink}
              onClick={() => setEraDropdownOpen(false)}
            >
              <HistoryOutlined className={styles.erasIcon} />
              <span className={styles.erasText}>按年代浏览</span>
              <DownOutlined style={{ fontSize: 10 }} />
            </NavLink>
          </Dropdown>
          <Dropdown
            menu={originMenuProps}
            placement="bottomRight"
            trigger={['click', 'hover']}
            open={originDropdownOpen}
            onOpenChange={setOriginDropdownOpen}
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
