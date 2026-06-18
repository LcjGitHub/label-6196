import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router-dom';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { router } from '@/router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
