import { NextPageContext } from "next"
import { isAuth } from "../utils/isAuth"
import { useGetUserQuery, useParsingFiveMskMutation, useParsingFourMskMutation, useParsingOneMskMutation, useParsingSixMskMutation, useParsingThreeMskMutation, useParsingTwoMskMutation } from "../services/adminApi"
import { Header } from "../components/header"
import { RotatingLines } from "react-loader-spinner"


export default function Home() {
  const { data } = useGetUserQuery(undefined)

  const [oneParsing, { isLoading: oneLoad }] = useParsingOneMskMutation()
  const [twoParsing, { isLoading: twoLoad }] = useParsingTwoMskMutation()
  const [threeParsing, { isLoading: threeLoad }] = useParsingThreeMskMutation()
  const [fourParsing, { isLoading: fourLoad }] = useParsingFourMskMutation()
  const [fiveParsing, { isLoading: fiveLoad }] = useParsingFiveMskMutation()
  const [sixParsing, { isLoading: sixLoad }] = useParsingSixMskMutation()
  const startOne = () => {
    if (!oneLoad) {
      oneParsing(undefined)
    }
  };

  const startTwo = () => {
    if (!twoLoad) {
      twoParsing(undefined)
    }
  };

  const startThree = () => {
    if (!threeLoad) {
      threeParsing(undefined)
    }
  };


  const startFour = () => {
    if (!fourLoad) {
      fourParsing(undefined)
    }
  };

  const startFive = () => {
    if (!fiveLoad) {
      fiveParsing(undefined)
    }
  };

  const startSix = () => {
    if (!sixLoad) {
      sixParsing(undefined)
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
              visible={oneLoad || twoLoad || threeLoad || fourLoad || fiveLoad || sixLoad}
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex justify-center mt-5">
              <button disabled={oneLoad} onClick={() => startOne()} className={`${!oneLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Рейтинг по поверке счетчиков воды в Москве</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={twoLoad} onClick={() => startTwo()} className={`${!twoLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Замена счетчиков воды в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={threeLoad} onClick={() => startThree()} className={`${!threeLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Установка счетчиков воды в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={fourLoad} onClick={() => startFour()} className={`${!fourLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Поверка теплосчетчиков в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={fiveLoad} onClick={() => startFive()} className={`${!fiveLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Замена теплосчетчиков в Москве рейтинг</button>
            </div>

            <div className="flex justify-center mt-5">
              <button disabled={sixLoad} onClick={() => startSix()} className={`${!sixLoad ? 'bg-green-500' : 'bg-red-500 cursor-wait'} px-5 py-2 text-white`}>Установка счетчиков тепла в Москве рейтинг</button>
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
