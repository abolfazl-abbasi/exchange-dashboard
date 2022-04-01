import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CryptoExchangePage from "./../Pages/CryptoExchangePage.jsx";
import "./App.css";
import MainProvider from "../Providers/MainProvider";

function App() {
  return (
    <>
      <MainProvider>
        <Routes>
          <Route path="/" element={<CryptoExchangePage />} />
        </Routes>
      </MainProvider>
    </>
  );
}

export default App;
