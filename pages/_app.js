import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import UserContext from '../contexts/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    user: null,
    profileId: null,
    update,
  })
  function update(data) {
    let updateData = data
    Object.keys(state).forEach(function (key) {
      if (key in data) {
        // or obj1.hasOwnProperty(key)
        updateData[key] = data[key]
      } else {
        updateData[key] = state[key]
      }
    })
    console.log('updating state', updateData, state, data)
    setState(Object.assign({}, state, updateData))
  }
  useEffect(() => {
    import('tw-elements')
  }, [])

  return (
    <UserContext.Provider value={state}>
      <div className=" max-w-full max-h-full h-full min-h-screen  bg-grape-blue-900 text-gray-700 font-opensans flex justify-center  text-base font-semibold">
        <div className="flex items-center flex-col w-screen bg-gray-100">
          <Header />
          {/* <Link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />

          <Link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
            type="text/css"
          /> */}

          <div className="max-w-7xl w-full px-5">
            <Component {...pageProps} className="w-screen" />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default MyApp
