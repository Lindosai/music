import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from '@/router';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import AppPlayBar from '@/pages/player/app-play-bar';

export default memo(function Main() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Suspense fallback={<div>loading</div>}>
        {renderRoutes(routes)}
      </Suspense>
      <AppFooter />
      <AppPlayBar />
    </BrowserRouter>
  );
});
