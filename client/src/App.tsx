import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TopNavBar from "./components/TopNavBar/TopNavBar";
import Site from "./components/Site/Report";
import Report from "./components/Report/Report";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import UnProtectedRoutes from "./routes/UnProtectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNavBar/>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home/>} />
            <Route path="/site" element={<Site/>} />
            <Route path="/report" element={<Report/>} />
          </Route>
          <Route element={<UnProtectedRoutes />}>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
