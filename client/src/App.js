import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import './App.css';
import OTPPage from './pages/OTP';
import Login from './pages/login';
import BlogUploadPage from './pages/BlogUploadPage';
import Profile from './pages/Profile';
import { useState } from 'react';
import GetBlog from './pages/GetBlog';
import Category from './pages/Category';
import PrivateRoute from './components/PrivateRoute';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (

    <Routes>
      <Route path='/' element={<Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></Home>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/otp' element={<OTPPage></OTPPage>}></Route>
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} ></Login>}></Route>
      <Route path='/blogUpload' element={<PrivateRoute isLoggedIn={isLoggedIn}><BlogUploadPage></BlogUploadPage></PrivateRoute>}></Route>
      <Route path='/profile' element={<PrivateRoute isLoggedIn={isLoggedIn}><Profile></Profile></PrivateRoute>}></Route>
      <Route path='/getBlog/:id' element={<PrivateRoute isLoggedIn={isLoggedIn}><GetBlog></GetBlog></PrivateRoute>}></Route>
      <Route path='/category/:name/:id' element={<PrivateRoute isLoggedIn={isLoggedIn}><Category></Category></PrivateRoute>}></Route>
    </Routes>
  );
}

export default App;
