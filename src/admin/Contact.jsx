import { Container } from "@mui/material"
import Navbar from "../AdminComponents/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"


const Contact = () => {
    const base=import.meta.env.VITE_BASE_API
    const[contact,setContact]=useState([])

    useEffect(()=>{
        const getContact = async () => {
            const res = await axios.get(`${base}/getContact`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Ture")}`,
                },
 
            })
            setContact(res.data.data)
        }
        getContact()
    },[])
  return (
    <>
    <Navbar/>

   <div className="h-[93vh] bg-zinc-200">
   <Container>
        <div className="p-2">
                 {
                     contact.map((item)=>(
                         <div key={item._id} className="flex gap-x-5 justify-center items-center md:w-[40rem]  *:p-4 bg-white rounded mt-3 shadow border">
                             <div>
                             <h1>{item.name}</h1>
                             <h1>{item.email}</h1>
                             <h1>{item.phone}</h1>
                             </div>
                             <div>
                             <h1>{item.subject}</h1>
                             <h1>{item.message}</h1>
                             </div>
                         </div>
                     ))
                 }
        </div>
    </Container>
   </div>
      
    </>
  )
}

export default Contact
