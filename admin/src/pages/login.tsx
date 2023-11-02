import { NextPageContext } from "next"
import { useLoginUserMutation } from "../services/adminApi"
import { authLogin, isAuth } from "../utils/isAuth"
import { toast } from "react-toastify"
import { useAppDispatch } from "../store/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { IUser } from "../types/user"
import { setCredentials, setUser } from "../store/slice/authSlice"
import { useRouter } from "next/router"


export default function Login() {
  const [loginUser] = useLoginUserMutation()

  const router = useRouter()

  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<IUser>();

  const submitForm: SubmitHandler<IUser> = (data) => {
    loginUser({
      login: data.login,
      password: data.password
    })
      .unwrap()
      .then(async (res) => {
        const token = res.token
        localStorage.setItem('token', token)
        dispatch(setCredentials(res))
        dispatch(setUser(res.user))
        await authLogin({ token })
          .then(() => {
            router.push('/')
            toast.success('Вход в систему', {
              position: toast.POSITION.BOTTOM_RIGHT,
            })
          })
          .catch(() => {
            toast.error('Что-то пошло не так....', {
              position: toast.POSITION.BOTTOM_RIGHT,
            })
          })
      })
      .catch(() => {
        toast.error('Что-то пошло не так....', {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      })
  }

  return (
    <main className="w-screen flex items-center justify-center h-screen bg-slate-100">
      <section className="flex flex-col gap-5">
        <h1 className="text-2xl">Вход в аккаунт</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(data => submitForm(data))}>
          <input placeholder="username" className="bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" {...register('login', { required: true })} />
          <input placeholder="123456789" className="bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" {...register('password', { required: true })} />
          <div className="flex justify-center">
            <button className="rounded-xl text-white bg-blue-600 px-5 py-2" type="submit">Войти</button>
          </div>
        </form>
      </section>
    </main>
  )
}


export const getServerSideProps = async (ctx: NextPageContext) => {
  const isAuthencate = await isAuth(ctx)

  if (isAuthencate) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}
