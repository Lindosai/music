import * as React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div>App</div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
