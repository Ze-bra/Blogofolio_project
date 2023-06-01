import React, { useCallback, useState } from 'react'
import styles from './styles.module.scss'
import genericStyles from '../../../App.module.scss'
import FormLayout from '../FormLayout'
import FormElement from '../FormElement'
import FormButton from '../FormButton'
import { FormType } from '../../../Types/Form'
import { Link } from 'react-router-dom'

// const fakeApi = {
//   login: async (login: string, password: string) => {
//     return login == 'admin' && password == 'admin'
//   }
// }

const Success = () => {
  const [form, setForm] = useState({
    email: '',
  } as FormType)

  // const handleOnClick = useCallback(() => {
  //   fakeApi.login(form.email, form.pass)
  //     .then(result => alert(result ? 'Вы вошли' : 'Поробуйте еще раз'))
  // }, [form])

  // const handleOnChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
  //   setForm({
  //     ...form,
  //     [e.currentTarget.id]: e.currentTarget.value
  //   })
  // }, [form])

  const breadcrumbs = [<Link to="/" className={genericStyles.link}>Back to Home</Link>]

  return (
    <FormLayout
      title={'Success'}
      breadcrumbs={breadcrumbs}
    >
      <div className={[genericStyles.row].join(' ')}>
        <div className={[genericStyles.col_lg_7, genericStyles.offset_lg_2_5, genericStyles.col_12].join(' ')}>
          <form className={[genericStyles.bordered_box, styles.sing_in_box].join(' ')}>
            <div className={genericStyles.row}>
              <div className={[genericStyles.col_12, genericStyles.m_t_25, genericStyles.content_center].join(' ')}>
                <span className={genericStyles.help_text}>
                  Email confirmed. <br /> Your registration is now completed
                </span>
              </div>
            </div>
            <div className={genericStyles.row}>
              <div className={genericStyles.col_12}>
                <FormButton
                  // onClick={handleOnClick}
                  text="Go to home"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormLayout >
  )
}

export default Success


