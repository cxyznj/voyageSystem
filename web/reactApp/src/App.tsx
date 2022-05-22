import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Navigation from './component/Navigation';
import Register from './component/Register';
import RouteDetail from './component/RouteDetail';
import SearchBar from './component/SearchBar';
import Comment from './component/Comment';
import MyFlight from './component/MyFlight';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, []);

  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}></Login>} />
        <Route path="/allFlights" element={isAuthenticated ? <SearchBar /> : <Navigate to="/login" />} />
        <Route path="/myFlights" element={isAuthenticated ? <MyFlight /> : <Navigate to="/login" />} />
        <Route path="/routeDetail/:flightRouteID" element={isAuthenticated ? <RouteDetail /> : <Navigate to="/login" />} />
        <Route path="/comment/:id/:fID" element={isAuthenticated ? <Comment /> : <Navigate to="/login" />} />

      </Routes>
    </div>
  );
}

export default App;
