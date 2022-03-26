import Head from 'next/head'
import Image from 'next/image'
import MainPublication from '../components/MainPublication'
import { publications } from '../mockdata/mock_publication'
import styles from '../styles/Home.module.css'
import { tryContract } from '../utils/chain_utils'

export default function Home() {
  return (
    <div className="w-full flex justify-center flex-col">
      <div className="mt-8 mb-12 mx-10 text-4xl w-full justify-start px-6 lg:sticky">
        Dashboard
      </div>
      {/* <button onClick={() => tryContract()}>Try me</button> */}

      <div className="flex flex-wrap justify-around">
        {publications.map((a, i) => (
          <MainPublication pub={a} pubid={i} />
        ))}
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
