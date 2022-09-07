// Imports libraries
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// Imports defauly styled and main component
import "./index.css";
import App from "./App";

// Imports redux stuff
import store from "./redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
