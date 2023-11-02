import Link from "next/link";
import { useRouter } from "next/router";
import { setUser } from "../../store/slice/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { authLogout } from "../../utils/isAuth";

export const Header = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(setUser(undefined))
        authLogout()
    }
    return (
        <header className="fixed flex justify-between items-center py-4 px-20 top-0 bg-gray-300 w-screen">
            <div className="flex gap-5 items-center">
                <Link className={`${router.pathname == "/" ? "bg-blue-300" : "bg-blue-600"} text-lg text-white rounded-xl px-4 py-2`} href='/'>Главная</Link>
                <span>/</span>
                <Link className={`${router.pathname == "/title-editor" ? "bg-blue-300" : "bg-blue-600"} text-lg text-white rounded-xl px-4 py-2`} href='/title-editor'>Редактировать заголовки сайта</Link>
                <span>/</span>
                <Link className={`${router.pathname == "/text-editor" ? "bg-blue-300" : "bg-blue-600"} text-lg text-white rounded-xl px-4 py-2`} href='/text-editor'>Добавить текст перед рейтингом компаний</Link>
            </div>
            <div>
                <button onClick={logout} className="rounded-xl text-white bg-blue-600 px-5 py-2">Выйти</button>
            </div>
        </header>
    );
};