import { lazy, useState } from "react"
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
const Home = lazy(()=>import("./pages/Home"))
import AdminHome from "./admin/Home"
//import Admin from  "../src/admin/Home"

const Single_Ture = lazy(()=>import("./pages/Single_Ture"))
const BookShow = lazy(()=>import("./pages/BookShow"))
import { Toaster } from 'react-hot-toast';
const UpdateProfile = lazy(()=>import("./components/UpdateProfile"));
const Show_Single_Book = lazy(()=>import("./pages/Show_Single_Book"))
const AddBlog = lazy(()=>import("./admin/AddBlog"))
import AddGalery from "./admin/AddGalery"
import About from "./admin/About"
import Contact from "./admin/Contact"
import Chat from "./admin/Chat"
import {io} from 'socket.io-client'
import { useDispatch } from "react-redux"
import { setSocket } from "./redux/SocketSlice"
const LikeTour = lazy(()=>import("./pages/LikeTour"))
const Tour = lazy(()=>import("./pages/Tour"))
const Abouts = lazy(()=>import("./pages/About"))
import { useEffect } from "react"
import axios from "axios"
import {setUser} from './redux/UserSlice'
import ProtectedRoute from './ProtectedRoute'
import { Suspense } from "react"
import Loading from "./components/Loading"

const Galery=lazy(()=>import('./pages/GaleryPage'))
const Blogs=lazy(()=>import('./pages/BlogPage'))

const App = () => {
 
   const base=import.meta.env.VITE_BASE_API
   
  const dispatch=useDispatch()
  dispatch(setSocket(io(import.meta.env.VITE_MAIN_URL)))
 
  useEffect(() => {
  const getLoginUser=async()=>{
   try {
    const res=await axios.get(`${base}/getUserdetailes`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem('Ture')}`,
      }
    })
    const data=res.data.data
 
    dispatch(setUser(data))
   
   } catch (error) {
    console.log(error)
   }
  }

  if(localStorage.getItem('Ture') !==undefined && localStorage.getItem('Ture') !== null){
    getLoginUser()
  }
  }, [])

 
  return (
    <BrowserRouter>
    <Toaster/>
   
    <Suspense fallback={<Loading/>}>

     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/single/ture/:id" element={<Single_Ture />} />
       <Route path="/order/ture" element={<BookShow />} />
       <Route path="/update/profile" element={<UpdateProfile />} />
       <Route path="/single/Book/:id" element={<Show_Single_Book />} />
       <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
       <Route path="/admin/galery" element={<AddGalery />} />
       <Route path="/admin/Blog" element={<AddBlog />} />
       <Route path="/admin/about" element={<About />} />
       <Route path="/admin/contact" element={<Contact />} />
       <Route path="/admin/chat" element={<Chat />} />
       <Route path="/like" element={<LikeTour />} />
       <Route path="/tour" element={<Tour />} />
       <Route path="/about" element={<Abouts />} />
       <Route path="/galery" element={<Galery />} />
       <Route path="/blog" element={<Blogs />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
