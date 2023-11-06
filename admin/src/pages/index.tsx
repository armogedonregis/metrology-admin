import { NextPageContext } from "next"
import { isAuth } from "../utils/isAuth"
import { useGetUserQuery, useParsingMskMutation, useParsingSpbMutation } from "../services/adminApi"
import { Header } from "../components/header"
import { RotatingLines } from "react-loader-spinner"


export default function Home() {
  const { data } = useGetUserQuery(undefined)

  const [mskParsing, { isLoading: mskLoad }] = useParsingMskMutation()
 
  const startMsk = (url: string) => {
    if (!mskLoad && !loadSpb) {
      mskParsing(url)
    }
  };

  const [spbParsing, { isLoading: loadSpb }] = useParsingSpbMutation()

  const startSpb = (url: string) => {
    if (!loadSpb && !mskLoad) {
      spbParsing(url)
    }
  };

  return (
    <main className="w-screen h-screen bg-slate-100">
      <Header />
      <section className="flex pt-20 flex-col gap-5">
        <div className="flex flex-col rounded-2xl bg-white p-12">
          <h1 className="text-center text-2xl">Собрать данные с Москвы</h1>
          <div className="flex justify-center">
            <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={mskLoad}
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex justify-center mt-5">
              <button disabled={mskLoad || loadSpb} onClick={() => startMsk('rating-msk-1')} className={`${!mskLoad && !loadSpb ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по поверке счетчиков воды в Москве</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={mskLoad || loadSpb} onClick={() => startMsk('rating-msk-2')} className={`${!mskLoad && !loadSpb ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Замена счетчиков воды в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={mskLoad || loadSpb} onClick={() => startMsk('rating-msk-3')} className={`${!mskLoad && !loadSpb ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Установка счетчиков воды в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={mskLoad || loadSpb} onClick={() => startMsk('rating-msk-4')} className={`${!mskLoad && !loadSpb ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Поверка теплосчетчиков в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={mskLoad || loadSpb} onClick={() => startMsk('rating-msk-5')} className={`${!mskLoad && !loadSpb ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Замена теплосчетчиков в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={mskLoad || loadSpb} onClick={() => startMsk('rating-msk-6')} className={`${!mskLoad && !loadSpb ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Установка счетчиков тепла в Москве рейтинг</button>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-white mt-5">
            <h1 className="text-center text-2xl">Собрать данные СПБ</h1>
            <div className="flex justify-center">
              <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={loadSpb}
              />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex justify-center mt-5">
                <button disabled={loadSpb || mskLoad} onClick={() => startSpb('rating-spb-1')} className={`${!loadSpb && !mskLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по поверке счетчиков воды в СПБ</button>
              </div>
              <div className="flex justify-center mt-5">
                <button disabled={loadSpb || mskLoad} onClick={() => startSpb('rating-spb-2')} className={`${!loadSpb && !mskLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по замене счетчиков воды в СПБ</button>
              </div>
              <div className="flex justify-center mt-5">
                <button disabled={loadSpb || mskLoad} onClick={() => startSpb('rating-spb-3')} className={`${!loadSpb && !mskLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по установка счетчиков воды в СПБ</button>
              </div>
              <div className="flex justify-center mt-5">
                <button disabled={loadSpb || mskLoad} onClick={() => startSpb('rating-spb-4')} className={`${!loadSpb && !mskLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по поверке теплосчетчиков воды в СПБ</button>
              </div>
              <div className="flex justify-center mt-5">
                <button disabled={loadSpb || mskLoad} onClick={() => startSpb('rating-spb-5')} className={`${!loadSpb && !mskLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по замене теплосчетчико в СПБ</button>
              </div>
              <div className="flex justify-center mt-5">
                <button disabled={loadSpb || mskLoad} onClick={() => startSpb('rating-spb-6')} className={`${!loadSpb && !mskLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по установке теплосчетчиков в СПБ</button>
              </div>
              <div className="flex justify-center mt-5">
                <button disabled={loadSpb || mskLoad} onClick={() => startSpb('rating-spb-7')} className={`${!loadSpb && !mskLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по установке кондиционеров в СПБ</button>
              </div>
            </div>
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
