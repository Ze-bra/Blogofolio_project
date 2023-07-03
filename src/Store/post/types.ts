import { PostPageType } from "../../Types/Post"
import { ResponseErrors } from "../../Types/ResponseError1";

export type PostListType =
  | 'myPosts'
  | 'allPosts';

export type PostActionType = {
  type: string;
  payload?: PostPageType | ResponseErrors | string | number | PostListType
}

export type SearchStateType = {
  search: string
}