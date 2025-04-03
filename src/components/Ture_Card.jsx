/* eslint-disable react/prop-types */
import { Rating } from "@mui/material"
import Aos from "aos";
import "aos/dist/aos.css"
import { Link } from "react-router-dom";
import CardSkliton from '../components/CardSkliton'
import { Suspense } from "react";
const Ture_Card = ({ture}) => {

    Aos.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
  return (
    <Suspense fallback={<CardSkliton/>}>
    <Link to={`/single/ture/${ture?._id}`} data-aos="zoom-in" className="h-fit bg-white shadow  w-64 rounded-xl  border my-2">
      <div className="h-60 w-full p-3 overflow-hidden ">
        {
          ture?.images?.length==0?<img src="https://assets.cntraveller.in/photos/6678287e2bfe5c7c1531601e/1:1/w_354%2Cc_limit/miltiadis-fragkidis-YZBuJZ808-4-unsplash.jpg" className="w-full h-full object-cover object-center duration-300 hover:scale-105 cursor-pointer" alt="" />:<img src={ture?.images[0].url}className="w-full h-full object-cover object-center duration-300 hover:scale-105 cursor-pointer" alt="" />
        }
      </div>
      <div className="p-2">
      <Rating name="half-rating-read" size="small" value={Number(ture?.rating)} readOnly />
      <h1 className="text-lg font-semibold">{ture?.name}.</h1>
      <button className="bg-gradient-to-r from-blue-600 to-orange-200 my-3 p-1 w-40 font-semibold text-white border rounded shadow-lg text-sm hover:translate-x-5 duration-300 group flex justify-between items-center px-2">Book Now <span><ion-icon name="chevron-forward-outline"></ion-icon></span></button>
      </div>
    </Link>
    </Suspense>
  )
}

export default Ture_Card
