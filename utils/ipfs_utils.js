import axios from 'axios'

//RegExp('ipfs://(.*)').compile()

export const getIpfsContent = async (ipfsurl) => {
  let pattern = /ipfs:\/\/(?<url>.*)/gi //needs to be complied every time, else may have crossover effect?!
  let url = pattern.exec(ipfsurl)
  if (!url?.groups) {
    console.error('no pttern found', ipfsurl, url, ipfsurl.split('/'))
    return null
  }
  console.log('fetching', ipfsurl)

  return await axios.get('https://cloudflare-ipfs.com/ipfs/' + url.groups.url)
}
export const getPotentialIpfsContent = async (ipfsurl) => {
  if (ipfsurl.startsWith('ipfs://')) {
    return getIpfsContent(ipfsurl)
  }
  if (ipfsurl.startsWith('http')) return await axios.get(ipfsurl)
  return null
}
export const getPotentialIpfsAddress = (ipfsurl) => {
  // console.log('getting url', ipfsurl)
  if (!ipfsurl) return null
  if (ipfsurl.startsWith('ipfs://')) {
    let pattern = /ipfs:\/\/(?<url>.*)/gi //needs to be complied every time, else may have crossover effect?!
    let url = pattern.exec(ipfsurl)
    return 'https://cloudflare-ipfs.com/ipfs/' + url.groups.url
  }
  if (ipfsurl.startsWith('http')) return ipfsurl
  return null
}
