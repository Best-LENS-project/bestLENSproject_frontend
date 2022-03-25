import { Dialog, Transition } from '@headlessui/react'
import Script from 'next/script'
import { Fragment, useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { publication } from '../mockdata/mock_publication'
import BLPButton from './Button'
import MainPublication from './MainPublication'
import SocialComps from './SocialComps'

const defaultFields = ['title', 'description']

export default function CreateHackathonModal({ publication }) {
  let [isOpen, setIsOpen] = useState(false)
  let [step, setStep] = useState('selection')
  const [startDate, setStartDate] = useState(new Date())
  const [fields, setFields] = useState(defaultFields)
  const [description, setDescription] = useState()
  const [image, setImage] = useState({ preview: '', raw: '' })

  const global = useContext(UserContext)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function stepToComponent(step) {
    switch (step) {
      case 'selection':
        return <ActionSelection onBounty={() => setStep('info')} />
      case 'info':
        return <InfoText next={() => setStep('basic')} />
      case 'basic':
        return (
          <BasicInfo
            next={() => setStep('details')}
            setDescription={setDescription}
            description={description}
            image={image}
            setImage={setImage}
          />
        )
      case 'details':
        return (
          <DetailsInfo
            next={() => setStep('preview')}
            fields={fields}
            setFields={setFields}
          />
        )
      case 'preview':
        return (
          <Preview
            description={description}
            fields={fields}
            image={image}
            startDate={Date.now()}
          />
        )
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className={` md:flex transition ease-out duration-500 font-semibold py-3 px-4 mx-4 rounded-lg bg-hacker-accent-400 hover:bg-hacker-accent-200 text-gray-50`}
      >
        Create Hackathon
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
                    <div className="w-fit font-bold">
                      Create a new Publication
                    </div>
                    <div className="flex flex-row ">
                      <img
                        src={`https://robohash.org/${global.user?.address}.png?size=120x120`}
                        className="w-16 h-16 border-2 rounded-full mr-2 border-hacker-color-200"
                      />
                      <div className="flex flex-col justify-center items-center">
                        <div>{global.user.address}</div>
                        <div className="mt-2 border-2 border-hacker-accent-600 px-4 py-2 rounded-md min-w-[60%] text-center">
                          PretzelDAO
                        </div>
                      </div>
                    </div>
                  </div>
                  {stepToComponent(step)}
                </div>

                <div className="mt-4">
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
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function ActionSelection({ onBounty, onGeneric }) {
  return (
    <div className="flex flex-col w-full justify-center align-middle items-center">
      <div className="my-5 w-full items-center flex flex-row justify-center">
        <BLPButton
          text={'Generic Publication'}
          className=" min-w-[50%] py-5"
          clickaction={onBounty}
        ></BLPButton>
      </div>
      <div className="my-5 w-full items-center flex flex-row justify-center">
        <BLPButton
          text={'Bounty'}
          className=" min-w-[50%] py-5"
          clickaction={onGeneric}
        ></BLPButton>
      </div>
    </div>
  )
}

function InfoText({ next }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-fit">
        <ul className="list-decimal text-gray-600 mt-4 text-2xl">
          <li>Describe the bounty/ hackathon your are postings</li>
          <li>Define Required Fields for Work Submission </li>
          <li> Whitelist voters </li>
          <li> Select Scoring Module</li>
        </ul>
      </div>
      <BLPButton
        text={'Gotcha!'}
        clickaction={next}
        className={'min-w-[20%] mt-16'}
      />
    </div>
  )
}

function BasicInfo({ next, description, setDescription, image, setImage }) {
  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your Hackerthon Description
        </label>
        <textarea
          id="message"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Describe me..."
        ></textarea>
      </div>
      <label
        className="text-sm font-medium text-gray-900 block mb-2"
        htmlFor="user_avatar"
      >
        Upload file
      </label>
      <input
        className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg"
        aria-describedby="user_avatar_help"
        // value={image}
        onChange={(e) =>
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          })
        }
        id="user_avatar"
        type="file"
      />
      <div className="mt-1 text-sm text-gray-500" id="user_avatar_help">
        A hackerthon picture is useful to confirm your are serious!
      </div>
      <div className="flex flex-col justify-between w-full align-middle items-center mt-4">
        <div className="w-full flex flex-row">
          <div className="flex flex-col justify-center items-center w-1/2">
            <div>Image preview</div>
          </div>
          <div className="flex flex-col justify-center items-center w-1/2">
            <div>Card Image preview</div>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="flex flex-col justify-center items-center w-1/2">
            <img
              className="bg-white rounded-md shadow-lg my-2 max-w-[60%]"
              src={image.preview}
            ></img>
          </div>
          <div className="flex flex-col justify-center items-center w-1/2">
            <MainPublication img={image.preview} />
          </div>
        </div>
      </div>
      <BLPButton
        text={'Define Submission!'}
        clickaction={next}
        className={'min-w-[20%] mt-16'}
      />
    </div>
  )
}

function DetailsInfo({ next, fields, setFields, startDate, setStartDate }) {
  const [val, setVal] = useState()
  const [picker, setPicker] = useState()

  useEffect(() => {
    import('tw-elements')
  }, [])
  console.log(fields)
  // let picker
  useEffect(async () => {
    const lib = await import('material-datetime-picker')
    console.log('lib,', lib)
    const p = new lib.default()
      .on('submit', (val) => console.log(`data: ${val}`))
      .on('open', () => console.log('opened'))
      .on('close', () => console.log('closed'))
    console.log('doc', document)
    p.open()
    setPicker(p)

    // document
    //   .querySelector('.c-datepicker-btn')
    //   .setAttribute('click', () => picker.open())
  }, [])
  console.log('picker', picker)
  return (
    <div>
      <div className="flex items-center justify-center my-3 flex-col">
        <div className="datepicker relative form-floating mb-3 xl:w-96">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Select a date"
          />
          <label htmlFor="fieldInput" className="text-gray-700">
            Select a date2
          </label>
        </div>
        {picker && (
          <div>
            <a class="c-btn c-datepicker-btn" onClick={() => picker.open()}>
              Open Picker
            </a>
            <pre id="events"></pre>
          </div>
        )}

        <div className="mt-4">
          <span>Add Fields</span>
        </div>

        <div className="form-floating mb-3 relative xl:w-96">
          <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="text"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="fieldInput"
              placeholder="title"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              aria-describedby="button-addon2"
            />

            <button
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs trialing-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
              onClick={() => {
                if (val) {
                  setFields(fields.concat([val]))
                  setVal('')
                }
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-6 fill-white"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex justify-center">
          <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            {fields.map((f) => (
              <li class="px-6 py-2 border-b border-gray-200 w-full ease-in transition-all box new-box">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          <BLPButton
            text={'reset'}
            clickaction={() => setFields(defaultFields)}
            className="opacity-75 bg-red-500"
          />
        </div>
      </div>

      <BLPButton
        text={'Preview!'}
        clickaction={next}
        className={'min-w-[20%] mt-16'}
      />
    </div>
  )
}

function Preview({ next, image, description, fields, startDate }) {
  console.log('image', image)
  const pub = publication
  return (
    <div className="px-6 flex flex-col max-w-3xl mx-auto">
      {' '}
      <div className="flex flex-row justify-between px-6 mt-3">
        <div className="flex flex-row justify-start">
          <img src={pub.creator.img} className=" h-8 mr-2" />
          <div className="align-middle">
            <span className="font-light align-middle">{pub.creator.name}</span>
          </div>
        </div>
        <div className="font-light">
          <span>{new Date(pub.createdAt).toDateString()}</span>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <img src={image.preview} className="max-w-3/4 max-h-[20vh]" />
      </div>
      <div className="my-3">
        <span className="whitespace-pre-line">{description}</span>
      </div>
      <div className="px-4">
        <SocialComps shares={0} collections={0} comments={0} />
      </div>
      <div className="mt-5 font-semibold">Example Application</div>
      <div className="flex flex-row justify-center">
        <div className="min-w-md max-w-md rounded-md overflow-hidden shadow-2xl w-5/6 m-2 bg-white  hover:shadow-hacker-accent-200 hover:cursor-pointer hover:translate-y-2 transition-all shadow-slate-600 py-5">
          <div className="flex flex-col w-full justify-center align-middle items-start px-8">
            <div className="flex flex-row justify-between w-full  py-4 ">
              <div className="flex flex-row">
                <img
                  src={`https://robohash.org/random.png?size=120x120`}
                  className="w-8 h-8 border-2 rounded-full mr-2 border-hacker-color-200"
                />
                <div className="flex flex-col justify-center items-center">
                  <div>Applicant</div>
                </div>
              </div>
              <div className="flex ">Mar 15</div>
            </div>
            <div className="font-semibold text-3xl">Title</div>
            {fields
              .filter((f) => f != 'title')
              .map((f) => (
                <div className="font-normal text-xl">{f}</div>
              ))}
          </div>
          <div className="px-4">
            <SocialComps shares={0} collections={0} comments={0} />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <BLPButton
          text={'Edit'}
          className="min-w-[20%] aspect-video bg-hacker-color-200"
        />
        <BLPButton
          text={'Looks Good'}
          className="min-w-[20%] aspect-video bg-hacker-accent-400"
        />
      </div>
    </div>
  )
}
