import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Register from './pages/Register';
import UpdateInfo from './pages/UpdateInfo';
import FlagSurvivor from './pages/FlagSurvivor';
import SurvivorsList from './pages/SurvivorsList';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import TradeItems from './pages/TradeItems';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="/trade-item/:id/" component={TradeItems} />
      <Route path="/update-information/:id" component={UpdateInfo} />
      <Route path="/survivor/list" component={SurvivorsList} />
      <Route path="/survivor/:id/report" component={FlagSurvivor} />
    </BrowserRouter>
  );
}

export default Routes;
