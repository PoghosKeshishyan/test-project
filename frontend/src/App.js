import { AuthContext } from "./context/AuthContext";
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export function App() {
  const { login, logout, token, userId, isReady, name, avatar } = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);

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
