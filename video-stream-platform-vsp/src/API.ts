import axios from "axios";
import { API_URL, headerConfig } from "./config";

/****************************************/
/*********     User         *************/
/****************************************/

export interface UserRegistrationProps {
  name: string;
  email: string;
  password: string;
}

export const userRegistration = async (props: UserRegistrationProps) => {
  const res = await axios.post(API_URL + "/registration", { ...props });
  return res;
};

export interface UserLoginProps {
  email: string;
  password: string;
}

export const userLogin = async (props: UserLoginProps) => {
  const res = await axios.post(API_URL + "/login", { ...props });
  return res;
};

/****************************************/
/*********     Category      *************/
/****************************************/

export interface CreateCategoryProps {
  categoryName: string;
}

export const createCategory = async (props: CreateCategoryProps) => {
  const res = await axios.post(
    API_URL + "/create-category",
    { ...props },
    headerConfig()
  );
  return res;
};

export const getCategoryList = async () => {
  const res = await axios.get(API_URL + "/category-list");
  return res;
};

export const deleteCategory = async (id: number) => {
  const res = await axios.delete(
    API_URL + "/delete-category/" + id,
    headerConfig()
  );
  return res;
};

// to get category info

export const getCategoryInfo = async (slug: string) => {
  const res = await axios.get(API_URL + "/category-details/" + slug);
  return res;
};

// to get posts by category

export const getPostsByCategory = async (slug: string) => {
  const res = await axios.get(API_URL + "/posts-by-category/" + slug);
  return res;
};

/****************************************/
/*** Upload Image and Video to AWS S3  **/
/****************************************/

export interface UploadImageProps {
  image: any;
}

export const uploadImage = async (props: UploadImageProps) => {
  const res = await axios.post(
    API_URL + "/upload-image",
    { ...props },
    headerConfig()
  );
  return res;
};

export interface UploadVideoProps {
  video: any;
}

export const uploadVideo = async (props: UploadVideoProps) => {
  const res = await axios.post(
    API_URL + "/upload-video",
    { ...props },
    headerConfig()
  );
  return res;
};

/****************************************/
/*********   Video  Posts     ***********/
/****************************************/

export interface CreateVideoPostsProps {
  title: string;
  des: string;
  thumbnail: string;
  video: string;
  categoryBy: string;
  tags: [] | any;
}

export const createVideoPosts = async (props: CreateVideoPostsProps) => {
  const res = await axios.post(API_URL + "/create-post",{ ...props },headerConfig());
  return res;
};

export const getLogedInUserPosts = async () => {
  const res = await axios.get(
    API_URL + "/get-logedin-user-posts",
    headerConfig()
  );
  return res;
};

export const deleteLogedInUserPost = async (id: number) => {
  const res = await axios.delete(
    API_URL + "/delete-post/" + id,
    headerConfig()
  );
  return res;
};

export const getAllVideoPostsRandomly = async () => {
  const res = await axios.get(API_URL + "/get-all-posts");
  return res;
};

// to get trending posts

export const getAllTrendingPosts = async () => {
  const res = await axios.get(API_URL + "/trending-posts");
  return res;
};

// to search video post

export const searchVideoPosts = async (searchquery:string) => {
  const res = await axios.get(API_URL + `/search${searchquery}`);
  return res;
};


/****************************************/
/********* User Public Profile **********/
/****************************************/

// to get user public profile details

export const getUserPublicProfileDetails = async (slug: any) => {
  const res = await axios.get(API_URL + "/user-profile-details/" + slug);
  return res;
};

// to get user all posts in public profile

export const getUserAllPostsforPublicProfile = async (slug: any) => {
  const res = await axios.get(API_URL + "/user-profile-allposts/" + slug);
  return res;
};

export const getUserNewlyPublishedPosts = async (slug: any) => {
  const res = await axios.get(API_URL + "/user-newly-published-posts/" + slug);
  return res;
};

export const getUserMostViewedPosts = async (slug: any) => {
  const res = await axios.get(API_URL + "/user-most-viewed-posts/" + slug);
  return res;
};

/****************************************/
/********* Single Post Details **********/
/****************************************/

export const getSinglePostDetails = async (slug: any) => {
  const res = await axios.get(API_URL + "/details-post/" + slug);
  return res;
};

/****************************************/
/*           Simillar Posts  ***********/
/****************************************/

// Similar posts by same category

export const getPostsBySimillarCategory = async (slug: any) => {
  const res = await axios.get(API_URL + "/posts-bysame-category/" + slug);
  return res;
};

// Similar posts by same user

export const getPostsBySameUser = async (slug: any) => {
  const res = await axios.get(API_URL + "/posts-bysame-postedby-user/" + slug);
  return res;
};

/****************************************/
/*            Comment                   */
/****************************************/

export interface CreateCommentProps {
  comment: string;
  videoPostId: string;
}

export const createComment = async (props: CreateCommentProps) => {
  const res = await axios.post(
    API_URL + "/post-comments",
    { ...props },
    headerConfig()
  );
  return res;
};

export const getPostComments = async (slug: any) => {
  const res = await axios.get(API_URL + "/get-comments/" + slug);
  return res;
};

export const deleteComments = async (id: string) => {
  const res = await axios.delete(
    API_URL + "/delete-comment/" + id,
    headerConfig()
  );
  return res;
};

/****************************************/
/*      Add Like and Dislike            */
/****************************************/

export interface AddLikeToVideoPostsProps {
  videopostId: string;
}

export const addLike = async (props:AddLikeToVideoPostsProps) => {
  const res = await axios.put(API_URL + "/likes",{...props}, headerConfig());
  return res;
};

export const addDisLike = async (props:AddLikeToVideoPostsProps) => {
  const res = await axios.put(API_URL + "/dislikes",{...props}, headerConfig());
  return res;
};
