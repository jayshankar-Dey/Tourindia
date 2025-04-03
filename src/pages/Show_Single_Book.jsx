/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Nav_bar from "../components/Nav_bar"
import { Button, Container, Dialog, Rating } from "@mui/material"
import toast from "react-hot-toast"

const Show_Single_Book = () => {
  const navigate=useNavigate()
    const base=import.meta.env.VITE_BASE_API
    const [books,setBooks]=useState([])
    const[rating,setRating] =useState("") 
    const[change,setChange] = useState("")
    const[open,setOpen] = useState(false)
    const[reson,setReson]=useState("")
    const{id}=useParams()
    const[user,setUser]=useState({})
  
  
    const getBook =async () =>{
      const res=await axios.get(`${base}/getBook/${id}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('Ture')}`,
        }
      })
      setBooks(res.data.data)
    }
   // console.log(books)
    useEffect(() => {
     getBook()
    }, [id,change])

    const date = new Date()
   const year = date.getFullYear()
   const month =date.getMonth()+1
   const day = date.getDate()

   const matchingdate=books?.date
   const totaldate=`${year}-0${month}-${day.length==2?day:`0${day}`}`
  // const match2=Number(matchingdate.split("-")[1])>month&&Number(matchingdate.split("-")[2])>=day

  let match;
  let match1;
  let match2;
    if(matchingdate){
      
   match=Number(matchingdate.split("-")[1]) == month&&Number(matchingdate.split("-")[2])<=day
   match1=Number(matchingdate.split("-")[1]) < month
   match2=Number(matchingdate.split("-")[0]) == year
   
    }
    console.log(totaldate,matchingdate,match,match1,match2)
   
    ///update rating
  const RatingValue=async(e,value)=>{
    setRating(value)
  }
  //console.log(rating)

  const update_rating=async(rating)=>{
     //alert(id)
     const res=await axios.put(`${base}/rating/tour`,{id,rating,tourId:books?.tourId},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('Ture')}`
      }
     })
     setChange(res.data.tour)
    toast.success(res.data.message)
    ///console.log(res.data)
  }
  
  ///cancel tour Booking
  const CancelBooking=async()=>{
    const date=books?.date
    
    if(totaldate.toString()==date.toString()){
      return toast.error("you cannot cancel this time")
    }
    const res=await axios.post(`${base}/cancel/booking`,{date:totaldate,id,reson},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('Ture')}`
      }

    })
    setOpen(false)
      toast.success("Booking canceled")
      setChange(res.data)
  }


   ///get user information
   const getuserDetailes=async()=>{
    const res=await axios.get(`${base}/getUserdetailes`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem('Ture')}`,
      }
    })
    const data=res.data.data
  setUser(data)
    
  }
  useEffect(()=>{
     getuserDetailes()
  },[open])
  
  return (
    <>
    <Nav_bar/>
   <div className="bg-zinc-200 md:h-[93vh] h-fit">
   <Container className="flex justify-center items-center pt-10 ">

       <div className="md:h-[35rem] bg-white rounded border shadow flex md:justify-between justify-center items-center md:flex-row flex-col">
             <div className="h-full w-72 p-2">
                   <img src={books?.image} alt=""  className="h-full w-full object-cover object-center"/>
                   
             </div>
             <div className="flex flex-col md:w-96 ">
               <h1 className="font-semibold p-1">{books?.name}</h1>
               <h1 className=" p-1 text-green-600 underline">{books?. payment?"Succesfully payment":"Payment failed"}</h1>
               <h1 className=" p-1">Total Payment <span className="underline text-green-500 font-semibold"> ₹{books?.totalPayment}</span> </h1>
               <h1 className=" text-sm    p-1">Ticket Price ₹{books?.price}</h1>
               <h1 className=" text-sm font-semibold text-blue-400  p-1">Payment Id:-  {books?.razorpay_payment_id}</h1>
               <h1 className=" text-sm font-semibold text-blue-400  p-1">Order Id:-  {books?.razorpay_order_id}</h1>
              
               <h1 className="p-1 mt-3 text-sm">Address:- {books?.userId?.address}</h1>
               <h1 className="px-1 text-sm">Pincode :-{books?.userId?.pincode}</h1>
               <h1 className="px-1 text-sm">State :-{books?.userId?.state}</h1>
               <h1 className="px-1 text-sm">Booking start :-{books?.date}</h1>
              {!books?.cancel&& <h1 className="px-1 text-sm">
                {match || match1 || !match2?<span className="text-red-500 font-semibold  underline">Booking Expiry  <div className="pt-3">
             {
              books?.rating? <button><Rating name="half-rating-read" value={books.rating} defaultValue={0}  readOnly/></button>: <button><Rating name="half-rating-read" value={rating} onChange={(e,data)=>{
                  RatingValue(e, data)
                  }}  defaultValue={0} /></button>
             }
            {
              !books.rating&&<>
               {
              rating&&<button onClick={()=>{
                update_rating(rating)
              }} className="bg-zinc-800 p-1 px-2 rounded-full shadow-lg shadow-green-200 text-white text-2xl"><ion-icon name="add-outline"></ion-icon></button>
             }
              </>
            }
               </div> </span>:<span className="text-green-500 p-2 flex gap-x-5 font-semibold"> Booking Continue  <Button onClick={()=>{
                 if(!user?.accountholdername || !user?.accountno || !user?.address || !user?.email || !user?.pincode
                  || !user?.
                  state || !user?.
                  name||!user?.
                  IFSC){
                  navigate('/update/profile')
                  toast.error("please update your profile")
                 }
                setOpen(!open)
                }} size="small" variant="contained">Cancel</Button> </span>}
               </h1>
}
           { books?.cancel&&<div>
            <h1 className="font-semibold my-2 text-red-500 bg-slate-200 p-1 rounded shadow">Booking Cancel</h1>
                 <h1 className="font-semibold text-sm">Refund within 3 to 7 days</h1>
                 <h1 className="text-green-500 text-sm font-semibold underline p-2 rounded   bg-slate-200">{books?.status}</h1>
                 <h1 className="text-sm">Refund Id :- {books?.refoundId}</h1>
            </div>}


               <Dialog open={open}>
                   <div className="p-3">
                    <h1 className="font-semibold ">are you sure Cancel the Book</h1>
                    <h1 className="text-sm text-red-600 underline ">if your Booking date is today you cannot cancel </h1>
                   </div>
                   <div className="p-2">
                      <div className="p-2">
                         <textarea name="" id="" value={reson}  onChange={(e)=>setReson(e.target.value)} className="h-40 p-3 w-80 border" placeholder="Enter Reson for your canceling......"></textarea>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="contained" color="error" onClick={()=>setOpen(!open)}>No</Button>
                        <Button onClick={()=>{
                             CancelBooking()
                        }} variant="contained" color="success">Confirm</Button>
                      </div>
                   </div>
               </Dialog>

              
             </div>
            
            
             <div className="md:w-96 p-2 overflow-y-scroll">
       {
                 books?.users?.map((user,i)=>(
                   <h1 key={i} className="text-sm rounded-md shadow-xl p-1 my-1 bg-blue-500 text-white">User {i+1} : {user.name} <span className="ml-5 underline">age: {user.age}</span> </h1>
                 ))
                
               }

               <h2 className="border mt-10 bg-zinc-100 rounded  border-red-400 p-3 text-red-500 text-sm">
               <span className="font-semibold text-lg border-b">Cancellation Policy :</span>
               <br></br>
          
To use easy cancellation feature for your booking please follow the following guidelines:
<br></br>
Non Refundable if cancellation is made less than 12 hours from the booking day.
<br></br>
50% Refundable if cancellation is made between 12 hours to 24 hours from the booking day.
<br></br>
70% Refundable if cancellation is made between 24 hours to 36 hours from the booking day.
<br></br>
90% Refundable if cancellation is made between 36 hours to 48 hours from the booking day.
<br></br>
100% Refundable if cancellation is made 2 days before the booking day.
               </h2>

              
       </div>
       </div>
       
        
    </Container>
          
   </div>
    </>
  )
}

export default Show_Single_Book
