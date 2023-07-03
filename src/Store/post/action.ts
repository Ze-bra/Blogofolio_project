import { AppThunk } from '..'
import { createPost, getAllPosts } from "../../Services/PostServise"
import { PostType } from '../../Types/Post'
import { ResponseErrors } from '../../Types/ResponseError1'
import { PostListType} from './types'

export const RegistrationActionName = {
  SET_SEARCH_VALUE: "SET_SEARCH_VALUE",  
  SET_PAGE_VALUE: "SET_PAGE_VALUE",  
  SET_LIST_TYPE_VALUE: "SET_LIST_TYPE_VALUE",  
  LOAD_POSTS: "LOAD_POSTS",  
  CLEAR_SEARCH: "CLEAR_SEARCH",  
  LOAD_POSTS_FAILED: "LOAD_POSTS_FAILED",
  ADD_POST_FAIL: "ADD_POST_FAIL"  
} as const

const loadPostsAction = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState().post
    getAllPosts(
      getState().authentication.tokens?.access,
      state.listType,
      state.currentPage,
      12,
      state.search)
      .then(items => dispatch({
        type: RegistrationActionName.LOAD_POSTS,
        payload: items
      }))
  }
}

export const setSearchValueAction = (search: string): AppThunk => {
  return (dispatch) => {
    if (search) {
      dispatch({
        type: RegistrationActionName.SET_SEARCH_VALUE,
        payload: search
      })
      dispatch(loadPostsAction())
    }
    else {
      dispatch({
        type: RegistrationActionName.CLEAR_SEARCH
      })
    }
  }
}

export const setPageValueAction = (currentPage: number): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: RegistrationActionName.SET_PAGE_VALUE,
      payload: currentPage
    })
    dispatch(loadPostsAction())
  }
}

export const setListTypeValueAction = (listType: PostListType): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: RegistrationActionName.SET_LIST_TYPE_VALUE,
      payload: listType
    })
  }
}

const addPostFail = (errors: ResponseErrors | string) => {
  return {
    type: RegistrationActionName.ADD_POST_FAIL,
    payload: errors
  }
}

export const creatPostAction = (form: PostType, image: File, cb?: () => void): AppThunk => {
  return (dispatch, getState) => {
    createPost(form, image, getState().authentication.tokens?.access)
      .then(response => {
        if (!response.ok) {
          return dispatch(addPostFail(response.data))
        }

        if (cb) {
          cb()
        }

      })
  }
}






