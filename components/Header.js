import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'
import ConnectButton from './ConnectButton'
import ConnectProfile from './ConnectProfile'
import CreateHackathonModal from './CreateHackathonModal'
import CreateProfileModal from './CreateProfileModal'

export default function Header() {
  const [collapsed, setCollapsed] = useState(true)
  const global = useContext(UserContext)
  return (
    <nav className="flex items-center justify-between flex-wrap bg-hacker-color-200 px-6 w-full lg:sticky lg:top-0 z-10 py-1">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <img src={'/images/hackerverse.png'} className="h-24 " />
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white ">
          <svg
            className="h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:h-auto">
        <div className="text-md lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-white mr-4 hover:underline "
          >
            Docs
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-white mr-4 hover:underline"
          >
            Feed
          </a>
        </div>
        <div className="mr-10">
          <input
            type="text"
            className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
            id="exampleFormControlInput3"
            placeholder="Search event"
          />
        </div>
        {global.user && global.profileId && (
          <div>
            <CreateHackathonModal />
          </div>
        )}
        {global.user && !global.profileId && (
          <div className="flex flex-row justify-evenly h-full items-center">
            <div>
              <CreateProfileModal />
            </div>
            <div>
              <ConnectProfile />
            </div>
          </div>
        )}
        <div className="lg:m-0 my-2">
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}
