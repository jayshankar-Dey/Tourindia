/* eslint-disable react/prop-types */
import { Button, CircularProgress, TextField } from "@mui/material"

import {  useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";


const Update_About = ({setUpdatePopup,id,change,data}) => {
    const base = import.meta.env.VITE_BASE_API
    const [name,setName]=useState("")
    const [des,setDes]=useState("")
    const [file,setfiles]=useState("")
    const [Prevew,setPrevew]=useState("")
    const [loading,setLoading]=useState(false)
   
    useEffect(()=>{
      setPrevew(data?.image?.url)
      setName(data?.name)
      setDes(data?.des)
    },[data])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formdata=new FormData();
        formdata.append("file",file)
        formdata.append("name",name)
        formdata.append("des",des)
        try {
          setLoading(true)
          const res=await axios.put(`${base}/update/${id}`,formdata,{
            headers:{
                'Content-Type':'multipart/form-data',
                Authorization:`Bearer ${localStorage.getItem("Ture")}`,
              },
          })
         // console.log(res.data)
          setLoading(false)
          toast.success(res.data.message)
          console.log(res.data)
          change(res.data.data)
          setName("")
          setDes("")
          setfiles("")
          setPrevew("")
          setUpdatePopup(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
         
      }
    
  return (
              <form onSubmit={handleSubmit} className="w-80 p-4 *:w-full flex flex-col gap-y-4 ">
                <div className="flex justify-end">
                  <Button  onClick={()=>setUpdatePopup(!open)}  type="button" color="error" variant="contained" size="small"><ion-icon name="close-circle-outline"></ion-icon></Button>
                </div>
                <TextField label="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <TextField label="Des" value={des} onChange={(e)=>setDes(e.target.value)}/>
                <TextField type="file" onChange={(e)=>{
                   setfiles(e.target.files[0])
                   setPrevew(URL.createObjectURL(e.target.files[0]))
 
                }}/>
                {
                  loading?<CircularProgress/>:<Button type="submit" variant="contained">Save</Button>
                }
               { Prevew&&<img src={Prevew} alt="" className="h-20 object-center object-center" />}
              </form>

  )
}

export default Update_About
