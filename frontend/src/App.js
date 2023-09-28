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
      <Navbar navItems={[{name:"Package Managment", path:"/package-managment"}, {name:"Home",path:"/"}]}/>
      <Routes>
        <Route 
        path="/package-managment" 
        exact
        element={<PackageManagment/>}
        />
        <Route 
        path="/" 
        element={<Home/>}/>
        <Route place="*" element={<Navigate to="/" replace/>}/>
      </Routes>
      </React.Fragment>
    )

  }else{
    
    routes = (
      <Routes>
        <Route 
          path="/login" 
          element={<Auth />} />
        <Route path="*" element={<Navigate to="/login" />}/>
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
          <main>
            {routes}
          </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
