import { createBrowserRouter, 
  RouterProvider,
  Outlet,
  json,
  redirect
} from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/home/home";
import NavBar from "./components/navBar/navBar";
import LeftBar from "./components/leftBar/leftBar";
import RightBar from "./components/rightBar/rightBar";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import './index.scss';
import { DarkModeContext } from "./context/darkModeContext";

export default function App() {
    const {darkMode} = useContext(DarkModeContext);

    function loader() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null ;
      if(currentUser === null ) {
        console.log('test');
        return redirect('/login');
      }
      return json(currentUser)
    }

  const Layout = () => {
    return (
      <div className={`app theme-${darkMode ? 'dark' : 'light'}`}>
        <NavBar/>
        <div >
        <div style={{ display: 'flex' }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </div>
    )
  }

   const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      loader: loader,
      children: [
        {
          index: true,
          element: <Home/>
        }
      ]
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/login/:username?',
      element: <Login/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}