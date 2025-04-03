import { Button, CircularProgress, Container, Dialog, TextField } from "@mui/material"
import Navbar from "../AdminComponents/Navbar"
import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";


const AddGalery = () => {
    const base = import.meta.env.VITE_BASE_API
    const[file,setFile]=useState("")
    const[state,setState]=useState("")
    const[EddetEfile,setEddetFile]=useState("")
    const[State,setstate]=useState("")
    const[prevew,setPrevew]=useState("")
    const[deletepopup,setDeletePopup]=useState(false)
    const[eddetpopup,setEddetPopup]=useState(false)
   const[Loading,setLoading]=useState(false)
   const[image,setimage]=useState("")
   const[Eddetprevw,setEddetPrevw]=useState("")
   const[id,setId]=useState("")
   const[Galery,setGalery]=useState([])
   const[change,setChange]=useState("")

    ///add galery
    const addGalery=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("file",file)
        formdata.append("state",state)
        try {
           
            setLoading(true)
         const res=   await axios.post(`${base}/galeryImage`,formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                },
            })
            toast.success("Galery added successfully")
            setChange(res.data)
            setFile("")
            setPrevew("")
            setLoading(false)
        } catch (error) {
            toast.error("Failed to add galery")
            setLoading(false)
        }
    }

    ///get galery
    const getGalery=async()=>{
        setLoading(true)
        try {
           const res= await axios.get(`${base}/galeryImage`,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                },
            })
            setGalery(res.data.data)
            setFile("")
            setPrevew("")
            setLoading(false)
        } catch (error) {
            toast.error("Failed to add galery")
            setLoading(false)
        }
    }
    ///delete galery
    
    const deleteGalery=async()=>{
        try {
          const res= await axios.delete(`${base}/galeryImage/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                },
            })
            toast.success("galery delete successfully")
            setChange(res.data)
        } catch (error) {
            toast.error("Failed to add galery")
         
        }
    }

    ///get single record galery
    const getsingleRecord=async(id)=>{
        try {
          const res= await axios.get(`${base}/galeryImage/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                },
            })
            setstate(res.data.data[0].state)
            setimage(res.data.data[0].image?.url)
            toast.success("get successfully")
            setChange(res.data)
        } catch (error) {
            toast.error("Failed to add galery")
         
        }
    }
    ///Update galery
    const Upadte_Galery=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("file",EddetEfile)
        formdata.append("state",State)
        try {
           
            setLoading(true)
         const res=   await axios.put(`${base}/galeryImage/${id}`,formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${localStorage.getItem("Ture")}`,
                },
            })
            toast.success("Galery update successfully")
            setChange(res.data)
            setEddetFile("")
            setEddetPrevw("")
            setLoading(false)
            setEddetPopup(false)
            
        } catch (error) {
            toast.error("Failed to update galery")
            setLoading(false)
        }
    }


    useEffect(() => {
      getGalery()
    }, [change])



  return (
    <>
    <Navbar/>


<div className="bg-zinc-200 p-3">
    <Container>

        <form onSubmit={addGalery} className="bg-white p-2 *:w-full md:*:w-fit gap-y-3  flex gap-x-3  md:flex-row flex-col md:h-32 items-center border rounded shadow">
             <TextField size="small" value={state} label="State" onChange={(e)=>setState(e.target.value)}/>
             <TextField type="file" size="small" onChange={(e)=>{
                setFile(e.target.files[0])
                setPrevew(URL.createObjectURL(e.target.files[0]))
                }} />
             <div className="md:h-full h-32">
             <img src={prevew} alt="" className="h-full object-cover object-center" />
             </div>
            <div  >
           {
            Loading?<CircularProgress/>:<Button type="submit" variant="contained">Save</Button>
           }
            </div>
        </form>

        <div className="h-[70vh] overflow-scroll">

            <div className="w-full mt-2 bg-white p-2 border rounded shadow">
                  <table className="overflow-scroll">
                    <thead >
                        <tr className="border *:p-2 *:border-r-2">
                            <th className="w-20">sl no</th>
                            <th className="w-60">State</th>
                            <th className="w-40">Image</th>
                            <th className="w-52">Action</th>
                        </tr>
                    </thead>

                    <tbody >
                       {
                        Galery.map((data,i)=>(
                            <tr key={i} className="border *:p-2 *:border-r">
                            <td >{i+1}</td>
                            <td >{data.state}</td>
                            <td >
                                <img src={data.image?.url} alt=""  className="h-10"/>
                            </td>
                            <td className="flex justify-between" >
                                <Button onClick={()=>{
                                    setEddetPopup(!eddetpopup)
                                    getsingleRecord(data._id)
                                    setId(data._id)
                                    }} variant="contained"><ion-icon name="create-outline"></ion-icon></Button>

                                <Button onClick={()=>{
                                    setDeletePopup(!deletepopup);
                                    setId(data._id)
                                    
                                }} variant="contained" color="error"><ion-icon name="close-circle-outline"></ion-icon></Button>
                            </td>
                        </tr>
                        ))
                       }
                    </tbody>
                  </table>
            </div>

        </div>

    </Container>

</div>
  
  {/* ///deletepopup
       */}

       <Dialog open={deletepopup}>
           <div className="p-3 flex flex-col gap-y-4">
            <h1>are you sure delete the pic</h1>
            <div className="flex justify-between">
                <Button variant="contained" onClick={()=>setDeletePopup(false)}>NO</Button>
                <Button variant="contained" color="error" onClick={()=>{
                    deleteGalery()
                    setDeletePopup(false)
                    }}>Yes</Button>
            </div>
           </div>
       </Dialog>


       {/* ///eddetpopup */}

       <Dialog open={eddetpopup} onClose={()=>setEddetPopup(!eddetpopup)}>
       <form onSubmit={Upadte_Galery} className="bg-white p-2 *:w-full md:*:w-fit gap-y-3  flex gap-x-3 md:w-screen md:flex-row flex-col md:h-32 items-center border rounded shadow">
        <div className="flex justify-end">
            <Button type="button" onClick={()=>setEddetPopup(!eddetpopup)} variant="contained" size="small" color="error">x</Button>
        </div>
             <TextField size="small" value={State} label="State" onChange={(e)=>setstate(e.target.value)}/>
             <TextField type="file" size="small"  onChange={(e)=>{
                setEddetFile(e.target.files[0])
                setEddetPrevw(URL.createObjectURL(e.target.files[0]))
                }} />
             <div className="md:h-full h-32 flex gap-x-2">
             <img src={Eddetprevw} alt="" className="h-full z-0 object-cover object-center" />
             <img src={image} alt="" className=" h-full z-50"/>
             </div>
            <div  >
           {
            Loading?<CircularProgress/>:<Button type="submit" variant="contained">Save</Button>
           }
            </div>
        </form>
       </Dialog>
    </>
  )
}

export default AddGalery
