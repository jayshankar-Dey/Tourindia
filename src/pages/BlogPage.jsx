import { Container } from "@mui/material"
import Navbar from "../components/Nav_bar"
import { useEffect, useState } from "react"
import axios from "axios"
import BlogeCard from "../components/BlogeCard"


const BlogPage = () => {
   const base=import.meta.env.VITE_BASE_API
     const[state,setState]=useState("")
     const[place,setPlace]=useState("")
     const[Blog,setBlog]=useState([])
    

     ////get blog
   useEffect(() => {
    const fetchData=async()=>{
      try {
       const res =await axios.get(`${base}/getBlog?name=${place}&state=${state}`,{
          headers:{
              Authorization:`Bearer ${localStorage.getItem("Ture")}`,
          }
       })
        setBlog(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [place,state])
  return (
    <>
      <Navbar/>
       <div className="h-[110vh] bg-zinc-200 overflow-scroll">
           <Container>

           <div className=" mx-auto p-2 flex border mt-3  shadow overflow-x-scroll justify-center items-center gap-x-2 bg-white md:w-[50rem] sm:flex-row flex-col rounded">
        <input type="text" className=" w-full  px-3 outline-none border h-12 " placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} />
        <input type="text" className=" w-full  px-3 outline-none border h-12 " placeholder="Place"value={place} onChange={(e)=>setPlace(e.target.value)}/>
        <button className="text-2xl  px-14 text-white h-12 rounded  bg-blue-500"><ion-icon name="search-outline"></ion-icon></button>
       </div>

            {/* ///Bloge part */}
{Blog.length !==0 &&<div id="Blog" className=" ">

<div className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-3xl text-2xl  "> 
   
 </div>
<div className="lg:w-[80%] justify-center flex flex-wrap gap-x-4 p-3  mx-auto">
 {
   Blog.map((data,i)=>(
     <BlogeCard key={i} blog={data}/>
   ))
 }
 {
   Blog.length==0&& <h1>No blog found..</h1>
 }
 </div>

</div>}

           
           </Container>
       </div>
    </>
  )
}

export default BlogPage
