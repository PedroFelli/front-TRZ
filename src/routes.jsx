import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Register from './pages/Register';
import UpdateLocation from './pages/UpdateLocation';
import FlagSurvivor from './pages/FlagSurvivor';
import SurvivorsList from './pages/SurvivorsList';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="/update-information/:id" component={UpdateLocation} />
      <Route path="/survivor/list" component={SurvivorsList} />
      <Route path="/survivor/:id/report" component={FlagSurvivor} />
    </BrowserRouter>
  );
}

export default Routes;
