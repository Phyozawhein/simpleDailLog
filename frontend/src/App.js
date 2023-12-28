import React from 'react';
import './App.css';
import {useState, useCallback} from 'react';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import PackageManagment from './pages/PackageManagement/PackageManagment';
import {BrowserRouter, Route, Navigate, Routes}  from 'react-router-dom';
import AuthContext from './context/auth/auth-context';
import Navbar from './shared/components/Navbar/Navbar';



function App() {
  let routes;
  const [token,setToken]= useState()
  const login =useCallback((toke)=>{
    setToken(toke)
  },[])
  const logout = useCallback(()=>{
    setToken(null);
  },[])
  
  if (token){
    
    routes = (
      <React.Fragment>
    
      <Routes>
        <Route 
        path="/package-managment" 
        exact
        element={<PackageManagment/>}
        />
        <Route 
        path="/" 
        element={<Home/>}/>
        <Route place="/*" element={<Navigate to="/" replace/>}/>
      </Routes>
      </React.Fragment>
    )

  }else{
    
    routes = (
      <Routes>
        <Route 
          path="/login" 
          element={<Auth />} />
        <Route path="/*" element={<Navigate to="/login" replace/>}/>
        
      </Routes>
    )
  }
  
  return (
    <AuthContext.Provider   
    value={{
      isLoggedIn: !!token,
      token: token,
      login: login,
      logout: logout
    }}>
      <BrowserRouter>
          <React.Fragment > 
          {token &&
          <div className="flex flex-col items-center">
           <Navbar className="navbar" navItems={[ {name:"Home",path:"/"},{name:"Package Managment", path:"/package-managment"},{name:"Logout", logout: logout}]}/>
          </div>}
          <main className="App">          
          {routes}
          </main>
          </React.Fragment>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
