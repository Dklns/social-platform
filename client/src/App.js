import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './style.scss'
import Login from './pages/login/login';
import Register from './pages/register/register';
import NavBar from './components/navBar/navBar';
import LeftBar from './components/leftBar/leftBar';
import RightBar from './components/rightBar/rightBar';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <NavBar />
          <div style={{ display: 'flex' }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoute>
        <Layout />
      </ProtectRoute>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile/:id',
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;