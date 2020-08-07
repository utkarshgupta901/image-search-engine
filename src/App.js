import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
      </Switch>
      <Switch>
        <Route path={`/home/:imageId`} component={Home}></Route>
      </Switch>
    </Router>
  );
};

export default App;
