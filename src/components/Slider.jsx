/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';

const Slider = () => {
  const base=import.meta.env.VITE_BASE_API
  const[ture,setTure]=useState([])
 
  ///getTurisim
  const getTure=async()=>{
   
    const res=await axios.get(`${base}/Ture`)
    try {
      if(res.data.success){
        setTure(res.data.data)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Server Error")
    }
    
  }

  

  useEffect(() => {
     getTure()
  }, [])
  const getRandomNumber=(min, max)=> {
    return Math.floor(Math.random() * (max - min) + min)
    }


  const one=getRandomNumber(0,Number(ture.length))
  const two=getRandomNumber(0,Number(ture.length))
  const three=getRandomNumber(0,Number(ture.length))

  return (
    <div className="h-[90vh]">
 <Swiper  modules={[Pagination,Navigation,Scrollbar,A11y]} pagination={{
    clickable:true
 }} loop={true} autoplay={{
    delay:1000,
    disableOnInteraction: false,
    clickable: true
 }} className="  h-full *:cursor-pointer">
        <SwiperSlide className='relative'>
             <Card one={ture[one]} three={ture[three]} two={ture[two]}/>
        </SwiperSlide>
        <SwiperSlide><img src="https://assets.weforum.org/article/image/XJkVQrA6uy9CVqo_9e3DMLlKvkOHcr8wPO4RbDhbsfc.jpg" alt="" className='w-full h-full object-cover object-center' /></SwiperSlide>
        <SwiperSlide><img src="https://www.bcferries.com/web_image/h85/hbd/8992974831646.jpg" alt="" className='w-full h-full object-cover object-center' /></SwiperSlide>
        <SwiperSlide><img src="https://www.state.gov/wp-content/uploads/2020/11/shutterstock_186964970-scaled.jpg" alt="" className='w-full h-full object-cover object-center' /></SwiperSlide>
      </Swiper>
      </div>
  )
}

export default Slider



export const Card = ({one,three,two}) => {
  return (
    <>
       <section className="bg-teal-200 ">
  <div className="relative flex items-center justify-center h-screen">
   <img alt="Aerial view of a shipwreck in clear blue water" className="absolute inset-0 w-full h-full object-cover" src="https://plus.unsplash.com/premium_photo-1675802755792-a7cfd346b5be?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhY2glMjBib2F0fGVufDB8fDB8fHww"/>
   <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-transparent flex items-center">
    <div className="sm:ml-6 ml-2 mb-4">
     <div className="text-sm text-white uppercase tracking-widest">
      Mountains | Plains | Beaches
     </div>
     <h1 className="text-5xl font-bold text-white mt-2">
      Spend your vacation with our activities
     </h1>
     <div className="mt-8">
      <h2 className="text-lg font-semibold text-white">
       Most Popular
      </h2>

      <div>
      <div className="flex space-x-4 mt-4">
       <Link to={`/single/ture/${one?._id}`} className="bg-white rounded-lg shadow-lg p-4">
       {
          one?.images?.length==0?<img src="https://assets.cntraveller.in/photos/6678287e2bfe5c7c1531601e/1:1/w_354%2Cc_limit/miltiadis-fragkidis-YZBuJZ808-4-unsplash.jpg" className="" alt="" />:<img alt="Beautiful view of Greece" className="rounded-lg mb-2 w-44 h-44 object-center object-cover"src={one?.images[0].url} />
        }
        <h3 className="text-lg font-semibold">
         {one?.name}
        </h3>
        <p className="text-gray-600">
         <i className="fas fa-user-friends">
         </i>
          <Rating name="half-rating-read" size="small" value={Number(one?.rating)} readOnly />
        </p>
       </Link>
       <Link to={`/single/ture/${two?._id}`} className="bg-white rounded-lg shadow-lg p-4">
       {
          two?.images?.length==1?<img src="https://assets.cntraveller.in/photos/6678287e2bfe5c7c1531601e/1:1/w_354%2Cc_limit/miltiadis-fragkidis-YZBuJZ808-4-unsplash.jpg" className="" alt="" />:<img alt="Beautiful view of Greece" className="rounded-lg mb-2 w-44 h-44 object-center object-cover"src={two?.images[1].url} />
        }
        <h3 className="text-lg font-semibold">
         {two?.name}
        </h3>
        <p className="text-gray-600">
         <i className="fas fa-user-friends">
         </i>
          <Rating name="half-rating-read" size="small" value={Number(two?.rating)} readOnly />
        </p>
       </Link>
       <Link to={`/single/ture/${three?._id}`} className="bg-white rounded-lg shadow-lg p-4">
       {
          three?.images?.length==2?<img src="https://assets.cntraveller.in/photos/6678287e2bfe5c7c1531601e/1:1/w_354%2Cc_limit/miltiadis-fragkidis-YZBuJZ808-4-unsplash.jpg" className="" alt="" />:<img alt="Beautiful view of Greece" className="rounded-lg mb-2 w-44 h-44 object-center object-cover"src={three?.images[2].url} />
        }
        <h3 className="text-lg font-semibold">
         {three?.name}
        </h3>
        <p className="text-gray-600">
         <i className="fas fa-user-friends">
         </i>
          <Rating name="half-rating-read" size="small" value={Number(three?.rating)} readOnly />
        </p>
       </Link>
      </div>

      <div>
      <Link to={'/tour'} className='p-2 w-fit border-b-2  hover:text-white text-blue-600 border-blue-500 font-semibold mt-10 flex justify-center items-center gap-x-4 hover:scale-105 hover:bg-blue-600 duration-200'>Book Now <ion-icon name="arrow-forward-outline"></ion-icon></Link>
      </div>

      </div>

     </div>
    </div>
   </div>
  </div>
 </section>

    </>
  )
}

