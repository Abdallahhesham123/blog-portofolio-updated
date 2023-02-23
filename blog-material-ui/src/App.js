
import './App.css';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Layout from './components/Utility/Layout/Layout';
import Notfound from './components/Utility/NotFound/Notfound';
import Template from './components/Utility/Template/Template';
import SinglePost from './components/Home/Singlepost/SinglePost';
import Updatepost from './Pages/forms/Updatepost';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Addpost from './Pages/forms/Addpost';
import ProtectedRoute from './context/ProtectedRoute';
import Profile from './components/Profile/Profile.jsx';
import ProfileUpdate from './components/Profile/ProfileUpdate.jsx';
import Dashboard from './Pages/dashboard/Dashboard.jsx';
import Trashboard from './Pages/dashboard/Trashboard.jsx';
import PostsDash from './Pages/dashboard/PostsDash.jsx';
import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx';
function App() {
  let routes = createBrowserRouter([
  
    {path: "/", element: <Layout />,errorElement: <Notfound/>,children: [
      { index: true, element:<ProtectedRoute ><Template><Home/></Template></ProtectedRoute> },
      { path: "/add-post", element: <ProtectedRoute ><Template><Addpost/></Template></ProtectedRoute>  },
      { path: "/update-post/:id", element: <ProtectedRoute ><Template><Updatepost/></Template></ProtectedRoute>  },
      { path: "post/:id", element: <ProtectedRoute ><Template><SinglePost/></Template></ProtectedRoute>  },
      { path: "/profile/:id", element:<ProtectedRoute ><Template><Profile /></Template></ProtectedRoute>},
      { path: "/profile-update/:id", element:<ProtectedRoute ><Template><ProfileUpdate /></Template></ProtectedRoute>},
      { path: "/dashboard", element:<ProtectedRoute ><Template><Dashboard /></Template></ProtectedRoute>},
      { path: "/trashboard", element:<ProtectedRoute ><Template><Trashboard /></Template></ProtectedRoute>},
      { path: "/postsdash", element:<ProtectedRoute ><Template><PostsDash /></Template></ProtectedRoute>},
      { path: "/resetpassword/:id", element:<ProtectedRoute ><Template><ResetPassword /></Template></ProtectedRoute>},
     
      { path: "/register", element:  <Register/> },
      { path: "/login", element:  <Login/> },




    ]}

    ])
  return (
    <>
  <RouterProvider router={routes}/>

    </>
  );
}

export default App;
