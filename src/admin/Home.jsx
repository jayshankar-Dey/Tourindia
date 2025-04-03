import { Button, CircularProgress, Dialog, TextField } from "@mui/material";
import Navbar from "../AdminComponents/Navbar";
import AddTure from "../AdminComponents/AddTure";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarGroup } from "@mui/material";
import  UpdateTure  from "../AdminComponents/UpdateTure";

const Home = () => {
  const base = import.meta.env.VITE_BASE_API
  const [open, setopen] = useState(false);
  const [ture, setture] = useState([]);
  const [file, setfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search_name, setsearch_name] = useState("");
  const [search_state, setsearch_state] = useState("");
  const [uplodeImagePopup, setuplodeImagePopup] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [desPopup, setdesPopup] = useState(false);
  const[images, setimages] = useState([])
  const[description,setdescription]=useState("")
  const[updatePopup, setupdatePopup] = useState(false)
  const [id, setId] = useState("");
  const getAllTure = async () => {
    try {
      const response = await axios.get(
        `${base}/Ture?name=${search_name}&&state=${search_state}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Ture"),
          },
        }
      );
      setture(response.data.data);
    } catch (error) {
      toast.error("Error getting ture");
    }
  };
  useEffect(() => {
    getAllTure();
  }, [search_name, search_state,open,updatePopup]);

  ///image choose
  const handleimageChange = async (e) => {
    const finalImage = [];
    for (let items of e.target.files) {
      finalImage.push(items);
    }
    setfiles(finalImage);
  };


  ///uplode image
  const handleformSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
      const res = await axios.post(
        `${base}/add/multipleImage/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Ture"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setfiles([]);
      console.log(res.data);
      toast.success("Ture add successfully");
      getAllTure();
    } catch (error) {
      setLoading(false);
      toast.error("Error adding ture");
    }
  };

  //get gingle Ture
  const getTure = async (id) => {
    try {
      const response = await axios.get(`${base}/Ture/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Ture"),
        },
      });
      setimages(response.data.data[0].images)
      setId(response.data.data[0]._id)
    } catch (error) {
      toast.error("Error getting ture");
    }
  };

  //delete single image
  const deleteSingleImage = async (imgid) => {
    try {
      // tureid, imgid
      setLoading(true)
      const tureid=id
       await axios.post(`${base}/delete/image`,{tureid,imgid}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Ture"),
        },
        data: { imgid },
      });
      setdeletePopup(false);
      toast.success("Image delete successfully");
      getAllTure();
      setLoading(false)
    } catch (error) {
      toast.error("Error deleting image");
      setLoading(false)
    }
  };



  ///delete ture

  const HandledeleteTure=async()=>{
    try {
      setLoading(true)
      await axios.delete(`${base}/Ture/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Ture"),
        },
      });
      setdeletePopup(false);
      toast.success("Ture delete successfully");
      getAllTure();
      setLoading(false)
    } catch (error) {
      toast.error("Error deleting ture");
      setLoading(false)
    }
  }

  ///update descreption
  const handleDesSubmit=async()=>{
    try {
      setLoading(true)
     await axios.post(`${base}/add/multiple/des/${id}`, {des:description}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Ture"),
        },
      });
      setdesPopup(false);
      toast.success("Description update successfully");
      getAllTure();
      setLoading(false)
    } catch (error) {
      toast.error("Error updating description");
      setLoading(false)
    }
  }

  
  return (
    <>
      <Navbar />

      <div className="h-[92vh] bg-zinc-200">
        <div className="md:w-[70%] mx-auto h-full">
          <button
            onClick={() => setopen(!open)}
            className="bg-black m-3 text-white rounded font-semibold p-2 px-5"
          >
            Add
          </button>
          <Dialog open={open} onClose={() => setopen(!open)}>
            <AddTure open={setopen} />
          </Dialog>

          <div className="overflow-auto">
            <div className="py-4 p-2 flex gap-x-3">
              <TextField
                size="small"
                onChange={(e) => setsearch_state(e.target.value)}
                className="w-56"
                label="state"
                focused
              />

              <TextField
                size="small"
                onChange={(e) => setsearch_name(e.target.value)}
                className="w-56"
                label="Place"
                focused
              />
            </div>
            <table className="overflow-auto border shadow-lg bg-white rounded">
              <thead className="border border-black  bg-zinc-700 text-white">
                <tr className="*:p-3 *:border-r *:border-black">
                  <th className="w-80">Name</th>
                  <th className="w-60">State</th>
                  <th className="w-60"> Images</th>
                  <th className="w-56">Action</th>
                </tr>
              </thead>

              <tbody className="*:border border-zinc-400">
                {ture.map((t, index) => (
                  <tr
                    key={index}
                    className="*:p-1  *:border-r *:border-zinc-400"
                  >
                    <td>{t.name}</td>
                    <td>{t.state}</td>
                    <td>
                      <AvatarGroup max={4}>
                        {t.images.map((i) => (
                          <Avatar key={i} alt="Remy Sharp" src={i.url} />
                        ))}
                      </AvatarGroup>
                    </td>
                    <td className="flex gap-x-3">
                      <button onClick={()=>{
                        setdeletePopup(!deletePopup);
                        getTure(t._id);
                      }} className="bg-red-500   text-white rounded font-semibold px-3 p-1 ">
                        x
                      </button>

                      <button onClick={()=>{
                        setupdatePopup(!updatePopup);
                        setId(t._id);
                      }} className="bg-green-700   text-white rounded font-semibold px-2 p-1  ml-2">
                        <ion-icon name="create-outline"></ion-icon>
                      </button>

                      <button
                        onClick={() => {
                          setuplodeImagePopup(!uplodeImagePopup);
                          setId(t._id);
                        }}
                        className="bg-blue-500   text-white rounded font-semibold px-3 p-1 "
                      >
                        +
                      </button>

                      <button onClick={()=>{
                        setdesPopup(!desPopup);
                        setId(t._id);
                      }} className="bg-zinc-500   text-white rounded font-semibold px-3 p-1 ">
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ////uplodeImage */}
      <Dialog
        open={uplodeImagePopup}
        onClose={() => setuplodeImagePopup(!uplodeImagePopup)}
      >
        <form onSubmit={handleformSubmit} className="p-3 flex flex-col gap-4">
          <h1>Upload Image</h1>
          <input type="file" onChange={handleimageChange} multiple />
          <div>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained">
                Save
              </Button>
            )}
          </div>
          <AvatarGroup max={4}>
            {file?.map((img, i) => (
              <Avatar key={i} alt="Remy Sharp" src={URL.createObjectURL(img)} />
            ))}
          </AvatarGroup>
        </form>
      </Dialog>
      {/* ////uplodeImage */}


      {/* ///delete ture image */}
   <Dialog open={deletePopup} onClose={()=>setdeletePopup(!deletePopup)}>

    <div className="w-96 p-3 bg-white">
           <div className="flex gap-x-3 flex-wrap">
            {
              images.map((img, i) => (
                <div key={i} className="w-20 h-20 relative bg-gray-100 rounded-full cursor-pointer">
                  <img className="w-full h-full object-cover" src={img.url} />

                 {
                  loading?<div className="absolute top-3 right-3"><CircularProgress/></div>: <button onClick={()=>deleteSingleImage(img._id)} className="absolute top-3 right-3 bg-white px-2 text-red-600 rounded-full p-1"><ion-icon name="trash-outline"></ion-icon></button>
                 }
                </div>
              ))
            }
           </div>

           <div className="flex gap-x-2 mt-3">
            <button onClick={()=>setdeletePopup(!deletePopup)} className="w-full bg-blue-500 text-white rounded-full p-2 mt-3">Close</button>

            <button onClick={HandledeleteTure} className="w-full bg-red-500 text-white rounded-full p-2 mt-3">Delete</button>
           </div>
    </div>

   </Dialog>
      {/* ///delete ture */}


      <Dialog open={desPopup} onClose={()=>setdesPopup(!desPopup)}>
            <form onSubmit={handleDesSubmit} className="p-3 flex flex-col gap-4">
              <h1>Update Description</h1>
              <textarea
                value={description}
                placeholder="Add more description"
                onChange={(e) => setdescription(e.target.value)}
                rows="4"
                className="w-full h-64 border-2 p-4"
              />
              <div>
                {loading? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                )}
              </div>
            </form>
   
      </Dialog>


      {/* ///update Ture */}
      <Dialog open={updatePopup} onClose={()=>setupdatePopup(!updatePopup)}>
       
      <UpdateTure id={id} open={setupdatePopup}/>
      </Dialog>
    </>
  );
};

export default Home;
