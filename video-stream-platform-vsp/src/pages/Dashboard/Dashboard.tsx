import { useEffect, useState } from "react";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DashboarPageLayout from "../PageLayout/DashboarPageLayout";
import { ToastContainer, toast } from "react-toastify";
import { getLogedInUserPosts, deleteLogedInUserPost } from "../../API";
import CardLayout from "../../components/CardLayout";
import "./Dashboard.css";
const Dashboard = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  // to load logedin user posts

  const loadAllPosts = async () => {
    try {
      const res = await getLogedInUserPosts();

      if (res) {
        setAllPosts(res.data);
      }
    } catch (error) {
      toast.error("Video Upload Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // to delete logedin user post

  const deletePost = async (id: number) => {
    try {
      const res = await deleteLogedInUserPost(id);

      if (res) {
        toast.success("Post Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllPosts();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  return (
    <DashboarPageLayout>
      <CardLayout backgroun_color="white">
        <div className="container-fluid main_containers">
          {/* table start */}

          <div className="table-horizontal">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Video title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Published on</th>
                  <th scope="col">Category</th>
                  <th scope="col">Total views</th>
                  <th scope="col">View</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allPosts &&
                  allPosts.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>

                      <td className="dashboard-post-image">
                        <img
                          src={item.thumbnail}
                          
                          style={{ objectFit: "cover" }}
                        />
                      </td>

                      <td>{item.title.substring(0, 30)}</td>
                      <td>{item.des?.substring(0, 70)}</td>

                      <td> {moment(item.date).format("MMMM Do YYYY")}</td>
                      <td>{item.categoryBy?.categoryName}</td>

                      <td>
                        <button className="btn btn-primary">{item.views} views</button>
                      </td>

                      <td>
                        <button className="btn btn-success">
                          <FaEdit size={20} /> Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deletePost(item._id)}
                        >
                          <MdDelete size={20} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardLayout>

      <ToastContainer autoClose={8000} />
    </DashboarPageLayout>
  );
};

export default Dashboard;
