
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Gallery from './Pages/Gallery/Gallery'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Users from './Pages/Users/Users'
import Saved from './Pages/Saved/Saved'

function App() {
 

  return (
    <div className='app-layout'>
     <Header/>
     <main className='app-content'>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/gallery' element={<Gallery/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/user' element={<Users/>}/>
     <Route path='/saved' element={<Saved/>}/>
     </Routes>
     </main>
     <Footer/>
    </div>
  )
}

export default App
