import { ConfigProvider, theme, Button, notification } from "antd";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import LayoutView from "./components/layouts/LayoutView";

function App() {
  const { darkAlgorithm } = theme;

  notification.config({
    className: "andt-notification-customization",
  });
  return (
    <ConfigProvider
      theme={{
        algorithm: [darkAlgorithm],
        token: {
          colorPrimary: "#cb9a06",
          // colorBorderSecondary: "#5c63c6"
        },
      }}
    >
      <BrowserRouter>
        <LayoutView />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
