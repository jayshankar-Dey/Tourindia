
import { useEffect, useState } from "react"
import Nav_bar from "../components/Nav_bar"
import Order_Card from "../components/Order_Card"
import axios from "axios"


const BookShow = () => {
   const base=import.meta.env.VITE_BASE_API
   const [books,setBooks]=useState([])

   const getBook =async () =>{
     const res=await axios.get(`${base}/getBook`,{
       headers:{
           Authorization:`Bearer ${localStorage.getItem('Ture')}`,
       }
     })
     setBooks(res.data.data)
   }
   useEffect(() => {
    getBook()
   }, [])
   //console.log(books)
  return (
    <>
    <Nav_bar/>
    <div className="h-[93vh] bg-zinc-100 overflow-y-auto">
        <div className="lg:w-[70%] h-full mx-auto">
          {
            books.length==0&&<div className="flex w-full h-full justify-center items-center">
              <h1 className="font-semibold text-3xl animate-bounce">No Booking Found..</h1>
  
            </div>
          }

          {
             books.map((book)=>(
                 <Order_Card key={book._id} book={book}/>
             ))
          }

        </div>
    </div>
      
    </>
  )
}

export default BookShow
