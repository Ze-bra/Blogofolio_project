import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPost, getPost } from '../../../Services/PostServise'
import { PostType } from '../../../Types/Post'
import { nameof } from 'ts-simple-nameof'
import FormLayout from '../FormLayout'
import genericStyles from '../../../App.module.scss'
import styles from '../AddPostPage/styles.module.scss'
import FormElement from '../FormElement'
import FormButton from '../FormButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../Store'
import { creatPostAction } from '../../../Store/post/action'

const AddPostPage = () => {
    const params = useParams()
    const [post, setPost] = useState<PostType>({} as PostType)
    const breadcrumbs = [<Link to="/" className={genericStyles.link}>Back to Home</Link>]

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id != undefined) {
            getPost(params.id)
                .then(post => setPost(post))
        }
    })
    if (params.id != undefined) {
        breadcrumbs.push(
            <Link to={`/posts/${post.id}`} className={genericStyles.link}>
                {post.title}
            </Link>);
    }
    const [image, setImage] = useState<File | string>('')

    const [formErrors, setFormErrors] = useState<Partial<PostType>>({})

    const loadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setImage(file)
        }
    }
    const onChangeFormElement = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setFormErrors({
            ...formErrors,
            title: !post.title ? 'title is requed' : "",
            lesson_number: !post.lesson_number ? 'lesson_number is requed' : "",
            description: !post.description ? 'description is requed' : "",
            text: !post.text ? 'text is requed' : "",
            image: !image ? 'image is requed' : "",
        })

        if (post.title && post.lesson_number && post.description && post.text && image) {

            dispatch(creatPostAction(post, image as File, () => navigate('/')))
        }
    }

    return (
        <FormLayout
            title={params.id != undefined ? 'Edit Post' : 'Add Post'}
            breadcrumbs={breadcrumbs}>
            <form className={styles.singInBox} onSubmit={onFormSubmit} >
                <div className={genericStyles.row}>
                    <div className={genericStyles.col_12}>
                        <FormElement
                            type={'text'}
                            value={post.title}
                            placeholder={'Title'}
                            label={'Title'}
                            name={nameof<PostType>(p => p.title)}
                            component='TextBox'
                            onChangeFunction={onChangeFormElement}
                            error={formErrors.title}
                        />
                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <div className={[genericStyles.col_lg_5, genericStyles.col_md_12, , genericStyles.col_sm_12].join(' ')}>
                        <FormElement
                            type={'number'}
                            value={post.lesson_number}
                            placeholder={' '}
                            label={'Lesson number'}
                            name={nameof<PostType>(p => p.lesson_number)}
                            component='TextBox'
                            onChangeFunction={onChangeFormElement}
                            error={formErrors.lesson_number}
                        />
                    </div>
                    <div className={[genericStyles.col_lg_6, genericStyles.col_md_12, , genericStyles.col_sm_12].join(' ')}>
                        <FormElement
                            type={'file'}
                            value={post.image}
                            placeholder={'filename.jpeg'}
                            label={'Image'}
                            name={nameof<PostType>(p => p.image)}
                            component='TextBox'
                            onChangeFunction={loadImageHandler}
                            error={formErrors.image}
                        />
                    </div>
                </div>
                <div className={genericStyles.row}>
                    <div className={genericStyles.col_12}>
                        <FormElement
                            type={'text'}
                            value={post.description}
                            placeholder={'Add your text'}
                            label={'Description'}
                            name={nameof<PostType>(p => p.description)}
                            component='TextArea'
                            onChangeFunction={onChangeFormElement}
                            error={formErrors.description}
                        />
                    </div>
                </div>
                <div className={genericStyles.row}>
                    <div className={genericStyles.col_12}>
                        <FormElement
                            type={'text'}
                            value={post.text}
                            placeholder={'Add your text'}
                            label={'Text'}
                            name={nameof<PostType>(p => p.text)}
                            component='TextArea'
                            onChangeFunction={onChangeFormElement}
                            error={formErrors.text}
                        />
                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <div>
                        <FormButton
                            text='Cancel'
                            type='button'
                        />
                    </div>
                    <div >
                        <div>
                            <FormButton
                                text='Add post'
                                type='submit'
                            />
                        </div>
                    </div>
                </div>
            </form>
        </FormLayout >
    )
}

export default AddPostPage