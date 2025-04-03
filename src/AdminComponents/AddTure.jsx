/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, AvatarGroup, Button, CircularProgress, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"


const AddTure = ({open}) => {
  const base=import.meta.env.VITE_BASE_API

    const[name,setName]=useState("")
    const[des,setDes]=useState("")
    const[Ticketprice,setTicketprice]=useState("")
    const[state,setState]=useState("")
    const[loading,setLoading]=useState(false)

////handle Submit
const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    setLoading(true)
  
    const res=await axios.post(`${base}/Ture`,{name,des,Ticketprice,state},{
      headers:{
        'Content-Type':'multipart/form-data',
        Authorization:`Bearer ${localStorage.getItem('Ture')}`,
      },
    })
    console.log(res.data)
    if(res.data.success) {
      toast.success(res.data.message)
      setName("")
      setDes("")
      setTicketprice("")
      setState("")
      setLoading(false)
      open(false)
    } else {
      toast.error(res.data.message)
      setLoading(false)
    }
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

    // ///image choose
    // const handleimageChange=async(e)=>{
    //     const finalImage=[]
    //     for(let items of e.target.files){
    //       finalImage.push(items)
    //     }
    //     setfiles(finalImage)

    // }

  return (
    <div className="w-full h-full flex justify-center items-center">
         <form onSubmit={handleSubmit} className="w-96 h-fit flex flex-col gap-y-5 p-7 bg-white rounded shadow">
            <div>
                <button type="button" onClick={()=>open(false)} className="float-end">
                    x
                </button>
            </div>
         {/* name, des, Ticketprice, state  */}
         <TextField label="Name" sx={{p:".2rem"}} variant="standard" className="w-full" value={name} onChange={(e)=>setName(e.target.value)}/>

         <TextField label="Description" sx={{p:".2rem"}} variant="standard" value={des} className="w-full" onChange={(e)=>setDes(e.target.value)}/>

         <TextField label="State" sx={{p:".2rem"}} variant="standard" className="w-full" value={state} onChange={(e)=>setState(e.target.value)}/>

         <TextField value={Ticketprice} label="Ticket_price" sx={{p:".2rem"}} variant="standard" className="w-full" onChange={(e)=>setTicketprice(e.target.value)}/>
    {/* <AvatarGroup max={5}>
  

    {
      files?.map((img,i)=>(
        <Avatar key={i} alt="Remy Sharp" src={URL.createObjectURL(img)} />
      ))
    }

</AvatarGroup> */}
  
{loading?<CircularProgress />:<Button  type="submit" variant="contained">Save</Button>}
         </form>
    </div>
  )
}

export default AddTure
