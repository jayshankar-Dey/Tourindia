import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loginFalse, loginTrue } from "../redux/LoginSlice"


const Footer = () => {
  const dispatch=useDispatch()
   const {user}=useSelector(state=>state.user)
  return (
    <div className="w-full h-fit p-1 text-white shadow-lg border bg-zinc-800">
      <div className="md:w-[80%] mx-auto ">

      <div className="flex justify-start items-center h-36 ">
        <div  className="flex w-96 gap-x-3" >
           
            <button onClick={()=>{
              if(user || localStorage.getItem("Ture")){
                dispatch(loginFalse())
              }else{
                dispatch(loginTrue())
              }
            }} className="bg-zinc-100 hover:scale-x-105 duration-300 border  rounded font-semibold shadow text-black py-2 px-5">Subscribe</button>
        </div>
      </div>
   


      <div className="flex gap-x-2 text-zinc-400  text-sm font-thin   justify-between ">
        <div className="flex flex-col gap-y-2">
            <a href="#Home" className="text-gray-300 hover:text-gray-800 hover:bg-gray-50">Home</a>
                     <Link to={'/about'} className="text-gray-300 hover:text-gray-800 hover:bg-gray-50">Privacy Policy
                     </Link>
                     <a href="#Ture" className="text-gray-300 hover:text-gray-800 hover:bg-gray-50">Tour</a>
                     <Link to={'/blog'} className="text-gray-300 hover:text-gray-800 hover:bg-gray-50">Blogs</Link>
                     <Link to={'/galery'} className="text-gray-300 hover:text-gray-800 hover:bg-gray-50">Gallery</Link>
                     <a href="#Contact" className="text-gray-300 hover:text-gray-800 hover:bg-gray-50">Contact</a>
        </div>
        <ul style={{fontSize:".6rem"}} className="text-sm uppercase">
            <li>psum dolor sit.</li>
            <li> jm dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> sum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> psum dolor sit.</li>
        </ul>
       
        <ul style={{fontSize:".6rem"}} className="text-sm uppercase">
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
        </ul>
        <ul style={{fontSize:".6rem"}} className="text-sm uppercase">
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
            <li> ipsum dolor sit.</li>
        </ul>
      </div>


      <div className="flex justify-center mt-10 mb-4 font-semibold text-zinc-400" >
        <p>@ copy ride consectetur adipisicing elit. Itaque, possimus!</p>
      </div>

      </div>
    </div>
  )
}

export default Footer
