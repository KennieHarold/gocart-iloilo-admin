import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";

class App extends Component {
  bindMiddleware = (middleware) => {
    if (process.env.REACT_ENVIRONMENT !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
  };

  render() {
    const store = createStore(rootReducer, this.bindMiddleware([reduxThunk]));

    return (
      <Provider store={store}>
        <div>Test React</div>
      </Provider>
    );
  }
}

export default App;
