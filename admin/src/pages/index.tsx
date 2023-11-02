import { NextPageContext } from "next"
import { isAuth } from "../utils/isAuth"
import { useGetUserQuery, useStartParsingMutation } from "../services/adminApi"
import { Header } from "../components/header"
import { RotatingLines } from "react-loader-spinner"


export default function Home() {
  const { data } = useGetUserQuery(undefined)

  const [startToParsing, { isLoading, isSuccess }] = useStartParsingMutation()
  const start = () => {
    if (!isLoading) {
      startToParsing(undefined)
    }
  };

  return (
    <main className="w-screen h-screen bg-slate-100">
      <Header />
      <section className="flex pt-20 flex-col gap-5">
        <div className="flex flex-col rounded-2xl bg-white p-12">
          <h1 className="text-center text-2xl">Парсинг</h1>
          <div className="flex justify-center">
            <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={isLoading}
            />
          </div>
          <div className="flex justify-center mt-5">
            <button disabled={isLoading} onClick={() => start()} className={`${!isLoading ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Спарсить</button>
          </div>
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
