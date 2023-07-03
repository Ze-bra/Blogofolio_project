import { PostListType } from '../Store/post/types';
import { PostPageType, PostType } from '../Types/Post'

const postsEndpoint = "https://studapi.teachmeskills.by/blog/posts";

export const getPost = (id: string | undefined) => {
    return fetch(`${postsEndpoint}/${id}`)
        .then(response => response.json())
        .then((result: PostType) => result)
}

export const getAllPosts = async (
    token: string | undefined,
    postListType: PostListType,
    page: number,
    limit: number,
    search?: string
) => {

    let offset = (page - 1) * limit;
    let endpoint = postsEndpoint
    if (postListType === "myPosts") {
        endpoint = `${endpoint}/my_posts/`
    }

    if (postListType === 'allPosts') {
        offset = offset - 1;
    }
    let headers = {};
    if (token) {
        headers = {
            'Authorization': `Bearer ${token}`
        }
    }

    let responce = await fetch(new Request(`${endpoint}?limit=${limit}&offset=${offset}${search ? '&search=' + search : ''}&ordering=-date`, {
        method: 'GET',
        headers: headers
    }));

    if (responce.status === 404) {
        return {} as PostPageType
    }
    const result = await responce.json()
    return result as PostPageType
}

export const createPost = async (
    form: PostType, image: File | string, token?: string
) => {

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('text', form.text)
    formData.append('discription', form.description)
    formData.append('lesson_num', form.lesson_number)
    formData.append('image', image)

    try {
        const response = await fetch(new Request('https://studapi.teachmeskills.by/blog/posts/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }))

        const result = await response.json()

        return {
            ok: response.ok,
            status: response.status,
            data: result
        }
    } catch (error: any) {
        return {
            ok: false,
            status: 400,
            data: error.message
        }
    }
}
