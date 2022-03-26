import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import BLPButton from '../../components/Button'
import SocialComps from '../../components/SocialComps'
import StatsCardNumbers from '../../components/StatsCardNumbers'
import WinnersCard from '../../components/WinnersCard'
import UserContext from '../../contexts/UserContext'
import {
  comments,
  publication,
  publications,
} from '../../mockdata/mock_publication'

const sortOptions = [
  {
    title: 'Newest',
    value: 'newest',
    sorter: (a, b) => b.createdAt - a.createdAt,
  },
  {
    title: 'Most Votes',
    value: 'most',
    sorter: (a, b) => b.collections - a.collections,
  },
]
export default function Publication() {
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const router = useRouter()
  const { publication } = router.query
  const global = useContext(UserContext)

  const pub = publications[publication]
  const comms = comments
  if (!pub) {
    return <div>Invalid publication</div>
  }

  return (
    <div>
      <div className="w-full flex justify-center flex-col">
        <div className="flex flex-wrap justify-between items-center align-middle mt-8 mb-12 text-4xl w-full justify-start px-6 lg:sticky">
          <div className=" flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-12 mr-4 fill-hacker-color-200 cursor-pointer transition-all hover:-translate-x-2 "
              onClick={() => router.back()}
            >
              <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
            </svg>
            <div className="items-center text-center justify-center flex-col flex">
              {pub?.title}
            </div>
          </div>
          <div>
            <div className="dropdown relative">
              <button
                className="dropdown-toggle inline-block px-7 py-3 bg-hacker-accent-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-hacker-accent-400 hover:shadow-lg focus:bg-hacker-accent-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-hacker-color-200 active:shadow-lg transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                type="button"
                id="dropdownMenuLargeButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortOption ? 'sort by: ' + sortOption.title : 'Select sorting'}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </button>
              <ul
                className="   dropdown-menu   min-w-max   absolute   hidden   bg-white   text-base   z-50   float-left   py-2   list-none   text-left   rounded-lg   shadow-lg   mt-1   hidden   m-0   bg-clip-padding   border-none "
                aria-labelledby="dropdownMenuButton1"
              >
                {sortOptions.map((f) => (
                  <li key={f.title}>
                    <a
                      className=" cursor-pointer dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      onClick={() => setSortOption(f)}
                    >
                      {f.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-16">
          <div>
            <div className="flex flex-row justify-between px-6 mt-3 w-full">
              <div className="flex flex-row justify-start">
                <img src={pub?.creator.img} className=" h-8 mr-2" />
                <div className="align-middle">
                  <span className="font-light align-middle">
                    {pub?.creator.name}
                  </span>
                </div>
              </div>
              <div className="font-light">
                <span>{new Date(pub?.createdAt).toDateString()}</span>
              </div>
            </div>
          </div>
          <div className="my-5">
            <img
              src={pub?.img}
              className="md:max-w-2xl rounded shadow-sm  max-w-[70vw]"
            />
          </div>
          <div className="my-5">
            <span className="whitespace-pre-line font-normal">
              {pub?.description}
            </span>
          </div>
          <div>
            <SocialComps
              collections={0}
              comments={0}
              shares={0}
              buttons={true}
            />
          </div>
          <StatsCardNumbers pub={pub} />
          <WinnersCard />
          <div className="mt-8 text-4xl">
            Publications by {sortOption.title}
          </div>
          <div className="flex flex-row justify-center">
            <div className="min-w-md max-w-4xl rounded-md overflow-hidden shadow-xl w-5/6 m-2 bg-white  hover:shadow-hacker-accent-600 hover:translate-y-1 transition-all shadow-slate-600 py-5">
              <div className="flex flex-col w-full justify-center align-middle items-start px-8">
                <div className="flex flex-row justify-between  mt-1 w-full mb-5 items-center">
                  <div className="flex flex-row justify-start items-center">
                    <div className=" w-16 h-16 rounded-full shadow-lg my-2 bg-white border-2 overflow-hidden mr-1">
                      <img
                        className="w-full max-h-sm aspect-square object-cover"
                        src={global.profileId ? global.profile[4] : ''}
                        alt="Upload an image!"
                      ></img>
                    </div>
                    <div className="align-middle">
                      <span className="font-light align-middle">
                        {pub?.title}
                      </span>
                    </div>
                  </div>
                  <div className="font-light">
                    <span>{new Date().toDateString()}</span>
                  </div>
                </div>

                <div className="font-normal mb-3 text-3xl w-full">
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Awesome Project"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <textarea
                    id="message"
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Describe me..."
                  ></textarea>
                </div>
                {pub.fields
                  .filter((f) => f.name != 'title')
                  .map((f) => (
                    <div
                      className="font-normal  text-3xl w-full mt-3"
                      key={f.name}
                    >
                      <div className="mb-2">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {f.name}
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={'Your ' + f.name}
                          required
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="px-4 flex flex-row justify-between items-center">
                <SocialComps
                  shares={0}
                  collections={0}
                  comments={0}
                  buttons={true}
                />
                <div>
                  <BLPButton text={'Submit'} />
                </div>
              </div>
            </div>
          </div>
          {comms.sort(sortOption.sorter).map((c) => (
            <div className="flex flex-row justify-center" key={c.name}>
              <div className="min-w-md max-w-4xl rounded-md overflow-hidden shadow-xl w-5/6 m-2 bg-white  hover:shadow-hacker-accent-600 hover:translate-y-1 transition-all shadow-slate-600 py-5">
                <div className="flex flex-col w-full justify-center align-middle items-start px-8">
                  <div className="flex flex-row justify-between  mt-1 w-full mb-5">
                    <div className="flex flex-row justify-start">
                      <img src={c.creator.img} className=" h-8 mr-2" />
                      <div className="align-middle">
                        <span className="font-light align-middle">
                          {c.creator.name}
                        </span>
                      </div>
                    </div>
                    <div className="font-light">
                      <span>{new Date(c.createdAt).toDateString()}</span>
                    </div>
                  </div>

                  <div className="font-normal mb-3 text-3xl">{c.title}</div>

                  <div className="flex flex-row">
                    <div className="font-normal mb-3 text-lg whitespace-pre-line">
                      {c.description.trim()}
                    </div>
                  </div>
                  {c.fields
                    .filter((f) => f?.title != 'title')
                    .map((f) => (
                      <div className="flex flex-row" key={f?.title}>
                        <div className="font-normal text-xl font-mono">
                          {f.name}:{' '}
                        </div>
                        <div className="font-normal text-xl">{f.value}</div>
                      </div>
                    ))}
                </div>
                <div className="px-4">
                  <SocialComps
                    shares={c.shares}
                    collections={c.collections}
                    comments={c.comments}
                    buttons={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
