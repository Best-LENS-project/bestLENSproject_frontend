import { Dialog, Transition } from '@headlessui/react'
import Script from 'next/script'
import { Fragment, useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { publication } from '../mockdata/mock_publication'
import { getProfileById, getProfileIdFromHandle } from '../utils/chain_utils'
import BLPButton from './Button'
import SocialComps from './SocialComps'

export default function ConnectProfile() {
  let [isOpen, setIsOpen] = useState(false)
  const [handle, setHandle] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const global = useContext(UserContext)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function claimHandle() {
    try {
      setLoading(true)
      const claimed = await getProfileIdFromHandle(handle)
      if (!claimed) {
        setError('Handle not existent!')
      }
      if (claimed) {
        setError('Claimed profile:' + claimed)
        const profile = await getProfileById(claimed)
        global.update({ profile, profileId: claimed, user: global.user })
        setTimeout(() => closeModal(), 2000)
      }
      console.log('claiming,', handle, claimed)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className={` md:flex transition ease-out duration-500 font-semibold py-2 px-4 mx-4 rounded-lg bg-hacker-accent-600 hover:bg-hacker-accent-200 text-gray-50`}
      >
        Connect Profile
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-[60vw] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {publication?.title}
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex flex-col w-full justify-center align-middle items-center">
                    <div className="w-fit font-bold">Create your handle</div>
                    <div className="flex flex-row ">
                      <img
                        src={`https://robohash.org/${global.user?.address}.png?size=120x120`}
                        className="w-16 h-16 border-2 rounded-full mr-2 border-hacker-color-200"
                      />
                      <div className="flex flex-col justify-center items-center">
                        <div>{global.user.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Your handle
                    </label>
                    <input
                      id="message"
                      rows="4"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="I am already called..."
                    ></input>
                    <div className="mt-3 py-2 ml-3">{error}</div>
                  </div>
                  {loading ? (
                    <div className="w-16 h-16 border-b-2 border-hacker-color-200 rounded-full animate-spin"></div>
                  ) : (
                    <BLPButton
                      text={'Connect My Handle!'}
                      clickaction={claimHandle}
                      className={'min-w-[20%] mt-16'}
                    />
                  )}
                </div>

                {/* <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-200 bg-red-800 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          setStep('selection')
                          closeModal()
                        }}
                      >
                        Nevermind!
                      </button>
                    </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
