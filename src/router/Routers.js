import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResulList from '../pages/SearchResultsList'
import ThankYou from '../pages/ThankYou'
import AboutUs from '../pages/About'
import TourGuide from '../pages/TourGuide'
import Vehicals from '../pages/Vehicals'
import Customization from '../pages/Customization'
import EmailForm from '../shared/EmailForm'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to ='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/tours/search' element={<SearchResulList/>} />
        <Route path='/tourGuide' element={<TourGuide />} />
        <Route path='/vehicals' element={<Vehicals />} />
        <Route path='/customization' element={<Customization />} />
        <Route path='/email' element={<EmailForm />} />
       
    </Routes>
  )
}

export default Router