import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthRedirectRoute, PrivateRoute } from "./routes/AuthRoute";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";

//  Shared Components
import ScreenLoading from "./components/SharedComponents/ScreenLoading";

//  Components
import Login from "./components/Login";
import Panel from "./components/Panel";

const NoMatchPage = () => (
  <center>
    <h5 class="p-3">404 - Not found</h5>
  </center>
);

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
        <Router>
          <Switch>
            <AuthRedirectRoute exact path={["/", "/login"]} component={Login} />
            <PrivateRoute exact path="/panel" component={Panel} />
            <Route component={NoMatchPage} />
          </Switch>
        </Router>
        <ScreenLoading />
      </Provider>
    );
  }
}

export default App;
