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
        className={` md:flex transition ease-out duration-500 font-semibold py-3 px-4 rounded-lg bg-hacker-accent-400 hover:bg-hacker-accent-200`}
        onClick={() => {
          console.log('logged in', user)
        }}
      >
        Connected {makeAddressShort(global.user.address)}
      </button>
    )
  }
  return button
}
