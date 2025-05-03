import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]);

export default router;
