/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Nav_bar from "../components/Nav_bar"
import { Button, Dialog, Rating } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import {toast} from "react-hot-toast"
import Book from "../components/Book"
import { loginTrue } from "../redux/LoginSlice"
import { useDispatch, useSelector } from "react-redux"
import ScrollToBottom from 'react-scroll-to-bottom';

import {WhatsappShareButton} from "react-share";
import Ture_Card from "../components/Ture_Card"
import singleimage1 from '../assets/single1.avif'
import singleimage2 from '../assets/single2.png'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Single_Ture = () => {
  const {id}=useParams()
  const[User,setUser]=useState({})
  const navigate=useNavigate()
   const {socket}=useSelector(state=>state.socket)
   //console.log(socket)
   const base=import.meta.env.VITE_BASE_API
   const dispatch=useDispatch()
    const[ChangeImg,setChangeImg]=useState(singleimage1)
   const user=localStorage.getItem("id")||""
   const[open,setOpen]=useState(false)
    const[messagePopup,setMessagePopup]=useState(false)
   const[Ture,setTure]=useState({})
   const[reletedTure,setReletedTure]=useState([])
   const[images,setimages]= useState([])
   const[des,setdes]=useState([])
   const[BookPopup,setBookPopup]=useState(false)
   const[message,setMessage]=useState("")
   const[Messages,setMessages]=useState([])
   const[change,setChange]=useState()
   const[Likes,setLikes]=useState([])
   const[users,setUsers]=useState([])
   const[comment,setComment]=useState("")
   const[Comments,setComments]=useState([])
   
    ///get single Ture
    //get gingle Ture
  const getTure = async () => {
    try {
      const response = await axios.get(`${base}/Ture/${id}`);
      setTure(response.data.data[0])
      setUsers(response.data.data[0].users)
      setComments(response.data.data[0].comment)
      setChangeImg(response.data.data[0].images[0].url)
      setimages(response.data.data[0].images)
      setLikes(response.data.data[0].Like)
      setdes(response.data.data[0].des)
    } catch (error) {
      toast.error("Error getting ture");
    }
  };
  console.log(users)
    useEffect(() => {
  getTure()
    }, [id,change])
   
  
///send Message
  const handleMessage = async (e) => {
    e.preventDefault()
        try {
      const response = await axios.post(`${base}/user_send/message`, {tourId:Ture?._id,message}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Ture"),
          'Content-Type': 'application/json',
        }
      }
      )
      socket.emit('UserSendmessage', response.data.find)
      setChange(response.data);
      setMessage("")
      toast.success("Message sent get successfully")
    } catch (error) {
      toast.error("Error sending message")
    }
  };

  ///get message
  socket.on('Admin_message',(message)=>{
    setChange(message)
    //console.log(message)
  })
  const getMessage = async () => {
    const tourId=id
    try {
      const response = await axios.get(`${base}/get_user/message/${tourId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Ture"),
          'Content-Type': 'application/json',
        }
      }
      )
      setMessages(response.data.find.message);
      //setMessage(response.data.data)
    } catch (error) {
      //toast.error("Error getting message")
      
    }
  };
  useEffect(() => {
    getMessage()
  }, [id,change])
  //console.log(Messages)

  ///like Tour
  const LikeTour=async(id)=>{
    try {
      const res = await axios.post(`${base}/Like`, {id},{
        headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`
        }
      })
      setChange(res.data.tour)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  ///like Tour
  const UnlikeTour=async()=>{
    try {
      const res = await axios.post(`${base}/Unlike`, {id},{
        headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`
        }
      })
      setChange(res.data.tour)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  
  //console.log(Likes)

  ////comment submit
  const CommentSubmit=async(e)=>{
    e.preventDefault()
    if(!users.includes(user)){
      toast.error("You cannot submit comments first you will book now")
      return
    }
    // if(comment.length > 0){
    //   toast.error("please enter valide comment")
    //   return
    // }
    try {
      const res = await axios.post(`${base}/comment`, {id:Ture?._id,comment},{
        headers:{
                Authorization:`Bearer ${localStorage.getItem("Ture")}`
        }
      })
      setChange(res.data.tour)
      console.log(res.data)
      toast.success(res.data.message)
      setComment("")
    } catch (error) {
      console.log(error)
    }
  }
 
   ///getTurisim
    const getReletedTure=async()=>{
     
      const res=await axios.get(`${base}/Ture?name`)
      try {
        if(res.data.success){
          const allTure=res.data.data;
          const ture=allTure.filter((data)=>{
           return data.state==Ture?.state && data._id !== Ture?._id
          })
          setReletedTure(ture)
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        toast.error("Server Error")
      }
      
    }
  
     
    useEffect(() => {
      getReletedTure()
    }, [Ture,id])

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
     window.scrollTo(0, 0)
  },[Ture,id])



  return (
    <>
      <Nav_bar/>
      <div className="bg-zinc-100 h-fit  overflow-auto ">
          <div className="md:w-[70%] h-fit overflow-y-scroll mx-auto">


              <div className="w-full h-[33rem] gap-x-3 md:pt-6  flex md:flex-row flex-col  *:h-full">
                  <div className="w-full h-96 relative p-3 bg-white border rounded shadow">
                    <img src={ChangeImg} alt="" className="w-full h-full object-cover object-center" />
                   { Likes.includes(user)?<button onClick={()=>UnlikeTour(Ture?._id)} className="absolute top-6 right-6 text-3xl  text-red-600 z-30"><FaHeart size={20}/></button>:<button onClick={()=>LikeTour(Ture?._id)} className="absolute top-6 right-6 text-3xl text-white z-30"><FaRegHeart size={20}/></button>}
                  </div>

                  <div className="md:w-40 cursor-pointer flex md:flex-col flex-row  items-center  gap-1">
                   
                 {
                  Number(images.length) >0?<>
                   {
                    images.map((image,index)=>(
                      <div key={index} className="h-24 my-2 w-28 p-2 border shadow bg-white" onClick={()=>setChangeImg(image.url)}>
                          <img src={image.url} alt="" className="w-full h-full object-cover object-center" />
                      </div>
                    ))
                     
                    }
                  </>:<>
                  {
                    
                    [1,2,3,4].map((i)=>(
                      <div key={i} className="h-24 my-2 w-28 p-2 border shadow bg-white" onClick={()=>setChangeImg(singleimage2)}>
                      <img src={singleimage2} alt="" className="w-full h-full object-cover object-center" />
                  </div>
                    ))

                    }
                  
                  </>
                 }
                      
                  </div>
              </div>

              {/* ///body */}

              <div className="bg-white  border shadow w-full md:mt-3 h-full sm:pt-28 md:pt-0 pt-10 md:p-4 p-1">
               
                 <div className="flex justify-between pt-3">
                 <div>
                 <h1 className="text-2xl font-semibold p-1">{Ture.name}</h1>
                 {
                  des?.map((des,i)=>(
                    <p key={i}>{des}</p>
                  ))
                 }
                 </div>
                 <button onClick={()=>setOpen(!open)} title="vew rating" className="flex bg-amber-500 h-10 w-fit px-3 text-white font-semibold rounded shadow-lg justify-center items-center gap-x-3">vew <ion-icon name="star"></ion-icon></button>
                 </div>

                 <Dialog open={open} onClose={()=>setOpen(!open)}>
                   <div className="flex justify-end  p-2 text-red-600 text-2xl">
                    <button onClick={()=>setOpen(!open)}>x</button>
                   </div>
                  <div className="h-screen w-96 flex flex-col gap-y-2 overflow-scroll">
                     {
                      Ture?.reviews?.map((data,i)=>(
                        <div key={i} className="flex justify-center items-center gap-x-3 px-4 rounded border shadow-md shadow-zinc-300 mx-auto w-fit bg-zinc-200 p-2">
                          <Rating  name="half-rating-read"  value={Number(data?.rating)}   readOnly />
                          <h1 className="underline font-semibold">{data.user?.name}</h1>
                        </div>
                      ))
                     }
                     {
                      Ture?.reviews?.length==0&&<h1 className="w-full text-center animate-bounce">No reivew found</h1>
                     }
                  </div>

                 </Dialog>

                 <h2 className="font-bold text-2xl mt-4 underline">Booking price : <span className="text-green-500">₹{Ture?.Ticketprice}</span></h2>
                 
                 <div className="mt-5 flex flex-col  gap-y-3 ">
                 <Rating  name="half-rating-read"  value={Number(Ture?.rating)}   readOnly />
               
                 <div className="flex gap-x-3">
                 <Button  onClick={()=>{
                  
                  if(!localStorage.getItem("Ture")){
                    
                    dispatch(loginTrue())
                  }else{
                    if(!User?.accountholdername || !User?.accountno || !User?.address || !User?.email || !User?.pincode
                      || !User?.
                      state || !User?.
                      name||!User?.
                      IFSC){
                      navigate('/update/profile')
                      toast.error("please update your profile")
                     }
                    setBookPopup(!BookPopup)
                  }
                  }} variant="contained" color="success">Book now</Button>

                <Button onClick={()=>setMessagePopup(!messagePopup)} variant="contained" >For any Query send message</Button>

                <WhatsappShareButton url={window.location.href}>
               <span title="share to whatsup" className="text-white bg-green-500 p-1 px-2 shadow-md shadow-green-400 rounded-full text-xl"> <ion-icon name="logo-whatsapp"></ion-icon></span>
               </WhatsappShareButton>
                 </div>
                 </div>


                {/* /////Rules//////////////////////// */}
                 <div className="h-fit p-3 text-red-500 mt-3 border border-red-400 rounded bg-zinc-100">
                   <h1 className="font-bold  text-lg mt-3 border-b ">Rules :
                   </h1>

                   <p className="text-sm ">
                   TourIndia provides the services that helps the tourist to acquire more knowledge about the places.

TourIndia is not responsible for any direct or indirect, for any loss, damage or injury to property or person in connection to the provided services by the facility.

Be present at the place before morning 9:00 AM on the booking day 

Management is not responsible for loss of personal belongings or any injuries caused during the travel.

TourIndia is not responsible for any direct or indirect, for any loss, damage or injury to property or person in connection to the provided services by the facility

Additional Terms & Conditions
No Smoking

No Drinking


                   </p>
                </div>

                 <div className="flex gap-2 bg-white flex-col lg:flex-row">


                 {/* ///comment section////////////////// */}
                 <div className="lg:w-1/2 max-h-[30rem] overflow-auto flex flex-col gap-y-3 ">
                  { <form onSubmit={CommentSubmit} className="p-3">
                    <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Comment" className="outline-none w-96 border-b border-black p-3" />
                    <button type="submit" className="text-2xl"><ion-icon name="send-outline"></ion-icon></button>
                   </form>}

                   <div>
                    <h1 className="text-xl font-semibold underline p-2">All Coments :</h1>
                    {
                      Comments?.length==0&&<h1 className="text-blue-500 my-2 text-sm animate-bounce">No comment found..</h1>
                    }
                   </div>
                   
                   {
                      Comments?.length !==0&&Comments.map((c,i)=>(
                      
                        <div key={i} className={`   flex `}>

                         <p className={`w-fit font-semibold border-b-2  shadow shadow-green-300  flex justify-between gap-x-3 rounded-full  bg-white p-1 px-6 `}>{c.comment} <span><ion-icon name="return-up-forward-outline"></ion-icon></span></p>

                        </div>
                        
                      ))
                   }
                 
                 </div>
{/* ////////////////message box */}
                 <div className="lg:w-1/2 bg-white justify-center items-center flex flex-col gap-y-2">
                       <Dialog open={messagePopup} onClose={()=>setMessagePopup(!messagePopup)}>
                       <div className="h-[28rem] md:w-96 w-80 flex flex-col ">
                          <div className=" shadow-lg">
                              <button type="button" onClick={()=>setMessagePopup(!messagePopup)} className="text-red-400 float-end p-2 text-2xl"><ion-icon name="close-outline"></ion-icon></button>
                            </div>
                           <ScrollToBottom className="h-[25rem] p-2 overflow-scroll border">
                            

                    
                            {/* //message */}

                            {
                                Messages?.map((data,i)=>(
                                  <div key={i} className={`flex ${data?.sender._id==user?"justify-end":"justify-start"}`}>
                                  <h1 className={`w-fit ${data.sender._id==user?"bg-zinc-800":"bg-green-500"} text-white p-2 rounded shadow-lg shadow-zinc-400 m-2 flex flex-col gap-y-1`}>
                                    <span className={`text-[.6rem]  ${data?.sender._id==user?"bg-green-500 w-fit px-3 p-[.20rem] rounded shadow shadow-zinc-400":"bg-zinc-800 w-fit px-2 p-[.15rem] rounded shadow shadow-zinc-400"}`}>{data?.sender?.name}</span>
                                    <span className="font-thin ">{data?.message}</span>
                                  </h1>
                              </div>
                                ))
                               }

                               {
                                Messages.length==0&& <div className="flex justify-center items-center h-full text-zinc-400  font-semibold"><h1 className="animate-bounce">For any Query send message..</h1></div>
                               }
                              
                                {/* //message */}
                                
                                
                                
                           </ScrollToBottom>

                           <form onSubmit={handleMessage} className="flex justify-center items-center  ">
                            {/* <input type="text" value={Ture?._id} id /> */}
                            <input type="text"  placeholder="for any Quary send message" className="w-full border outline-none h-full p-3" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                            <button type="submit" className="text-2xl p-2 text-white bg-green-500 text"><ion-icon name="send-outline"></ion-icon></button>
                           </form>
                     </div>
                       </Dialog>
                 </div>

              </div>

              </div>

             
          <Dialog open={BookPopup} onClose={()=>setBookPopup(!BookPopup)}>
            <Book Ture={Ture} image={ChangeImg} setBookPopup={setBookPopup} />
          </Dialog>

   {/* ///releted ture////////////////////////// */}
   <h2 className="text-xl underline font-semibold mt-3">Releted Tour:</h2>
               
               <div className="justify-center flex flex-wrap gap-x-4 mt-4 w-full mx-auto">
              { reletedTure.length==0&&<h1 className="text-xl text-blue-500 animate-bounce mb-4">No releted Ture found....</h1>}
            {
              reletedTure?.map((t,i)=><Ture_Card key={i} ture={t}/>)
            }
            </div>
         
          </div>
         
    
      </div>

      
      
    </>
  )
}

export default Single_Ture
