import logo from './logo.svg';
import './App.css';
import {useState, useCallback} from 'react';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import PackageManagment from './pages/PackageManagement/PackageManagment';
import {BrowserRouter, Route, Switch}  from 'react-router-dom';
import AuthContext from './context/auth/auth-context';

function App() {
  let routes;
  const [token,setToken]= useState()
  const login =useCallback((toke)=>{
    setToken(toke)
  },[])
  const logout = useCallback(()=>{
    setToken(null);
  },[])
  
  // if (token){
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //         <Home/>
  //       </Route>
  //       <Route path="/package-managment" exact>
  //         <PackageManagment/>
  //       </Route>
  //       <Redirect to="/"/>
  //     </Switch>
  //   )

  // }else{
  //   routes = (
  //     <Switch>
  //       <Route path="/auth" exact>
  //         <Auth />
  //       </Route>
  //       <Redirect to="/auth"/>
  //     </Switch>
  //   )
  // }

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
            {/* {routes} */}
            <Auth />
          </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
