import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Dialog } from "@mui/material"
import Login from "./Login"
import Register from "./Register"
import { loginFalse, loginTrue } from "../redux/LoginSlice"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { setUser } from "../redux/UserSlice"

const Nav_bar = () => {
  const navigate=useNavigate()
  
  const[scrool,setScrool]=useState(false)
  const {socket}=useSelector(state=>state.socket)
  const dispatch=useDispatch()
  const[logintrue,setLoginTrue]=useState(true)
  const {isLogin}=useSelector((state)=>state.isLogin)
  window.addEventListener("scroll",()=>{
    setScrool(window.scrollY>20)
  })
const[I,setI]=useState(0)
const login=[
  "Login",
  "Register"
]


useEffect(() => {
  // eslint-disable-next-line no-unused-vars
  socket.on("Notify_Users",data=>{
    toast.success("Notification Received")
  })
  return () => {
   socket.off()
  };
}, [])

  return (
    <>
    <nav className={`flex duration-500 h-[4.5rem] ${scrool?"fixed w-screen top-0 left-0 z-30":"relative"}  items-center justify-between p-4 bg-white shadow-md`}>
  <div className="flex items-center">
   <h2 className="sm:text-xl md:mr-2 text-blue-600"><ion-icon name="logo-stackoverflow"></ion-icon></h2>
   <span className="sm:text-xl font-bold text-blue-600">
   TOURINDIA
   </span>
  </div>
  
  
  {/* /// */}
<div className="w-fit pr-6 h-full flex md:gap-x-3 gap-x-2 justify-center items-center">
    
   <Link to={'/'} className="md:text-xl"><ion-icon name="home"></ion-icon></Link>
        
{
         localStorage.getItem("Ture")&&<Link to={"/update/profile"} className="md:text-xl text-blue-900"><ion-icon name="person-outline"></ion-icon></Link>
 }
      
     
         <Link className=" tpx-3 font-semibold p-1 " to={'/like'}><ion-icon name="heart"></ion-icon></Link>

         <Link to={"/order/ture"} className="md:text-xl text-blue-900"><ion-icon name="bag-outline"></ion-icon></Link>

         {
          localStorage.getItem("Ture")?<button onClick={()=>{
            localStorage.removeItem("Ture");
            localStorage.removeItem("id");
            toast.success("logout Succesfully")
             dispatch(setUser(null))
            navigate(`${window.location.pathname}`)
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

 </nav>

   </>
  )
}

export default Nav_bar

