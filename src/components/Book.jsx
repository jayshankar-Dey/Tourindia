/* eslint-disable react/prop-types */

import { Button, Dialog, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"


const Book = ({Ture,image,setBookPopup}) => {
   const base=import.meta.env.VITE_BASE_API
   const {socket}=useSelector(state=>state.socket)
    const[open,setopen]=useState(false)
    const [name,setName] = useState("")
    const [age,setAge] = useState("")
    const[users,setusers]=useState([])
    const[date,setDate] = useState("")
    ///add user
    const Handle_Adduser=async(e)=>{
        e.preventDefault()
         setusers(prev=>[...prev,{
            name,
            age
         }])
        setopen(!open)
        
    }
    
    ///order payment
    const handlePayment = async (amount) => {
      if(!date) return toast.error("please provide a specific date")
     if(amount === 0) return toast.error("Please enter valid amount")
      try {
        const order = await axios.post(`${base}/order`,{totalPayment:Number(amount),users,tourId:Ture._id,image,price:Number(Ture.Ticketprice),name:Ture.name,date},{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Ture"),
            'Content-Type': 'application/json',
          }
        }
        )
        const data=order.data.order
       // setMessagePopup(true)
       var options = {
        key: data.key, 
        amount: data?.payment.amount, 
        currency: "INR",
        name: "Tour India",
        description: "Test Transaction",
        image: "https://okcredit-blog-images-prod.storage.googleapis.com/2020/12/tourism1.jpg",
        order_id: data.payment.id, 
        handler:async function (response){
          // http://localhost:8080/api/v1/student/varify/payment
          const body={
         razorpay_payment_id: response.razorpay_payment_id,
         razorpay_order_id: response.razorpay_order_id,
         razorpay_signature:response.razorpay_signature,
         totalPayment:data.totalPayment,
         users:data.users,
         tourId:data.tourId,
         image:data.image,
         price:data.price,
         name:data.name,
         date:data.date
          }
          console.log(body)

          const res = await axios.post(`${base}/varify/payment`,body,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Ture"),
            },
          })
  
          if(res.data.success){
              toast.success("payment succesfully")
              setBookPopup(false)
              const notices=await axios.post(`${base}/Notice`,{notic:"Your Booking Succesfully", userId:localStorage.getItem("id"),admin:false},{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("Ture")}`,
                  'Content-Type': 'application/json',
              },
              })
              //toast.success(notices.data.message)
              socket.emit('Nitice_admin',notices.data.Notic)
          }
          
      },
        prefill: {
            name: data.name,
            email: "Toue@gmail.com",
            contact: "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            color: "#000000"
        }
    };
    const rzorpay = new window.Razorpay(options);
    rzorpay.open() 
   
      } catch (error) {
        toast.error("Error Payment")
      }
    };
   
  return (
    <div className="w-full h-full   flex justify-center items-center">


        <div className="md:w-[50rem]  w-96 p-3 h-[80vh] bg-white">
             <div className=" h-48  w-full">
                 <img src={image} alt={Ture} className="w-full h-full object-cover"/>
             </div>
             <div>
                 <h2 className="text-lg font-semibold my-2">{Ture?.name}</h2>
                 <h2 className="font-semibold text-md  underline">Booking price : <span className="text-green-500">₹{Ture.Ticketprice}</span></h2>
            <div className="flex  gap-x-3 flex-col sm:flex-row">
    
              <div className="flex gap-x-3 my-2 w-40">
                    <h1>Add User</h1>
                    <div>
                    <Button onClick={()=>setopen(!open)} variant="contained" size="small"><ion-icon name="add-outline"></ion-icon></Button>
                    </div>
                 </div>

                 <div className="flex flex-col  ml-auto sm:justify-end justify-center gap-x-2 gap-y-2">

                  {
                    users.map((user,index)=>(
                        <h1 key={index} className="p-1 flex justify-center items-center gap-x-2 text-sm rounded shadow bg-zinc-700 text-white font-semibold"> <span><ion-icon name="person-outline"></ion-icon></span>  {user.name}, age-{user.age}
                        <button onClick={()=>setusers(prev=>prev.filter((_,i)=>i!==index))} className="text-red-400 float-end p-2"><ion-icon name="trash-outline"></ion-icon></button>  {/* remove user */}
                        </h1>
                    ))
                  }
                  <TextField type="date" onChange={(e)=>setDate(e.target.value)}/>
                </div>
               </div>
               <div onClick={()=>handlePayment(Ture?.Ticketprice*(users.length))} className="flex   justify-center items-center  mt-10 ">
                     <button className="bg-green-500 w-52 p-2 font-bold text-white border rounded shadow">Pay and Book ₹{Ture?.Ticketprice*(users.length)}</button>
               </div>
              
             </div>

            
        </div>

       

        <Dialog open={open} onClose={()=>setopen(!open)}>
            <form onSubmit={Handle_Adduser} className="w-72 h-60 *:w-full flex flex-col gap-y-5 p-4">
                <div className="flex justify-end">
                    <Button type="button" onClick={()=>setopen(!open)} color="error">X</Button>
                </div>
              <TextField size="small" label="Enter name" onChange={(e)=>setName(e.target.value)}/> 
              <TextField size="small" label="Enter age" onChange={(e)=>setAge(e.target.value)}/>  
              <Button type="submit" variant="contained" size="small">Add</Button> 
            </form>
        </Dialog>
      
    </div>
  )
}

export default Book
