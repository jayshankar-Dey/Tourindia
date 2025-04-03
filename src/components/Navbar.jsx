import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Dialog } from "@mui/material"
import Login from "./Login"
import Register from "./Register"
import { loginFalse, loginTrue } from "../redux/LoginSlice"
// import MenuBar from "./MenuBar"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {setUser} from '../redux/UserSlice'
import axios from "axios"
const Navbar = () => {
  const navigate=useNavigate()
  
  const[menu,setMenu]=useState(false)
  const[scrool,setScrool]=useState(false)
  const {socket}=useSelector(state=>state.socket)
  const {user}=useSelector(state=>state.user)
  const[change,setChange] = useState("")
   const base=import.meta.env.VITE_BASE_API
  const dispatch=useDispatch()
  const[logintrue,setLoginTrue]=useState(true)
  const [open, setOpen] = useState(false)
  const[notices,setNotices] = useState([])
  const {isLogin}=useSelector((state)=>state.isLogin)
  const[totalNotices,setTotalNotices] = useState(0)
  window.addEventListener("scroll",()=>{
    setScrool(window.scrollY>50)
  })
const[I,setI]=useState(0)
const login=[
  "Login",
  "Register"
]
//get Notification
const getNotification=async()=>{
  const res=await axios.get(`${base}/Notice`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("Ture")}`
    }
  })
  setNotices(res.data.Notic)
 setTotalNotices(res.data.total)
  //console.log("Notification get ............................",res.data)
  
}

useEffect(() => {
  socket.on("Notify_Users",data=>{
    //console.log("Notification Received ............................",data)
    toast.success("Notification Received")
   setChange(data)
  
  })
  return () => {
   socket.off()
  };
}, [])

useEffect(()=>{
  getNotification()
},[change])

/// seen Notification
const SeenNotification=async()=>{
  try {
    const res=await axios.put(`${base}/Notice`,{},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("Ture")}`
      }
    })
    setChange(res.data)
    //toast.success("Notification seen successfully")
  } catch (error) {
    console.log(error)
    toast.error("Failed to see notification")
  }
}



  return (
    <>
     <nav className={`flex duration-500 h-[4.5rem] ${scrool?"fixed w-screen top-0 left-0 z-30":"relative"}  items-center justify-between p-4 bg-white shadow-md`}>
   <div className="flex items-center">
    <h2 className="sm:text-xl md:mr-2 text-blue-600"><ion-icon name="logo-stackoverflow"></ion-icon></h2>
    <span className="sm:text-xl font-bold text-blue-600">
    TOURINDIA
    </span>
   </div>
   <div className="hidden lg:flex  space-x-8">
       <a href="#Home" className="text-gray-600 hover:text-gray-800">Home</a>
         <a href="#About" className="text-gray-600 hover:text-gray-800">About</a>
         <a href="#Ture" className="text-gray-600 hover:text-gray-800">Tour</a>
         <Link to={'/blog'} className="text-gray-600 hover:text-gray-800">Blogs</Link>
         <Link to={'/galery'} className="text-gray-600 hover:text-gray-800">Gallery</Link>
         <a href="#Contact" className="text-gray-600 hover:text-gray-800">Contact</a>
   </div>

   <button onClick={()=>setMenu(!menu)} className="text-xl lg:hidden block">{menu?<ion-icon name="close-outline"></ion-icon>:<ion-icon name="reorder-two-outline"></ion-icon>}</button>

   
   {/* /// */}
 <div className="w-fit pr-6 h-full flex md:gap-x-3 gap-x-2 justify-center items-center">
     
       
     { localStorage.getItem("Ture")&&<Link to={"/admin"} className="px-3 py-1 sm:py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Admin</Link>}
         
 {
          localStorage.getItem("Ture")&&<Link to={"/update/profile"} className="md:text-xl text-blue-900"><ion-icon name="person-outline"></ion-icon></Link>
  }
       
        <button onClick={()=>{
           setOpen(!open)
           SeenNotification()
           }} className="relative md:text-xl text-blue-800">
           <h3><ion-icon name="notifications-outline"></ion-icon></h3>
           <p className="absolute top-4 text-green-700 font-semibold left-[.5rem] rounded-full text-[13px]">{totalNotices}</p>
           <div className={`absolute ${open?"translate-y-0":"-translate-y-[100rem]"}  -left-52 z-30 w-72 top-12 rounded shadow-lg shadow-zinc-500 max-h-96 h-fit bg-green-100 flex duration-300 flex-col gap-y-2 overflow-scroll p-2`}>
             
             {/* ///notofication */}
            
            {
            notices?.map((notice,i)=>(
             <div key={i} className="p-2 text-sm flex  gap-x-5  bg-white shadow border ">
                <h1><ion-icon name="notifications"></ion-icon></h1>
                <div className="text-left">
                {
                 notice.admin?<h1 className=" font-semibold underline">Admin reply</h1>:<h1 className=" font-semibold underline">{notice.userId.name}</h1>
                }
                <h1>{notice.notic}</h1>
                </div>
             </div>
            ))
            }
            {
             notices?.length==0&&<h1 className="text-sm text-center">No Notification</h1>
  
            }
 
 
            
 
           </div>
          </button>
          <Link className=" tpx-3 font-semibold p-1 " to={'/like'}><ion-icon name="heart"></ion-icon></Link>
 
          <Link to={"/order/ture"} className="md:text-xl text-blue-900"><ion-icon name="bag-outline"></ion-icon></Link>
 
          {
           localStorage.getItem("Ture")?<button onClick={()=>{
             localStorage.removeItem("Ture");
             localStorage.removeItem("id");
             toast.success("logout Succesfully")
             dispatch(setUser(null))
             navigate('/')
             localStorage.removeItem("yes")
           }}  className="md:text-xl text-blue-900"><ion-icon name="log-out-outline"></ion-icon></button>:<button onClick={()=>dispatch(loginTrue())} className="md:text-xl text-blue-900"><ion-icon name="log-in-outline"></ion-icon></button>
          }
          
       </div> 

{/* /////model */}
       <Dialog open={isLogin} onClose={()=>dispatch(loginFalse())}>
          
      <div  className="bg-[#ffffff9f]  h-fit flex flex-col justify-center items-center">
         <div className="w-fit md:w-full h-12 p-1 border-b-2 flex gap-x-2 justify-center items-center bg-gray-50">
          {
            login.map((data,i)=>(
              <button onClick={()=>{
                i==0&&setLoginTrue(true)
                i==1&&setLoginTrue(false)
                setI(i)
              }
              } className={`border w-20 p-1 rounded shadow ${I==i&&"bg-blue-500 text-white font-semibold"}`} key={i}>{data}</button>
            ))
          }
        </div>
      {
        logintrue?<Login/>:<Register/>
      }
      </div>

      </Dialog>
    {/* /////model */}

   {/* ///// */}

   <div className={`flex absolute z-30 duration-300 overflow-hidden  ${menu?"h-[21rem]":"h-0 "} border-t-2 bg-white w-screen justify-center top-[4.4rem] -left-0 *:w-full *:p-4  *:justify-center *:flex *:items-center flex-col lg:hidden *:duration-300 `}>
      <a href="#Home" className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">Home</a>
         <a href="#About" className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">About</a>
         <a href="#Ture" className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">Tour</a>
         <Link to={'/blog'} className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">Blogs</Link>
         <Link to={'/galery'} className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">Gallery</Link>
         <a href="#Contact" className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">Contact</a>
   </div>
  </nav>

    </>
  )
}

export default Navbar

// className={`flex absolute z-30 duration-300 overflow-hidden  ${menu?"h-[21rem]":"h-0 "} border-t-2 bg-white w-screen justify-center top-[4.4rem] -left-0 *:w-full *:p-4  *:justify-center *:flex *:items-center flex-col lg:hidden *:duration-300 `}