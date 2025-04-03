/* eslint-disable no-unused-vars */
import { Button, CircularProgress, Dialog, TextField } from "@mui/material"
import Navbar from "../AdminComponents/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"


const AddBlog = () => {
    const base=import.meta.env.VITE_BASE_API
    const [open,setopen]=useState(false)
    const[Loading,setLoading]=useState(false)
    const[name,setName]=useState("")
    const[des,setDes]=useState("")
    const[state,setState]=useState("")

    //update
    const[Name,setname]=useState("")
    const[Des,setdes]=useState("")
    const[State,setstate]=useState("")


    const [file, setFile]=useState("")
    const[Blog,setBlog]=useState([])
    const[vediopopup,setvediopup]=useState(false)
    const[updatePopup,setUpdatePopup]=useState(false)
    const[deletePopup,setdeletePopup]=useState(false)
    const[id,setId]=useState("")

    ///uplode vedio
    const Updatevedio=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("file",file)
    try {
        setLoading(true)
         const res=await axios.put(`${base}/updateBlog/${id}`,formdata,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                'Content-Type':'multipart/form-data'
            },
         })
         setLoading(false)
         console.log(res.data)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }

    }

    ///Update Blog
    const Update_Blog=async(e)=>{
        e.preventDefault()
    try {
        setLoading(true)
         const res=await axios.put(`${base}/updateBlog/${id}`,{name:Name,des:Des,state:State},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                'Content-Type':'multipart/form-data'
            },
         })
         console.log(res.data)
         setLoading(false)
         setUpdatePopup(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }

    }
///add blog ////////////////
    const handleSubmit=async(e)=>{
        e.preventDefault()
       try {
        setLoading(true)
       
        const res=await axios.post(`${base}/addBlog`,{name,des,state},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                'Content-Type':'multipart/form-data'
            },
        })
        //console.log( res.data)
        toast.success("Blog added successfully")
        setLoading(false)
        setopen(false)
        setName("")
        setDes("")
        setState("")
       } catch (error) {
        setLoading(false)
        console.log(error)
       }

    }

    //get single data
    const getsingledata=async(id)=>{
        try {
         const res =await axios.get(`${base}/getBlog/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`,
            }
         })
         const data=res.data.data[0]
         setname(data.name)
         setstate(data.state)
         setdes(data.des)
        } catch (error) {
          console.log(error)
        }
      }
     
 // console.log(Blog)
    ////get blog
    useEffect(() => {
      const fetchData=async()=>{
        try {
         const res =await axios.get(`${base}/getBlog`,{
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
    }, [Loading])

    const deleteBlog=async()=>{
        try {
        const res= await axios.delete(`${base}/deleteBlog/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`,
            }
         })
        setLoading(true)
         toast.success("Blog deleted successfully")
       setdeletePopup(false)
       } catch (error) {
        console.log(error)
       }
    }
  return (
    <>
    <Navbar/>
    <div className="p-2 md:w-[70%] mx-auto">
        <Button variant="contained" onClick={()=>setopen(!open)}>add</Button>
    </div>

    <Dialog open={open} onClose={()=>setopen(!open)}>
    <div  className=" flex justify-center items-center">
         <form onSubmit={handleSubmit} className="w-96  *:w-full p-3 flex flex-col gap-y-4">
            <div>
                <button type="button" onClick={()=>setopen(!open)} className="float-end text-red-500"><ion-icon name="close-outline"></ion-icon></button>
            </div>
            <TextField label="Name" onChange={(e)=>setName(e.target.value)}/>
            <TextField label="des" onChange={(e)=>setDes(e.target.value)}/>
            <TextField label="State"onChange={(e)=>setState(e.target.value)}/>
           {
            Loading?<CircularProgress/>: <Button type="submit" variant="contained">Save</Button>
           }

         </form>
    </div>    
    </Dialog>


    {/* ////body */}
    <div className="overflow-scroll mx-auto md:w-[70%] mt-5">
        <table className="overflow-scroll">
            <thead >
                <tr className="border *:p-2 *:border-r">
                        <th className="w-52">name</th>
                        <th className="w-60">Des</th>
                        <th className="w-40">State</th>
                        <th className="w-40">vedio</th>
                        <th className="w-60">Action</th>
                </tr>
                
            </thead>

            <tbody>
            { 
                    Blog.map((data,i)=>(
                        <tr key={i} className="border *:p-2 *:border-r">
                           <td>{data.name}</td>
                           <td>{data.des}</td>
                           <td>{data.state}</td>
                           <td> <video src={data?.vedio?.url} loop autoPlay muted className="h-14"></video> </td>
                           <td className="flex gap-x-2 justify-center items-center gap-y-2 ">
                        <Button size="small" onClick={()=>{
                            setvediopup(!vediopopup)
                            setId(data._id)
                            }}  variant="contained"><ion-icon name="add-circle-outline"></ion-icon></Button>

                            <Button  onClick={()=>{
                            setUpdatePopup(!updatePopup)
                            setId(data._id)
                            getsingledata(data._id)
                            }} size="small" color="success"  variant="contained"><ion-icon name="create-outline"></ion-icon></Button>

                            <Button onClick={()=>{
                            setdeletePopup(!deletePopup)
                            setId(data._id)
                            }} size="small" color="error"  variant="contained"><ion-icon name="trash-outline"></ion-icon></Button>
                           </td>
                        </tr>
                    ))
                   }
            </tbody>
        </table>
    </div>

    {/* ///vediouplode */}
    <Dialog open={vediopopup} onClose={()=>setvediopup(!vediopopup)}>


        <form onSubmit={Updatevedio} className="w-96 h-40 p-4 bg-white flex flex-col gap-y-3">
            <div>
                <button type="button" className="text-red-400 float-end" onClick={()=>setvediopup(!vediopopup)}>x</button>
            </div>
            <TextField type="file" onChange={(e)=>setFile(e.target.files[0])}/>
            {
            Loading?<CircularProgress/>: <Button type="submit" variant="contained">Save</Button>
           }
        </form>

    </Dialog>

    {/* //update */}

    <Dialog  open={updatePopup}>
        <div className="w-96 h-96">
        <form onSubmit={Update_Blog} className="w-96  *:w-full p-3 flex flex-col gap-y-4">
            <div>
                <button type="button" onClick={()=>setUpdatePopup(!updatePopup)} className="float-end text-red-500"><ion-icon name="close-outline"></ion-icon></button>
            </div>
            <TextField value={Name} label="Name" onChange={(e)=>setname(e.target.value)}/>
            <TextField label="des" value={Des} onChange={(e)=>setdes(e.target.value)}/>
            <TextField value={State} label="State"onChange={(e)=>setstate(e.target.value)}/>
           {
            Loading?<CircularProgress/>: <Button type="submit" variant="contained">Save</Button>
           }

         </form>
        </div>

    </Dialog>

    {/* ////delete popup */}
    <Dialog open={deletePopup}>
        <div className="flex justify-center items-center flex-col p-4 gap-y-4">
        <p>Are you sure to delete this blog?</p>
        <div className="flex gap-x-2">
            <Button variant="contained" onClick={()=>setdeletePopup(false)}>No</Button>
            <Button variant="contained" color="error" onClick={deleteBlog} >Yes</Button>
        </div>
        </div>
    </Dialog>
    </>
  )
}

export default AddBlog
