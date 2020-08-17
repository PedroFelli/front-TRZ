import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Register from './pages/Register';
import UpdateLocation from './pages/UpdateLocation';
import FlagSurvivor from './pages/FlagSurvivor';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/update-information/:id" component={UpdateLocation} />
      <Route path="/survivor/:id/report" component={FlagSurvivor} />
    </BrowserRouter>
  );
}

export default Routes;
