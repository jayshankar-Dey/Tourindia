import { Button, CircularProgress, Container, Dialog, TextField } from "@mui/material"
import Navbar from "../AdminComponents/Navbar"
import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import Update_About from "../AdminComponents/Update_About";


const About = () => {
  const base = import.meta.env.VITE_BASE_API
  const[open,setOpen]=useState(false)
  const [name,setName]=useState("")
  const [des,setDes]=useState("")
  const [file,setfiles]=useState("")
  const [Prevew,setPrevew]=useState("")
  const [loading,setLoading]=useState(false)
  const [about,setAbout]=useState([])
  const[change,setChange]=useState(" ")
  const[id,setId]=useState("")
  const[deletePopup,setDeletePopup]=useState(false)
  const[updatePopup,setUpdatePopup]=useState(false)
  const[data,setData]=useState({})
///add About
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData();
    formdata.append("file",file)
    formdata.append("name",name)
    formdata.append("des",des)
    try {
      setLoading(true)
      const res=await axios.post(`${base}/addAbout`,formdata,{
        headers:{
          'Content-Type':'multipart/form-data',
          Authorization:`Bearer ${localStorage.getItem("Ture")}`,
        },
      })
     // console.log(res.data)
      setLoading(false)
      setChange(res.data)
      toast.success(res.data.message)
      setName("")
      setDes("")
      setfiles("")
      setPrevew("")
      setOpen(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
     
  }

  ///get about
  const getAbout=async()=>{
    try {
      setLoading(true)
      const res=await axios.get(`${base}/getAbout`)
     setAbout(res.data.data)
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
      getAbout()
  }, [change])
  //console.log(about)

  //delete about
  const deleteAbout=async()=>{
   // console.log(id)
    try {
      const res=await axios.delete(`${base}/deleteAbout/${id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("Ture")}`,
        },
      })
     setChange(res.data)
     setDeletePopup(!deletePopup)
     // console.log(res.data)
      toast.success(res.data.message)
      getAbout()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  ///get single about
  const get_Single_About=async(id)=>{
    try {
      const res=await axios.get(`${base}/getAbout/${id}`)
      //console.log(res.data)
      setData(res.data.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <>
    <Navbar/>


    <div className="h-[93vh] bg-zinc-200">
       <Container>
          
        <div className="pt-5">
          <Button  onClick={()=>setOpen(!open)} variant="contained">Add</Button>
        </div>
        <Dialog open={open}  onClose={()=>setOpen(!open)} >
              <form onSubmit={handleSubmit} className="w-80 p-4 *:w-full flex flex-col gap-y-4 ">
                <div className="flex justify-end">
                  <Button  onClick={()=>setOpen(!open)}  type="button" color="error" variant="contained" size="small"><ion-icon name="close-circle-outline"></ion-icon></Button>
                </div>
                <TextField label="Name" onChange={(e)=>setName(e.target.value)}/>
                <TextField label="Des" onChange={(e)=>setDes(e.target.value)}/>
                <TextField type="file" onChange={(e)=>{
                   setfiles(e.target.files[0])
                   setPrevew(URL.createObjectURL(e.target.files[0]))
 
                }}/>
                {
                  loading?<CircularProgress/>:<Button type="submit" variant="contained">Save</Button>
                }
               { Prevew&&<img src={Prevew} alt="" className="h-20 object-center object-center" />}
              </form>
        </Dialog>

             {/* ///showTable */}
             <table className="bg-white overflow-scroll mt-5">
              <thead>
                <tr className="*:p-2 border border-black *:border-r *:border-black">
                  <th className="w-52">Name</th>
                  <th className="w-60">Des</th>
                  <th className="w-32">image</th>
                  <th className="w-52">Action</th>
                </tr>
              </thead>

              <tbody>
               {
                about.map((data,i)=>(
                  <tr key={i} className="*:p-2 border  *:border-r ">
                  <td >{data.name}</td>
                  <td >{data.des}</td>
                  <td ><img src={data.image.url} alt=""  /></td>
                  <td className="flex justify-between" >
                    <Button onClick={()=>{
                      setUpdatePopup(!updatePopup)
                      setId(data._id)
                      get_Single_About(data._id)
                    }} variant="contained" ><ion-icon name="pencil-outline"></ion-icon></Button>

                    <Button onClick={()=>{
                      setId(data._id)
                      setDeletePopup(!deletePopup)
                    }} color="error" variant="contained" ><ion-icon name="close-circle-outline"></ion-icon></Button>
                  </td>
                </tr>
                ))
               }
              </tbody>
             </table>

       </Container>
    </div>
      

      {/* ////delete About */}
      <Dialog open={deletePopup}>
                <div className="p-4">Are you sure want to delete this About?</div>
                <div className="flex justify-between p-4">
                <Button onClick={()=>setDeletePopup(!deletePopup)} variant="contained" color="error">No</Button>


                  <Button onClick={deleteAbout} variant="contained" color="success">Yes</Button>
                </div>
   
      </Dialog>


      <Dialog open={updatePopup}>
                <Update_About data={data} id={id} change={setChange} setUpdatePopup={setUpdatePopup}/>
      </Dialog>
    </>
  )
}

export default About
