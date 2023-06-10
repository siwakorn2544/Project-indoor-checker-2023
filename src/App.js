import React from 'react';
import './App.css';
import PositionView from './pages/PositionView';
import Login from './pages/login'
import Roompage from './pages/Roompage'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import MockPage from './pages/mockpage';
import AdminPage from './pages/Adminpage';
import RegisBeacon from './pages/RegisBeacon'
import CoursePage from './pages/CoursePage';
function App() {

  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/RegisBeacon" element={<RegisBeacon/>}/>
        <Route path="/roompage" element={<Roompage/>}/>
        <Route path="/CoursePage" element={<CoursePage/>}/>
        <Route path="/roomdetail/:roomdtailId" element={<PositionView/>} />
        <Route path="/mockpage/:mockpagedetailId" element={<MockPage/>} />
        <Route path="/AdminPage/" element={<AdminPage/>} />
      </Routes>
    </div>

  );

}

export default App;