import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from '@/router';

export default memo(function Main() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        {renderRoutes(routes)}
      </Suspense>
    </BrowserRouter>
  );
});
