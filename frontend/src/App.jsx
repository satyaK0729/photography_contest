import { Suspense, useState } from 'react'
import './App.css'
import Providers from './redux/Providers'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Register from './screens/Register'
import Error from './screens/Error'
import Singin from './screens/Singin'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import Contests from './screens/Contests'
import Profile from './screens/Profile'
import CreateContest from './screens/CreateContest'
import ContestDetail from './screens/ContestDetail'
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <Providers>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
          <Navbar />

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Singin />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/contests" element={<Contests />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/create-contest" element={<CreateContest />} />
              <Route exact path="/contest/:id" element={<ContestDetail />} />

              <Route exact path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
        <ToastContainer />
      </Providers>
    </>
  )
}

export default App
