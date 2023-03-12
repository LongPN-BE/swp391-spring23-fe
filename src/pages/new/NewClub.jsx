import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { clubInput } from "../../formSource";
import axios from "../../AxiosConfig";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

var path = "clubs/";
var pathStadium = "stadiums/";
const New = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [stadiumId, setStadiumId] = useState([]);
  const [dataStadium, setDataStadium] = useState([]);
  const { loading } = useState(false);
  useEffect(
    function () {
      //data stadium
      axios.get("stadiums/")
        .then(function (data) {
          console.log(data.data);
          setDataStadium(data.data)
        })
        .catch(function (err) {
          console.log(32, err);
        });
    },
    []
  );

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/dg7i8w3xh/image/upload", data);

      const { url } = uploadRes.data;

      const newClub = {
        ...info,
        stadiumId: stadiumId,
        logo: url,
      };
      console.log("handle click", newClub)
      await axios.post("/clubs", newClub);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top"></div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {clubInput.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}


              <div className="formInput" >
                <label>Stadium</label>
                <select name="stadiumId"
                  onChange={e => setStadiumId(e.target.value)}>
                  {loading
                    ? "loading.."
                    : dataStadium &&
                    dataStadium.map((data) => (
                      <option key={data._id} value={data._id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <button onClick={handleClick} type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
