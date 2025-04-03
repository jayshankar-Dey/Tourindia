/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, CircularProgress, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const UpdateTure = ({open,id}) => {
  const base=import.meta.env.VITE_BASE_API
  
    const[name,setName]=useState("")
    const[Ticketprice,setTicketprice]=useState("")
    const[state,setState]=useState("")
    const[loading,setLoading]=useState(false)


    
  //get gingle Ture
  const getTure = async () => {

    try {
      const response = await axios.get(`${base}/Ture/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Ture"),
          },
      });
      setName(response.data.data[0].name)
      setState(response.data.data[0].state)
      setTicketprice(response.data.data[0].Ticketprice)
    } catch (error) {
      toast.error("Error getting ture");
    }
  };

////update Submit
const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    setLoading(true)
  
   const res=await axios.post(`${base}/update/${id}`,{name,state,Ticketprice},{
    headers:{
        Authorization:"Bearer " + localStorage.getItem("Ture"),
    }
   })
    console.log(res.data)
    if(res.data.success) {
      toast.success(res.data.message)
      setName("")
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

useEffect(() => {
    getTure()
  }, [id])
  return (
    <div className="w-full h-full flex justify-center items-center">
         <form onSubmit={handleSubmit} className="w-96 h-fit flex flex-col gap-y-5 p-7 bg-white rounded shadow">
            <div>
                <button type="button" onClick={()=>open(false)} className="float-end">
                    x
                </button>
            </div>
         {/* name, des, Ticketprice, state  */}
         <TextField  label="Name" sx={{p:".2rem"}} variant="standard" className="w-full" value={name} onChange={(e)=>setName(e.target.value)}/>

        

         <TextField label="State" sx={{p:".2rem"}} variant="standard" className="w-full" value={state} onChange={(e)=>setState(e.target.value)}/>

         <TextField value={Ticketprice} label="Ticket_price" sx={{p:".2rem"}} variant="standard" className="w-full" onChange={(e)=>setTicketprice(e.target.value)}/>
  
{loading?<CircularProgress />:<Button  type="submit" variant="contained">Update</Button>}
         </form>
    </div>
  )
}

export default UpdateTure
