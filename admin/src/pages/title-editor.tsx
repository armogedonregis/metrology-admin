import { NextPageContext } from "next"
import { isAuth } from "../utils/isAuth"
import { useGetAllSeoQuery, useGetUserQuery } from "../services/adminApi"
import { Header } from "../components/header"
import { SeoForm } from "../components/seoForm/seoForm"
import { useState } from "react"


export default function TitleEditor() {
  const { data } = useGetUserQuery(undefined)

  const { data: seo } = useGetAllSeoQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const [editOpen, setEditOpen] = useState(false);

  return (
    <main className="w-screen h-screen bg-slate-100">
      <Header />
      <section className="flex pt-20 flex-col gap-5">
        <div className="flex flex-col rounded-2xl bg-white p-12">
          <div className="flex justify-center">
            <button onClick={() => setEditOpen(editOpen => !editOpen)} className="rounded-xl text-white bg-blue-600 px-5 py-2">{editOpen ? "закрыть" : "Открыть"} редактирование</button>
          </div>
          {seo && editOpen && <SeoForm setEditOpen={() => setEditOpen(false)} seo={seo} />}
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
