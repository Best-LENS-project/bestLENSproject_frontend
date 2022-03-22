import { useState } from 'react'
import Header from '../components/Header'
import UserContext from '../contexts/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    user: null,
    update,
  })
  function update(data) {
    setState(Object.assign({}, state, data))
  }
  return (
    <UserContext.Provider value={state}>
      <div className=" max-w-full max-h-full h-full min-h-screen  bg-grape-blue-900 text-gray-700 font-opensans flex justify-center  text-base font-semibold">
        <div className="flex items-center flex-col w-screen bg-gray-100">
          <Header />
          <Component {...pageProps} className="w-screen" />
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default MyApp
