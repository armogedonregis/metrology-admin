import { NextPageContext } from "next"
import { isAuth } from "../utils/isAuth"
import { useGetAllNotesQuery, useGetUserQuery, useUpdateNoteMutation } from "../services/adminApi"
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import { QuillFormats, QuillModules } from "../components/quillFormats"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Header } from "../components/header"
import parse from 'html-react-parser'
import { toast } from "react-toastify"


export default function TextEditor() {
  const { data } = useGetUserQuery(undefined)


    const {
      data: note,
      isLoading,
      error,
    } = useGetAllNotesQuery(undefined, {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    })
  
    const [bottomValue, setBottomValue] = useState('')
    const [topValue, setTopValue] = useState('')
    const [editOpen, setEditOpen] = useState<boolean>(false)
  
    useEffect(() => {
      if(note) { 
        setBottomValue(note.top)
        setTopValue(note.top)
      }
    }, [note])

    const [updateNote] = useUpdateNoteMutation()

  const editNoteSend = async () => {
    updateNote({
      id: note.id,
      data: {
        top: topValue,
        bottom: bottomValue
      },
    })
      .unwrap()
      .then(() => {
        setEditOpen(false)
        toast.success('Текст успешно отредактирован', {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      })
      .catch(() => {
        toast.error('Что-то пошло не так....', {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      })
  }

 
  return (
    <main className="w-screen h-screen mb-20 px-5 bg-slate-100">
     <Header />
      <section className="flex pt-20 flex-col gap-5">
        <div className="flex flex-col rounded-2xl bg-white p-12">
        <h3 className="text-2xl text-center mb-5">Блок перед рейтингом</h3>
        <div className="flex justify-center mb-10 gap-5">
          <button onClick={() => setEditOpen(editOpen => !editOpen)} className="rounded-xl text-white bg-blue-600 px-5 py-2">{editOpen ? "закрыть" : "Открыть"} редактирование</button>
          {editOpen && <button onClick={editNoteSend} className="rounded-xl text-white bg-green-600 px-5 py-2">Сохранить</button>}
        </div>
        {!editOpen && note && <div>{parse(note.top)}</div>}
          {editOpen &&
            <ReactQuill
            className="h-[400px]"
            formats={QuillFormats}
            modules={QuillModules}
            value={topValue}
            onChange={setTopValue}
            placeholder="Напишите свой текст здесь..."
          />
        }
        </div>
        <div className="flex flex-col rounded-2xl bg-white p-12">
          <h3 className="text-2xl text-center mb-5">Блок после рейтинга</h3>
          {editOpen && <ReactQuill
            className="h-[400px]"
            formats={QuillFormats}
            modules={QuillModules}
            value={bottomValue}
            onChange={setBottomValue}
            placeholder="Напишите свой текст здесь..."
          />}
        {!editOpen && note && <div>{parse(note.bottom)}</div>}
        </div>
      </section>
    </main>
  )
}


export const getServerSideProps = async (ctx: NextPageContext) => {
  const isAuthencate = await isAuth(ctx)

  if (!isAuthencate) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}
