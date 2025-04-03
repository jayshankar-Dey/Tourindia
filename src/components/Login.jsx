import { Box, Button, TextField } from "@mui/material"
import google from "../assets/eeccca0750dc564ea55c897f90f4fb99.png"
import {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import { loginFalse, loginTrue } from "../redux/LoginSlice"
import app from '../Firebase'
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
//import { useNavigate } from "react-router-dom"
const Login = () => {
//const navigate=useNavigate()
const base=import.meta.env.VITE_BASE_API
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const dispatch=useDispatch()
const navigate=useNavigate()

////login
const handleLogin=async(e)=>{
e.preventDefault()
 const res=await axios.post(`${base}/login`,{email,password})
 try {
  if(res.data.success){
    console.log(res.data.data.token)
    toast.success(res.data.message)
    localStorage.setItem("Ture",res.data.data.token)
    localStorage.setItem("id",res.data.data.id)
    dispatch(loginFalse())

    navigate(`${window.location.pathname}`)
   }else{
    toast.error(res.data.message)
    dispatch(loginTrue())
   }
 } catch (error) {
  console.log(error)
  toast.error("Please Enter valide email and password")
    dispatch(loginTrue())
 }
}

///login with google//////
  const LoginWithGoole=async()=>{
   const auth=getAuth(app);
   const provider=new GoogleAuthProvider()
   await signInWithPopup(auth,provider).then(async (data)=>{
   const name= data.user.displayName
   const email= data.user.email
   const res=await axios.post(`${base}/google_auth`,{name,email})
   
   if(res.data.success){
    toast.success(res.data.message)
    localStorage.setItem("Ture",res.data.data.token)
    localStorage.setItem("id",res.data.data.id)
    dispatch(loginFalse())
  
   }else{
    toast.error(res.data.message)
    dispatch(loginTrue())
   }
   })
   .catch((err)=>console.log(err))
  }
  return (
    <form onSubmit={handleLogin} className="w-96 pb-6 h-full flex justify-center flex-col items-center gap-3">
        <h1 className="font-semibold text-2xl">Login</h1>
        <TextField type="email" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <TextField type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
     <Box className="w-[60%] mx-auto">
     <Button type="submit" variant="contained" color="success">Login</Button>
     </Box>
       <div className="flex justify-center gap-3 items-center">
        <span className="h-[.1rem] bg-gray-600 w-20"></span>
        <span>OR</span>
        <span className="h-[.1rem] bg-gray-600 w-20"></span>
       </div>


     <Box  className="w-[80%] shadow-lg cursor-pointer mx-auto  p-1 relative overflow-hidden h-[2.8rem] rounded-md hover:shadow-green-700">
       <div className="absolute bg-green-500 w-[170%] -left-10 z-20 h-44 duration-300 animate-spin">
       </div>
       <button type="button" onClick={LoginWithGoole} className="flex rounded-md absolute top-[.2rem] left-[.15rem] hover:h-full hover:w-full hover:left-0 hover:top-0 duration-500  z-40 bg-zinc-600 justify-between items-center border w-full p-1">
       <img src={google} alt=""  className="h-7 ml-2 "/>
       <h1 className="font-semibold text-white mr-7 ">Login and register with Google</h1>
       </button>
     </Box>
    </form>
  )
}

export default Login
