/* eslint-disable react/prop-types */

import { Button } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css"
import { Link } from "react-router-dom";
import aboutimage from '../assets/about.webp'

const About = ({About}) => {
  
    Aos.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
  return (
    <>
      <div  className="flex  md:flex-row-reverse  flex-col bg-white shadow">
           <div data-aos="fade-right" className="md:w-1/2 w-full bg-white overflow-hidden shadow  *:w-full *:p-1 p-1 gap-x-2 *:object-cover *:object-center  *:h-60">
                {
                  About?.image?<img src={About.image.url} alt=""  />:<img src="https://www.traveldailynews.asia/wp-content/uploads/2024/01/Tourism-in-Thailand.png" alt="" className="duration-300 hover:scale-105 cursor-pointer" />
                }
                <img src={aboutimage} alt="" />
           </div>
           <div data-aos="fade-left" className="md:w-1/2 p-4 w-full">
             <div className="flex font-semibold flex-col h-full justify-start items-start gap-y-3">
             <h1 className="md:text-2xl px-1 text-xl my-3 font-mono">{About?.name}</h1>
             <p className="my-3 text-zinc-600">Travel is the movement of people between distant geographical locations. Travel can be done by foot, bicycle, automobile, train, boat, bus, airplane, ship or other means, with or without luggage, and can be one way or round trip. Travel can also include relatively short stays between successive movements, as in the</p>
             {/* {
              About?.des?.map((data,i)=>(
                <p key={i} className="font-thin mt-3" >{data}</p>
              ))
             } */}
             <p className="px-1 leading-7 text-zinc-600">{About?.des&&About.des[0]} <Link to={"/about"} className="ml-10 mt p-2"><Button variant="contained" size="small">Read more</Button> </Link> </p>
             </div>
          </div>
      </div>
    </>
  )
}

export default About
