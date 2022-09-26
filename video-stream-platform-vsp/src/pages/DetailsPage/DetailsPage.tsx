import React, { useEffect, useState, useContext } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FcExpand, FcCollapse } from "react-icons/fc";
import PageLayout from "../PageLayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import SinglePost from "./SinglePost";
import RelatedPosts from "./RelatedPosts";
import ContainerMargin from "../../components/ContainerMargin";
import MorePostsByUser from "./MorePostsByUser";
import Comment from "./Comment";
import { UserContext } from "../../ContextAPI/UserContext";
import {
  fetchStart,
  getSinglePostData,
  fetchFailure,
  like,
  dislike,
} from "../../redux/videoPostSlice";
import Skelton from "../../components/Skelton";
import "./DetailsPage.css";
import { getPostComments } from "../../API";

import {
  getSinglePostDetails,
  getPostsBySimillarCategory,
  getPostsBySameUser,
  createComment,
  CreateCommentProps,
  deleteComments,
} from "../../API";
import { VideoPostListProps } from "../../DataProvider";
import { addLike, addDisLike, AddLikeToVideoPostsProps } from "../../API";

const DetailsPage = () => {
  const { slug } = useParams();
  let navigate = useNavigate();

  const [singlePostDetails, setSinglePostDetails] =
    useState<VideoPostListProps>();

  const [relatedPostsByCategory, setRelatedPostsByCategory] = useState<any[]>();
  const [relatedPostsByUser, setRelatedPostsByUser] = useState([]);
  const [currentUser] = useContext(UserContext);

  // redux toolkit
  const dispatch = useDispatch();

  // to get all comments

  const [allComments, setAllComments] = useState([]);

  const [loading, setLoading] = useState(true);

  // to create comments

  const [addComment, setAddComment] = useState("");

  const [show, setShow] = useState(true);

  const handleCollapse = () => {
    setShow(!show);
  };

  /****************************************/
  /********* Single Post Details **********/
  /****************************************/

  const loadSinglePostDetails = async () => {
    setLoading(true);

    try {
      const res = await getSinglePostDetails(slug);
      if (res) {
        setSinglePostDetails(res.data);
        dispatch(getSinglePostData(res.data));

        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  /****************************************/
  /* Simillar Posts By Same Category ******/
  /****************************************/

  const loadSimillarPostsBySameCategory = async () => {
    try {
      const res = await getPostsBySimillarCategory(slug);
      if (res) {
        setRelatedPostsByCategory(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /* Simillar Posts By Same User Posts ****/
  /****************************************/

  const loadSimillarPostsBySameUser = async () => {
    try {
      const res = await getPostsBySameUser(slug);
      if (res) {
        setRelatedPostsByUser(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /*         Create Comments          ****/
  /****************************************/

  const onSubmitCreateComments = async (e: any) => {
    e.preventDefault();
    try {
      const payload: CreateCommentProps = {
        comment: addComment,
        videoPostId: singlePostDetails?._id!,
      };

      console.log(singlePostDetails?._id!);
      const res = await createComment(payload);
      if (res) {
        toast.success("Comment created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllComments();
        setAddComment("");
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /*         Get All Comments          ****/
  /****************************************/

  const loadAllComments = async () => {
    try {
      const res = await getPostComments(slug);
      if (res) {
        setAllComments(res.data);
      }
    } catch (error: any) {}
  };

  /****************************************/
  /*         Delete Comments            ***/
  /****************************************/

  const deleteComment = async (id: string) => {
    try {
      const res = await deleteComments(id);

      if (res) {
        toast.success("Comment deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllComments();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadSinglePostDetails();
    loadSimillarPostsBySameCategory();
    loadSimillarPostsBySameUser();
    loadAllComments();
  }, [slug, dispatch]);

  return (
    <PageLayout>
      <ContainerMargin />
      <div className="container-fluid">
        {loading ? (
          <div className="row">
            {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12].map((item, index) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <Skelton />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
              <SinglePost
                post={singlePostDetails!}
                single_postid={singlePostDetails?._id!}
              />

              <div className="more-posts-section">
                <h6>
                  More posts by{" "}
                  <Link
                    to={"/channel/" + singlePostDetails?.postedBy?.slug}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    {singlePostDetails?.postedBy?.name}
                  </Link>
                </h6>

                <p onClick={handleCollapse}>
                  {show ? (
                    <FcCollapse color="white" />
                  ) : (
                    <FcExpand color="white" />
                  )}
                </p>
              </div>

              {/* /****************************************/
              /*         More Posts by Same User      ****/
              /******************************************/}

              {show && <MorePostsByUser video={relatedPostsByUser!} />}
              <ContainerMargin />

              <CardLayout backgroun_color="white">
                <div className="row">
                  <div className="col-xl-10 col-lg-10">
                    <div className="contact-formfdsfdsfdsfds">
                      <textarea
                        maxLength={3500}
                        className="form-control"
                        rows={2}
                        placeholder="Add a comment"
                        value={addComment}
                        onChange={(e) => setAddComment(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-xl-1 col-lg-1">
                    <div
                      className="btn btn-success"
                      onClick={(e) => {
                        {
                          if (!currentUser?.user) {
                            navigate("/signin");
                          } else {
                            onSubmitCreateComments(e);
                          }
                        }
                      }}
                    >
                      Comment
                    </div>
                  </div>
                </div>
              </CardLayout>

              {/* /****************************************/
              /*         Get All Comments             ****/
              /******************************************/}
              <h5>{allComments.length} Comments</h5>

              {allComments &&
                allComments.map((comments, index) => (
                  <div key={index}>
                    <Comment comment={comments} onDelete={deleteComment} />
                    <hr />
                  </div>
                ))}
            </div>

            {/* /****************************************/
            /*         Related Posts               ****/
            /******************************************/}

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              {relatedPostsByCategory &&
                relatedPostsByCategory.map((video, index) => (
                  <div key={video._id}>
                    <RelatedPosts video={video} index={index} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default DetailsPage;
