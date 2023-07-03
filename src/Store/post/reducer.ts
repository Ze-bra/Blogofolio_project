import { PostPageType } from '../../Types/Post';
import { ResponseErrors } from '../../Types/ResponseError1';
import { PostActionType, PostListType} from './types';
import { RegistrationActionName } from '../post/action';

const initialValue: PostPageType = {
  search: '',
  count: 0,
  results: [],
  currentPage: 1,
  listType: 'allPosts',
  errors: {}
}

export const PostReducer = (state: PostPageType = initialValue, action: PostActionType): PostPageType => {
  switch (action.type) {
    case RegistrationActionName.SET_SEARCH_VALUE:
      return {
        ...state,
        search: action.payload as string
      }
    case RegistrationActionName.SET_LIST_TYPE_VALUE:
      return {
        ...state,
        listType: action.payload as PostListType
      }
    case RegistrationActionName.SET_PAGE_VALUE:
      return {
        ...state,
        currentPage: action.payload as number
      }
    case RegistrationActionName.LOAD_POSTS:
      return {
        ...state,
        count: (action.payload as PostPageType).count,
        results: (action.payload as PostPageType).results
      }
    case RegistrationActionName.ADD_POST_FAIL:
      return {
        ...state,
        errors: (action.payload as ResponseErrors),
      }
    case RegistrationActionName.CLEAR_SEARCH:
      return {
        ...initialValue
      }
    case RegistrationActionName.LOAD_POSTS_FAILED:
      return {
        ...initialValue
      }
    default:
      return state
  }
}