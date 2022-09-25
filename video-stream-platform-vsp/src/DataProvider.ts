export interface IBase {
  slug: string;
  _id: string;
  date: string;
}

/****************************************/
/*********     Category     *************/
/****************************************/

export interface CategoryListProps extends IBase {
  categoryName: string;
}

/****************************************/
/*********     Users     *************/
/****************************************/

export interface UserDetailsProps extends IBase {
  name: string;
}

/****************************************/
/*********     Posts        *************/
/****************************************/

export interface VideoPostListProps extends IBase, UserDetailsProps {
  title: string;
  des: string;
  thumbnail: string;
  video: string;
  views: number;
  categoryBy: CategoryListProps;
  postedBy: UserDetailsProps;
  tags: [];
  likes: [];
  dislikes: [];
}

/****************************************/
/*********     Comments       ***********/
/****************************************/

export interface CommentListProps extends IBase {
  comment: string;
  postedBy: UserDetailsProps;
}
