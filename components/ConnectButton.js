import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import { requestUserLogin } from '../utils/auth'
import { makeAddressShort } from '../utils/string_utils'

// initialize onboard

export default function ConnectButton() {
  const global = useContext(UserContext)
  const router = useRouter()

  let user = false //getLoggedInUser()
  console.log(global.user?.address)
  let button = (
    <button
      className={` md:flex transition ease-out duration-500 font-semibold py-3 px-4 rounded-lg bg-hacker-accent-400 hover:bg-hacker-accent-200`}
      onClick={async () => requestUserLogin(global)}
    >
      Connect {global.user}
    </button>
  )
  if (global.user) {
    button = (
      <button
        className={` md:flex transition ease-out duration-500 font-semibold py-3 px-4 rounded-lg bg-hacker-accent-600 hover:bg-hacker-accent-200 text-gray-50 align-middle`}
        onClick={() => {
          console.log('logged in', user)
        }}
      >
        <div className="flex flex-row items-center">
          <img
            src={`https://robohash.org/${global.user?.address}.png?size=120x120`}
            className="w-8 bg-white rounded-full mr-2"
          />

          <div>Connected {makeAddressShort(global.user.address)}</div>
        </div>
      </button>
    )
  }
  return button
}
