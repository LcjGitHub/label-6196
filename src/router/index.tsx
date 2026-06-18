import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { DetailPage } from '@/pages/DetailPage';
import { HomePage } from '@/pages/HomePage';

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
        path: 'item/:id',
        element: <DetailPage />,
      },
    ],
  },
]);
