import { Container } from "@mui/material"
import Nav_bar from "../components/Nav_bar"
import { useEffect, useState } from "react"
import axios from "axios"
import Ture_Card from "../components/Ture_Card"


const LikeTour = () => {
     const base=import.meta.env.VITE_BASE_API
     const[tour,setTour]=useState([])

      ///get user information
    const getuserDetailes=async()=>{
        const res=await axios.get(`${base}/getLikeTour`,{
          headers:{
              Authorization:`Bearer ${localStorage.getItem('Ture')}`,
          }
        })
       
        
       
        setTour(res.data.data.Like)
      }
      useEffect(()=>{
         getuserDetailes()
      },[])
     // console.log(tour)
  
  return (
    <>

    <Nav_bar/>

    <div className="h-[93vh] bg-zinc-200 overflow-scroll">
        <Container>
             <div>
                <div className="flex justify-center items-center p-3 font-semibold text-2xl">
                    <h1 className="text-sm">likes Tour</h1>
                </div>
                <div className="flex justify-center flex-wrap gap-x-2">

                {
               tour.length===0?<h1 className="text-xl text-red-400 animate-bounce">No like such found...</h1> : tour.map((t,i)=><Ture_Card key={i} ture={t}/>)
         }

                </div>
             </div>
        </Container>
    </div>
      
    </>
  )
}

export default LikeTour
