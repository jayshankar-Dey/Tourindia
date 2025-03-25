import Aos from "aos";
import "aos/dist/aos.css"
import {  loginTrue } from "../redux/LoginSlice"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast";
import axios from "axios";
const Contact = () => {
  const base="https://tourindia-backend-tc99.onrender.com/api"
  const dispatch=useDispatch()
    Aos.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });

      const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!localStorage.getItem("Ture"))return dispatch(loginTrue())
        const name=document.getElementById('name').value
        const email=document.getElementById('email').value
        const phone=document.getElementById('phone').value
        const subject=document.getElementById('subject').value
        const message=document.getElementById('message').value

        if(Number(name.length) < 3) return toast.error("Name must be at 3 Characters")
        if(Number(email.length) < 10) return toast.error("please enter a valid email")
        if(Number(phone.length) < 10) return toast.error("please enter a valid phone number")
        if(Number(message.length) < 10) return toast.error("please enter valide message")
       
       //
      const res =await axios.post(`${base}/addContact`,{name,email,subject,phone,message},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("Ture")}`
        }
      })

      toast.success(res.data.message)
       
       document.getElementById('name').value=""
        document.getElementById('email').value=""
        document.getElementById('phone').value=""
        document.getElementById('subject').value=""
        document.getElementById('message').value=""
      }
  return (
    <>
      <div className="flex  md:flex-row flex-col w-full">
           <div data-aos="fade-right" className="md:w-1/2 flex flex-wrap justify-between items-center  p-1 overflow-hidden md:*:w-72 *:w-full *:object-cover object-center md:*:h-60 *:p-2 *:mt-2 *:border *:shadow *:mr-2">
                <img src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202211/india-brefing-indias-tourism-sector-dynamic-market-sees-new-verticals-growing-fdi-sixteen_nine.jpg?size=1200:675" alt="" className="duration-300 hover:scale-105 cursor-pointer"/>
                <img src="https://www.incredibleindia.gov.in/content/dam/incredible-india/images/trips/odisha/cuttack/5-day-trip-odia-travel/2-netaji-birthplace-museum-cuttack-odisha-tri-iter-day2.jpg" alt="" className="md:block hidden" />
                <img src="https://www.tourmyindia.com/blog//wp-content/uploads/2022/05/Best-Places-to-Visit-in-Odisha.jpg" alt="" className="lg:block hidden"/>
                <img src="https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/tourist-places-in-odisha.jpg" alt="" className="lg:block hidden"/>
           </div>
           <form onSubmit={handleSubmit} data-aos="fade-left" className="md:w-1/2 p-2 w-full">
             <div className="flex flex-col h-full justify-center items-center gap-y-3">
             <input type="text" placeholder="Name" id="name"  className=" p-3 outline-none border-b border-black w-96"/>
             <input type="text" placeholder="Email" id="email"  className=" p-3 outline-none border-b border-black w-96"/>
             <input type="number" placeholder="Phone" id="phone"  className=" p-3 outline-none border-b border-black w-96"/>
             <input type="text" placeholder="Subject" id="subject"  className=" p-3 outline-none border-b border-black w-96"/>
             <input type="text" id="message" placeholder="What is your problem"  className=" p-3 outline-none border-b border-black w-96"/>
             <div className="flex ">
                <button type="submit" className="bg-blue-500  p-2 w-96 border shadow rounded font-semibold text-white">Contact</button>
             </div>
             </div>
          </form>
      </div>
    </>
  )
}

export default Contact
