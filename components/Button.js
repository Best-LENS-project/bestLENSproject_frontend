export default function BLPButton({ clickaction, text, className }) {
  console.log('class', text, className)
  return (
    <button
      onClick={clickaction}
      className={
        `font-semibold py-3 px-4  rounded-lg bg-hacker-accent-400 hover:bg-hacker-accent-200 text-gray-50 ` +
        (className ? className : '')
      }
    >
      {text}
    </button>
  )
}
