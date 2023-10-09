import { AuthContext } from "./context/AuthContext";
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
// import { useEffect } from "react";

export function App() {
  const { login, logout, token, userId, isReady, name, avatar } = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);

  // useEffect(() =>{
  //   window.addEventListener('click', function () {
  //     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //       // пользователь использует мобильное устройство
  //       document.documentElement.requestFullscreen();
  //     } 
  //   })
  // }, [])

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin, name, avatar }}>
      <div className='App'>
        {isLogin && <Header />}
        {routes}
        {isLogin && <Footer />}
      </div>
    </AuthContext.Provider>
  )
}
