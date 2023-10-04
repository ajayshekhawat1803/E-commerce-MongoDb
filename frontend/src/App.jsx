import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ShowData from './components/ShowData'
import AddProduct from './components/Admin/AddProduct'
import AdminComponents from './components/AdminComponents'
import AdminLogin from './components/AdminLogin'
import AdminSignup from './components/AdminSignup'
import Home from './components/Home'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import UserComponents from './components/UserComponents'
import AllProducts from './components/Admin/AllProducts'
import EditProduct from './components/Admin/EditProduct'
import AllUserProducts from './components/User/AllUserProducts'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<AdminComponents />}>
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/edit' element={<EditProduct/>} />
            <Route path='/edit/:id' element={<EditProduct/>} />
            <Route path='/delete' element={<h1>Delete Product</h1>} />
            <Route path='/allProducts' element={<AllProducts/>} />
          </Route>
          <Route element={<UserComponents/>}>
          <Route path='/allUserProducts' element={<AllUserProducts/>} />
          <Route path='/cart' element={<h1>This is cart</h1>} />

          </Route>
          <Route path='/' element={<Home />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/adminSignup' element={<AdminSignup />} />
          <Route path='/userLogin' element={<UserLogin />} />
          <Route path='/userSignUp' element={<UserSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
