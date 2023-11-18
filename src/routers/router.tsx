import PageNotFound from 'components/common/PageNotFound';
import Header from 'components/layout/Header';
import Homepage from 'pages/Homepage';
import ListingStayDetailPage from 'pages/ListingDetailPage';
import MyBookingsPage from 'pages/MyBookingsPage';
import PaymentConfirmedPage from 'pages/PaymentConfirmedPage';
import StaysListPage from 'pages/StaysListPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/**
 * Define all pages in the app
 * @param path  path of the page    (ex: /home)
 **/
export const pages = [
  { path: '/', exact: true, component: Homepage },
  { path: '/#', exact: true, component: Homepage },
  { path: '/stays', exact: true, component: StaysListPage },
  {
    path: '/stays/:id',
    exact: true,
    component: ListingStayDetailPage,
  },
  {
    path: '/my-bookings',
    exact: true,
    component: MyBookingsPage,
  },
  {
    path: '/payment-confirmed/:code',
    exact: true,
    component: PaymentConfirmedPage,
  },
  {
    path: '/stays',
    exact: true,
    component: StaysListPage,
  },
];

/**
 *
 * @returns
 */
const Router = () => {
  return (
    <BrowserRouter>
      <Header className='h-[90px] shadow-sm dark:border-b dark:border-neutral-700' />
      <div className='flex-1 min-h-[calc(100vh-150px)] relative'>
        <Routes>
          {pages.map(({ component, path }) => {
            const Component = component;
            return <Route key={path} element={<Component />} path={path} />;
          })}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      <div className='relative bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl h-[60px] backdrop-filter flex items-start justify-center p-5 border-t border-neutral-200 dark:border-neutral-700 font-leagueSpartan'>
        2023 © Vinicius Kawamoto. All rights reserved.
      </div>
    </BrowserRouter>
  );
};

export default Router;
