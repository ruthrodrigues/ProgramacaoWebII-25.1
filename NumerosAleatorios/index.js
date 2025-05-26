import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(
    <App min={10} max={30} />
);