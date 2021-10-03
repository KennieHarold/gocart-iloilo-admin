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
import Startup from "./components/Startup";

//  Components
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Orders from "./components/Orders";
import Reports from "./components/Reports";
import Invoice from "./components/Invoice";
import Stores from "./components/Stores";
import CreateStore from "./components/CreateStore";

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
