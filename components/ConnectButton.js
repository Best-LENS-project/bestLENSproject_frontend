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
        className={` md:flex transition ease-out duration-500 font-semibold py-0 px-4 rounded-lg bg-hacker-accent-600 hover:bg-hacker-accent-200 text-gray-50 align-middle flex-row items-center`}
        onClick={() => {
          console.log('logged in', user)
        }}
      >
        <div className=" w-12 h-12 rounded-full shadow-lg my-2 bg-white border-2 overflow-hidden">
          <img
            className="w-full max-h-sm aspect-square object-cover"
            src={
              global.profileId
                ? global.profile[4]
                : `https://robohash.org/${global.user?.address}.png?size=120x120`
            }
          ></img>
        </div>
        <div className="flex flex-col justify-center items-center h-full ml-2">
          <div>Connected {makeAddressShort(global.user.address)}</div>
          <div>{global.profileId && <span>{global.profile[3]}</span>}</div>
        </div>
      </button>
    )
  }
  return button
}
