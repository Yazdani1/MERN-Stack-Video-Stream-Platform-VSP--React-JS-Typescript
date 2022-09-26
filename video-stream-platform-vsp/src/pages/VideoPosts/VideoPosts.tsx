import { useContext, useState } from "react";
import Resizer from "react-image-file-resizer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./VideoPosts.css";
import DashboarPageLayout from "../PageLayout/DashboarPageLayout";
import CardLayout from "../../components/CardLayout";
import { CategoryContext } from "../../ContextAPI/CategoryContext";
import {
  UploadImageProps,
  uploadImage,
  UploadVideoProps,
  uploadVideo,
  CreateVideoPostsProps,
  createVideoPosts,
} from "../../API";
import { API_URL, headerConfig } from "../../config";

const VideoPosts = () => {
  const categoryListContext = useContext(CategoryContext);

  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [videoFileName, setVideoFileName] = useState("");



  // to post

  const [posTitle, setPostTitle] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [chooseCategory, setChooseCategory] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [tags, setTags] = useState([]);

  const handleTags = (e:any) => {
    setTags(e.target.value.split(","));
  };


  // to progress bar while upload video
  const [progress, setProgress] = useState(0);

  // to show image name in the form when user upload image
  const [showFileName, setShowFileName] = useState<string>("");

  // to upload image

  const handleImage = (e: any) => {
    setLoading(true);
    let file = e.target.files[0];

    setShowFileName(file.name);
    setPreview(window.URL.createObjectURL(file));

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        const payload: UploadImageProps = { image: uri };

        const { data } = await uploadImage(payload);
        console.log(data);
        if (data) {
          toast.success("Thumbnail Uploaded", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
          setImage(data.Location);
          setLoading(false);
        }
      } catch (error: any) {
        toast.error(error.response && error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      }
    });
  };

  // to upload video

  const handleVideo = async (e: any) => {
    setLoading(true);
    try {
      const file = e.target.files[0];
      setVideoFileName(file.name);

      const videoData = new FormData();

      videoData.append("video", file);

      // const payload: UploadVideoProps = {video:videoData}

      // const {data} = await uploadVideo(payload);

      const { data } = await axios.post(
        API_URL + "/upload-video",
        videoData,
        headerConfig()
      );

      if (data) {
        toast.success("Video Uploaded", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
        setVideo(data.Location);
      }
    } catch (error) {
      console.log(error);
      toast.error("Video Upload Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  // to create video posts

  const onSubmitCreateVideoPost = async (e: any) => {
    setLoading(true);

    e.preventDefault();
    try {
      const payload: CreateVideoPostsProps = {
        title: posTitle,
        des: des,
        thumbnail: image,
        video: video,
        categoryBy: chooseCategory,
        tags:tags
      };

      const res = await createVideoPosts(payload);

      if (res) {
        toast.success("Video published successfully ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPostTitle("");
        setDes("");
        setChooseCategory("");
        setVideo("");
        setImage("");
        setVideoFileName("");
        setPreview("");
        setTags([]);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  return (
    <DashboarPageLayout>
      <CardLayout title="Create Video Post" backgroun_color="white">
        <p>Video Link: {video}</p>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="form-designs">
              <form>
                <div className="contact-form">
                  <label className="form-lebel">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={posTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </div>

                <div className="contact-form">
                  <label className="form-control" style={{ height: "50px" }}>
                    {showFileName ? showFileName : "Upload Thumbnail"}
                    <input
                      type="file"
                      onChange={handleImage}
                      className="form-control"
                      placeholder="Select a Image"
                      accept="image/*"
                      hidden
                    />
                  </label>
                  {image}
                  {preview && (
                    <img
                      src={preview}
                      height="50px"
                      width="50px"
                      style={{
                        borderRadius: "90px",
                        objectFit: "cover",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    />
                  )}
                </div>

                <div className="contact-form">
                  <label className="form-lebel">Choose Category:</label>
                  <select
                    className="custom-select"
                    value={chooseCategory}
                    onChange={(e) => setChooseCategory(e.target.value)}
                  >
                    {categoryListContext &&
                      categoryListContext.map((categroy: any, index: any) => (
                        <>
                          <option key={index} value={categroy._id}>
                            {categroy.categoryName}
                          </option>
                        </>
                      ))}
                  </select>
                </div>

                <div className="contact-form">
                  <label className="form-control" style={{ height: "50px" }}>
                    {videoFileName ? videoFileName : "Upload Video"}
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleVideo}
                      placeholder="Upload Video"
                      accept="video/*"
                      hidden
                    />
                  </label>
                </div>

                <div className="contact-form">
                  <label className="form-lebel">Description:</label>
                  <textarea
                    maxLength={3500}
                    className="form-control"
                    rows={4}
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                  />
                </div>

                <div className="contact-form">
                  <label className="form-lebel">Tags:</label>
                  <input
                    type="text"
                    className="form-control"
                    
                    onChange={handleTags}
                  />
                </div>

                <div
                  className="button-submit"
                  onClick={(e) => onSubmitCreateVideoPost(e)}
                >
                  <p>{loading ? "Uploading..." : "Create Post"}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={8000} />
      </CardLayout>
    </DashboarPageLayout>
  );
};

export default VideoPosts;
