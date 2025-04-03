import { Button, Container, Dialog } from "@mui/material"
import Navbar from "../AdminComponents/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom';
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Chat = () => {
      const base=import.meta.env.VITE_BASE_API
      const[ChatUser,setChatUser]=useState([])
      const{socket}= useSelector(state=>state.socket)
      const[open,setOpen]=useState(false)
      const[ids,setIds]=useState({})
      const[i,setI]=useState(0)
      const user=localStorage.getItem("id")
     // console.log(user)
      const[change,setChange]=useState("")
      const [message,setMessage]=useState("")
    ///get chats
  // console.log(socket)
    socket.on('User_message',data=>{
         console.log(data)
         setChange(data)
    })
    const getUserChat=async()=>{
        const res=await axios.get(`${base}/Chat_users`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Ture")}`,
            },
        })
        setChatUser(res.data.cnv)
    }
    console.log(ChatUser[i]?.conversations)
    useEffect(()=>{
        getUserChat()
    },[change])

    //send message
    const handlesendMessage=async(e)=>{
        e.preventDefault()
       const tourId=ids.tourId;
       const userId=ids.userId;
       console.log(tourId,userId,message)
       try {
       const res=await axios.post(`${base}/admin_send/message`,{tourId,userId,message},{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Ture")}`,
            'Content-Type': 'application/json',
        },
      })

        const notices=await axios.post(`${base}/Notice`,{notic:message, userId},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Ture")}`,
            'Content-Type': 'application/json',
        },
        })
        toast.success(notices.data.message)
        socket.emit('Nitice_admin',notices.data.Notic)
        setChange(res.data.find);
        socket.emit('Admin_send_message',res.data.find)
        setMessage("")
        setOpen(false)
        toast.success("Message sent get successfully")
      } catch (error) {
        toast.error("Error sending message")
      }
    
    }
   
  return (
    <>
    <Navbar/>

    <div className="h-[92vh] bg-zinc-200 overflow-scroll">

        <Container>
            <div className="flex justify-center items-center">
                <h1 className="text-2xl font-semibold my-3 underline">Chat Room</h1>
            </div>


           <div className="flex flex-wrap gap-x-3 justify-center items-center">
            {
                ChatUser.map((item,i)=>(
                    <div key={i} className={`my-2 ${item.conversations.seen?"bg-zinc-600":"bg-white"} justify-between  shadow-md  w-[30rem]  h-32 flex px-4 py-2 border rounded`}>
                          <div className="h-full w-32">
                            <img src={item.conversations.tourId.images[0].url} alt=""  className="object-cover object-center w-full h-full"/>
                          </div>
                          <div className="p-2 justify-center flex flex-col ">
                
        
                            <h1 className="font-semibold">{item.conversations.tourId.name}</h1>
                            
                            
                            <h1 className="text-sm">State :-{item.conversations.tourId.state}</h1>
                            <h1 className="text-sm underline text-green-500">user : {item.conversations.userId.name} </h1>
                          </div>
                          <div className="flex justify-center w-32 items-center">
                            <Button onClick={()=>{
                                setOpen(true)
                                setI(i)
                                //setMessage([item.conversations.message])
                                setIds({
                                     tourId:item.conversations.tourId._id,
                                     userId:item.conversations.userId._id,
                                })
                            }} variant="contained" size="small">Reply</Button>
                          </div>
                    </div>
                ))
            }
           </div>

           <Dialog open={open}>
              <div  className="p-2 flex flex-col">
                <div className="bg-white p-1 flex justify-end">
                     <Button type="button" onClick={()=>setOpen(false)} variant="contained" size="small" sx={{p:"1px"}} color="error">x</Button>
                </div>
                <ScrollToBottom className="h-80 w-96 ">
                   
                    
                     {/* {
                        message.map((data,i)=>(
                            <div key={i} className={`flex justify-end p-1`}>
                            <h1 className={`bg-zinc-700 p-2 rounded-lg text-white text-sm font-semibold`}>{data?.message}</h1>
                      </div>
                        ))
                     } */}

                     {
                        ChatUser[i]?.conversations.message.map((data,i)=>(
                            <div key={i} className={`flex  ${data.sender==user?"justify-end":"justify-start"}  p-1`}>
                            <h1 className={` ${data.sender==user?"bg-zinc-700":"bg-green-700"} p-2 shadow-lg rounded-lg text-white text-sm font-semibold`}>{data.message}</h1>
                      </div>
                        ))
                     }
                     
                </ScrollToBottom>
                <form onSubmit={handlesendMessage} className="flex">
                    <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Write your message..." className="h-12 w-full border-2 border-gray-300 p-2"/>
                    <Button type="submit" variant="contained" size="small">Reply</Button>
                </form>

              </div>
           </Dialog>

        </Container>

    </div>
      
    </>
  )
}

export default Chat
