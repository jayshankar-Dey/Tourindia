import { Button, CircularProgress, Container, TextField } from "@mui/material"
import Navbar from "../components/Nav_bar"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Galery_Card from "../components/Galery_Card"


const GaleryPage = () => {
   const base=import.meta.env.VITE_BASE_API
   const[loading,setLoading]=useState(false)
   const[loading1,setLoading1]=useState(false)
  const[state,setState]=useState("")

  const[Galery,setGalery]=useState([])

  const[file,setFile]=useState("")
  const[prevew,setPrevew]=useState("")
 const[change,setChange]=useState("")
  
   ///get galery
     const getGalery=async()=>{
      setLoading(true)
      try {
         const res= await axios.get(`${base}/galeryImage?state=${state}`,{
              headers:{
                  Authorization:`Bearer ${localStorage.getItem("Ture")}`,
              },
          })
          setGalery(res.data.data)
          setLoading(false)
      } catch (error) {
          console.log(error)
          setLoading(false)
      }
  }
  
    useEffect(() => {
       getGalery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [change,state])


    ///add galery
    const addGalery=async(e)=>{
      e.preventDefault()
      const formdata=new FormData()
      formdata.append("file",file)
      formdata.append("state",state)
     
      try {
         
          setLoading1(true)
       const res= await axios.post(`${base}/galeryImage`,formdata,{
              headers:{
                  'Content-Type':'multipart/form-data',
                  Authorization:`Bearer ${localStorage.getItem("Ture")}`,
              },
          })
          toast.success("Galery added successfully")
          setChange(res.data)
          setFile("")
          setState("")
          setPrevew("")
          setLoading1(false)
      } catch (error) {
          toast.error("Failed to add galery")
          setLoading1(false)
      }
  }

  return (
    <>
  <Navbar/>
       <div className="h-[110vh] bg-zinc-200 overflow-scroll">
           <Container>
            {/* ///Galery part */}
<section id="Galery" className=" ">
<section id="#Galery" className="flex justify-center text-zinc-600 p-3  items-center font-bold md:text-4xl text-2xl  *:underline flex-col"> 

     

      <form onSubmit={addGalery} className="bg-white justify-center items-center md:p-0 p-2   *:w-fit t gap-y-3 flex gap-x-3 w-96   md:flex-row flex-col border rounded-xl shadow">
             <TextField size="small" value={state} label="State" onChange={(e)=>setState(e.target.value)}/>
              <label htmlFor="file"><ion-icon name="image-outline"></ion-icon></label>
             <TextField type="file" size="small" sx={{display:"none"}} id="file" onChange={(e)=>{
                setFile(e.target.files[0])
                setPrevew(URL.createObjectURL(e.target.files[0]))
                }} />
             <div className=" h-16">
             {prevew&&<img src={prevew} alt="" className="h-full w-full object-cover object-center" />}
             </div>
            <div  className="flex justify-center items-center" >
           {
            loading1?<CircularProgress/>:<Button type="submit" variant="contained"><ion-icon name="cloud-upload-outline"></ion-icon></Button>
           }
            </div>
        </form>

    </section>
   <div className="flex flex-wrap justify-center ">
  <div>
    {
      Galery?.length==0&& <h1>No result found</h1>
    }
  </div>
  {
    loading? <h1><CircularProgress/></h1> : Galery.map((g,i)=><Galery_Card key={i} galery={g}/>)
  }
    </div>
   </section>

           
           </Container>
       </div>
    </>
  )
}

export default GaleryPage
