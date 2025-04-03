import { useEffect, useState } from "react"
import Nav_bar from "./Nav_bar"
import axios from "axios"
import toast from "react-hot-toast"


const UpdateProfile = () => {
    const base=import.meta.env.VITE_BASE_API
    const[state,setstate]=useState("")
    const[address,setaddress]=useState("")
    const[pincode,setpincode]=useState("")
    const[accountno,setaccountno]=useState("")
    const[IFSC,setIFSC]=useState("")
    const[accountholdername,setaccountholdername]=useState("")
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    ////update user profile
   const updateUserProfile=async(e)=>{
    e.preventDefault()
    try {
       await axios.post(`${base}/Update_User_Details`,{state,address,pincode,accountno,IFSC,accountholdername,name,email},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('Ture')}`,
            }
        })
        toast.success("Update Successfully")
    } catch (error) {
        console.log(error)
        toast.error("Failed to Update enter valide data")
    }
   }

    ///get user information
    const getuserDetailes=async()=>{
      const res=await axios.get(`${base}/getUserdetailes`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('Ture')}`,
        }
      })
      const data=res.data.data
    
      
      setEmail(data.email)
      setName(data.name)
      setaddress(data.address)
      setaccountno(data.accountno)
      setIFSC(data.IFSC)
      setaccountholdername(data.accountholdername)
      setstate(data.state)
      setpincode(data.pincode)
    }
    useEffect(()=>{
       getuserDetailes()
    },[])


  return (
    <>
    <Nav_bar/>
      <div className="h-[93vh] bg-zinc-100 flex justify-center items-center">
       <form onSubmit={updateUserProfile} className="p-3 md:w-[40rem] bg-white border shadow rounded">
       {/* state, address, pincode, accountno, IFSC, accountholdername */}
       <div className="flex md:flex-row gap-3 flex-col gap-x-3 *:p-3 *:w-96 *:outline-none  *:border-b-2  *:border-zinc-400 m-5">
        <input type="text" value={name}  className="" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
        <input type="text" value={email} readOnly   className="bg-zinc-100" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>


        <div className="flex md:flex-row gap-3 flex-col gap-x-3 *:p-3 *:w-96 *:outline-none  *:border-b-2  *:border-zinc-400 m-5">
        <input type="text" value={state}  className="" placeholder="State" onChange={(e)=>setstate(e.target.value)}/>
        <input type="number" value={pincode}  className="" placeholder="Phone number" onChange={(e)=>setpincode(e.target.value)}/>
        </div>

        <div className="flex md:flex-row gap-3 flex-col gap-x-3 *:p-3 *:w-96 *:outline-none  *:border-b-2  *:border-zinc-400 m-5">
        <input type="text" value={address}  className="" placeholder="Address" onChange={(e)=>setaddress(e.target.value)}/>
        <input type="text"  value={accountno} className="" placeholder="Accountno" onChange={(e)=>setaccountno(e.target.value)}/>
        </div>

        <div className="flex md:flex-row gap-3 flex-col gap-x-3 *:p-3 *:w-96 *:outline-none  *:border-b-2  *:border-zinc-400 m-5">
        <input type="text" value={IFSC}  className="" placeholder="IFSC" onChange={(e)=>setIFSC(e.target.value)}/>
        <input type="text" value={accountholdername}  className="" placeholder="Accountholdername" onChange={(e)=>setaccountholdername(e.target.value)}/>
        </div>
         <div>
         <button type="submit" className=" p-1 mx-3 text-sm font-semibold text-white bg-green-500 rounded">Update</button>
      
         </div>
       </form>
      </div>
    </>
  )
}

export default UpdateProfile
