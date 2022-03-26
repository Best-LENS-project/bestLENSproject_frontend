import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import { publication } from '../mockdata/mock_publication'
import DetailModal from './DetailModal'
import SocialComps from './SocialComps'

export default function MainPublication({ img, pub, pubid, preview }) {
  // const pub = publication
  const router = useRouter()
  const global = useContext(UserContext)

  return (
    <div
      className="min-w-md max-w-md rounded-md overflow-hidden shadow-2xl w-5/6 m-2 bg-white  hover:shadow-hacker-accent-200 hover:cursor-pointer hover:translate-y-2 transition-all"
      onClick={() => {
        if (!img) {
          router.push('/publications/' + pubid)
        }
      }}
    >
      <img
        className="w-full max-h-sm aspect-video object-cover"
        src={preview ? img : pub.img}
        alt="Upload an Image!"
      />
      <div className="flex flex-row justify-between px-6 mt-3 items-center">
        <div className="flex flex-row justify-start items-center">
          <div className=" w-12 h-12 rounded-full shadow-lg my-2 bg-white border-2 overflow-hidden mr-1">
            <img
              className="w-full max-h-sm aspect-square object-cover"
              src={preview ? global.profile[4] : pub.creator.img}
              alt="Upload an image!"
            ></img>
          </div>
          <div className="align-middle">
            <span className="font-light align-middle">
              {preview ? global.profile[3] : pub.creator.name}
            </span>
          </div>
        </div>
        <div className="font-light">
          <span>{new Date(preview ? null : pub.createdAt).toDateString()}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-medium text-2xl mb-2">
          {preview ? 'Your Cool title!' : pub.title}
        </div>
        <p className="text-gray-500 text-base font-normal">
          {preview
            ? 'Short Description for your utter most amazing Hackathon!'
            : pub.short_description}
        </p>
      </div>
      <div className="px-4">
        <SocialComps
          shares={preview ? 0 : pub.shares}
          collections={preview ? 0 : pub.collections}
          comments={preview ? 0 : pub.comments}
        />
      </div>
      <div className="px-6 pt-4 pb-2">
        {/* <DetailModal publication={pub} />
        <button className="inline-block   border-gray-300 border-2 rounded-sm px-3 py-1 text-sm font-light text-gray-600 mr-2 mb-2 hover:bg-hacker-accent-200">
          Collect
        </button>
        <button className="inline-block   border-gray-300 border-2 rounded-sm px-3 py-1 text-sm font-light text-gray-600 mr-2 mb-2 hover:bg-hacker-accent-200">
          Comment
        </button> */}
      </div>
    </div>
  )

  //   (
  //     <div className="justify-items-start my-3">
  //       <div className=" text-4xl flex flex-row align-text-bottom ">
  //         {' '}
  //         <img
  //           src="https://pbs.twimg.com/media/FOPKuwOWQAEMjpo?format=jpg&name=4096x4096"
  //           className="w-16"
  //         />
  //         <div className="justify-end">{pub.title}</div>
  //       </div>
  //       <div className="text-base">{pub.short_description}</div>
  //     </div>
  //   )
}
