import { Box, Button, TextField } from "@mui/material"

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"


const Register = () => {
  const base=import.meta.env.VITE_BASE_API
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[confirmpassword,setConfirmpassword]=useState("")
  const[admin,setAdmin]=useState(false)
  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const res=await axios.post(`${base}/register`,{name,email,password,confirmpassword,admin})
      if(res.data.success) {
        toast.success(res.data.message)
        setName("")
        setEmail("")
        setPassword("")
        setConfirmpassword("")
        setAdmin(false)
      }else{
        toast.error("this email alredy register")
      }
    } catch (error) {
      if(error.message){
        toast.error("Please Enter valide data")
      }
    }
  }


  
  return (
  <>
    <form onSubmit={handleSubmit} className="w-96 h-full flex justify-center flex-col items-center gap-3 pb-6">
        <h1 className="font-semibold text-2xl">Register</h1>
    <TextField label="Name" value={name}  onChange={(e)=>setName(e.target.value)}/>
     <TextField type="email" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
     <TextField label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
     <TextField label="ConfirmPassword" value={confirmpassword}  onChange={(e)=>setConfirmpassword(e.target.value)}/>
     <div className="flex gap-x-3">
     <input type="checkbox" id="check" value={true}  onChange={(e)=>setAdmin(e.target.value)}/>
     <label htmlFor="check" className="cursor-pointer">is admin</label>
     </div>
     <Box className="w-[60%] mx-auto">
     <Button type="submit" variant="contained" color="success">Register</Button>
     </Box>


    </form>
  </>
  )
}

export default Register
