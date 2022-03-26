export default function StatsCardNumbers({ pub }) {
  return (
    <div className="min-w-md max-w-4xl rounded-md overflow-hidden shadow-xl w-5/6 m-2 bg-white  hover:shadow-hacker-accent-600 hover:translate-y-1 transition-all shadow-slate-600 py-5 px-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-4xl font-semibold">10,650</span>
          <span className="mt-1 font-normal">Participants</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-semibold">425</span>
          <span className="mt-1 font-normal">Submissions</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-semibold">$192,223</span>
          <span className="mt-1 font-normal">In prizces won</span>
        </div>
      </div>
    </div>
  )
}
