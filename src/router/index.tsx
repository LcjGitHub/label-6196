import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { DetailPage } from '@/pages/DetailPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { HomePage } from '@/pages/HomePage';
import { OriginsPage } from '@/pages/OriginsPage';
import { OriginDetailPage } from '@/pages/OriginDetailPage';

/** 应用路由配置 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'origins',
        element: <OriginsPage />,
      },
      {
        path: 'origins/:origin',
        element: <OriginDetailPage />,
      },
      {
        path: 'item/:id',
        element: <DetailPage />,
      },
    ],
  },
]);
