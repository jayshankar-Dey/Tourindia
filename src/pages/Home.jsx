/* eslint-disable no-unused-vars */

import axios from "axios"
import About from "../components/About"
import BlogeCard from "../components/BlogeCard"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Galery_Card from "../components/Galery_Card"
import Navbar from "../components/Navbar"
import Slider from "../components/Slider"
import Ture_Card from "../components/Ture_Card"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"




const Home = () => {
 const base=import.meta.env.VITE_BASE_API
  const[loading,setLoading]=useState(false)
  const[ture,setTure]=useState([])
  const[state,setState]=useState("")
  const[place,setPlace]=useState("")
  const[about,setAbout]=useState([])
 const[change,setChange]=useState("")
  ///getTurisim
  const getTure=async()=>{
    setLoading(true)
    const res=await axios.get(`${base}/Ture?name=${place}&state=${state}`)
    try {
      if(res.data.success){
        setTure(res.data.data)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Server Error")
    }
    setLoading(false)
  }

   
  useEffect(() => {
     getTure()
  }, [place,state,change])

   
  ///get about
  const getAbout=async()=>{
    try {
      setLoading(true)
      const res=await axios.get(`${base}/getAbout`)
     setAbout(res.data.data[0])
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
      getAbout()
  }, [])

  
    


  return (
    <div className="p-0 m-0 bg-[#f8e9d73e]">
    <section id="Home">
    <Navbar/>
    <Slider/>
    </section>
    
    <section id="Ture" className="  ">
     
      <div className=" mx-auto p-2 flex border mt-3  shadow overflow-x-scroll justify-center items-center gap-x-2 bg-white md:w-[50rem] sm:flex-row flex-col rounded">
        <input type="text" className=" w-full  px-3 outline-none border h-12 " placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} />
        <input type="text" className=" w-full  px-3 outline-none border h-12 " placeholder="Place"value={place} onChange={(e)=>setPlace(e.target.value)}/>
        <button className="text-2xl  px-14 text-white h-12 rounded  bg-blue-500"><ion-icon name="search-outline"></ion-icon></button>
      </div>

    </section>
 
{/* ///ture part */}
<section  className=" ">
  
   <div className="flex justify-center text-zinc-600 p-2  items-center font-bold md:text-3xl text-2xl  "> 
      <h1> Tour</h1>
    </div>
   <div className="lg:w-[80%]   justify-center flex flex-wrap gap-x-4 p-3 w-full mx-auto">
    {
      ture.length===0?<h1 className="text-2xl text-blue-400 animate-bounce">No data found....</h1> : ture.map((t,i)=><Ture_Card key={i} ture={t}/>)
    }
    </div>
 
   </section>


 


    

    {/* ///about section   */}
    <section id="About" className="">
    <div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-3xl text-2xl   flex-col"> 
      <h1> About</h1>

    </div>
   <div className="lg:w-[80%]  flex   p-3  mx-auto">
   <About About={about}/>
    </div>
   </section>

  

{/* ///contact part */}
<section id="Contact" className=" ">
    <div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-4xl text-2xl  *:underline flex-col"> 
      <h1> Contact Section</h1>
      <p className="text-sm font-thin my-2">Contact us for more serivices </p>
    </div>
   <div className="lg:w-[80%]  flex flex-wrap   p-3  mx-auto">
    <Contact/>
    </div>
   </section>

   <Footer/>
    </div>
  )
}

export default Home
