import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import genericStyles from '../../../App.module.scss'
import FormLayout from '../FormLayout'
import FormElement from '../FormElement'
import FormButton from '../FormButton'
import { FormType } from '../../../Types/Form'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, AppState } from '../../../Store'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../../Store/authentication/actions'

const SingIn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [form, setForm] = useState<FormType>({
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState<Partial<FormType>>({})
  const errors = useSelector((state: AppState) => state.authentication.errors)

  useEffect(() => {
    setFormErrors({
      ...formErrors,
      email: (errors?.detail ?? "") + (errors?.email?.join("; ") ?? ""),
      password: errors?.password?.join("; "),
    })

  }, [errors])

  const onChangeFormElement = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormErrors({})
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }, [form, setForm])

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = form
    setFormErrors({
      ...formErrors,
      password: !password ? 'Password is requed' : "",
      email: !email ? 'email is requed' : "",
    })

    if (email && password) {
      dispatch(loginAction(email, password, () => navigate('/')))
    }
  }

  const breadcrumbs = [<Link to="/" className={genericStyles.link}>Back to Home</Link>]

  return (
    <FormLayout
      title={'Sign In'}
      breadcrumbs={breadcrumbs}
    >
      <div className={genericStyles.row}>
        <div className={[genericStyles.col_lg_7, genericStyles.offset_lg_2_5, genericStyles.col_12].join(' ')}>
          <form onSubmit={onFormSubmit} className={[genericStyles.bordered_box, styles.sing_in_box].join(' ')}>
            <div className={genericStyles.row}>
              <div className={genericStyles.col_12}>
                <FormElement onChangeFunction={onChangeFormElement}
                  name={'email'}
                  type={'text'}
                  placeholder={'Your email'}
                  label={'Email'}
                  value={''}
                  component='TextBox'
                />
                <div className={genericStyles.row}>
                  <div className={[genericStyles.col_12, genericStyles.m_t_10].join(" ")}>
                    {
                      formErrors?.email && (
                        <label className={styles.errors}>
                          {formErrors.email}
                        </label>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className={genericStyles.row}>
              <div className={genericStyles.col_12}>
                <FormElement onChangeFunction={onChangeFormElement}
                  name={'password'}
                  type={'password'}
                  placeholder={'Your password'}
                  label={'Password'}
                  value={''}
                  component='TextBox'
                />
              </div>
              <div className={genericStyles.row}>
                <div className={[genericStyles.col_12, genericStyles.m_t_10].join(" ")}>
                  {
                    formErrors?.password && (
                      <label className={styles.errors}>
                        {formErrors.password}
                      </label>
                    )
                  }
                </div>
              </div>
            </div>
            <div className={genericStyles.row}>
              <div className={genericStyles.col_12}>
                <FormButton
                  text="Sign In"
                />
              </div>
            </div>
            <div className={genericStyles.row}>
              <div className={[genericStyles.col_12, genericStyles.m_t_25, genericStyles.content_center].join(' ')}>
                <span className={genericStyles.help_text}>
                  Don’t have an account?
                  <Link to="/singup" className={genericStyles.link}>
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormLayout >
  )
}

export default SingIn


