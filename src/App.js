import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthRedirectRoute, PrivateRoute } from "./routes/AuthRoute";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";

//  Shared Components
import ScreenLoading from "./components/SharedComponents/ScreenLoading";

//  Auth
import Login from "./components/Auth/Login";
import Startup from "./components/Auth/Startup";

//  Dashboard
import Dashboard from "./components/Dashboard/Dashboard";

//  Users
import Users from "./components/User/Users";

//  Reports
import Reports from "./components/Report/Reports";

//  Order
import Orders from "./components/Order/Orders";
import Invoice from "./components/Order/Invoice";

//  Store
import Stores from "./components/Store/Stores";
import CreateStore from "./components/Store/CreateStore";

const NoMatch = () => <Redirect to="/" />;

class App extends Component {
  bindMiddleware = (middleware) => {
    if (process.env.REACT_APP_ENVIRONMENT !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
  };

  render() {
    const store = createStore(rootReducer, this.bindMiddleware([reduxThunk]));

    return (
      <Provider store={store}>
        <Startup>
          <Router>
            <Switch>
              <AuthRedirectRoute
                exact
                path={["/", "/login"]}
                component={Login}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/orders" component={Orders} />
              <PrivateRoute exact path="/reports" component={Reports} />
              <PrivateRoute exact path="/stores" component={Stores} />
              <PrivateRoute
                exact
                path="/stores/create"
                component={CreateStore}
              />
              <PrivateRoute
                exact
                path="/orders/invoice/:reference"
                component={Invoice}
              />
              <Route component={NoMatch} />
            </Switch>
          </Router>
          <ScreenLoading />
        </Startup>
      </Provider>
    );
  }
}

export default App;
