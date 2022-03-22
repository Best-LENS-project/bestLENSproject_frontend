//DONE: change back to production values!!
let NETWORK_FOR_OPENSEA_API =
  process.env.NODE_ENV == 'production' ? 'main' : 'test' //main:test

const RINKEBY_COLLECTIONS_BASE_URL = 'https://rinkeby-api.opensea.io/api/v1'
const RINKEBY_BASE_URL = 'https://testnets.opensea.io/assets'

const MAINNET_COLLECTIONS_BASE_URL = 'https://api.opensea.io/api/v1'
const MAINNET_BASE_URL = 'https://opensea.io/assets'

const PRODUCTION_STRAPI_URL = 'https://api.cryptograpes.club'
const DEV_STRAPI_URL = 'http://localhost:1337'

export const STRAPI_URL =
  process.env.NODE_ENV == 'production' ? PRODUCTION_STRAPI_URL : DEV_STRAPI_URL

export const OPENSEA_COLLECTIONS_BASE_URL =
  NETWORK_FOR_OPENSEA_API === 'main'
    ? MAINNET_COLLECTIONS_BASE_URL
    : RINKEBY_COLLECTIONS_BASE_URL

export const OPENSEA_BASE_URL =
  NETWORK_FOR_OPENSEA_API === 'main' ? MAINNET_BASE_URL : RINKEBY_BASE_URL

export const FETCH_ACCOUNT_COLLECTIONS_ENDPOINT = (
  account,
  offset = 0,
  limit = 300,
) =>
  `${OPENSEA_COLLECTIONS_BASE_URL}/collections?asset_owner=${account}&offset=${offset}&limit=${limit}`
export const FETCH_ACCOUNT_PARTNER_COLLECTIONS_ENDPOINT = (
  account,
  offset = 0,
  limit = 50,
) => {
  console.log('addresses', supportedCollections)
  let addrs = Object.values(supportedCollections).map((a) =>
    a ? '&asset_contract_addresses=' + a.contractId : '',
  )
  return (
    `${OPENSEA_COLLECTIONS_BASE_URL}/assets?owner=${account}&offset=${offset}&limit=${limit}` +
    addrs.join('')
  )
}

export const FETCH_ASSETS_IN_COLLECTION_ENDPOINT = (
  slug,
  offset = 0,
  limit = 20,
) =>
  `${OPENSEA_COLLECTIONS_BASE_URL}/assets?order_direction=desc&offset=${offset}&limit=${limit}&collection=${slug}`

export const FETCH_SINGLE_ASSET_ENDPOINT = (contractAddress, tokenId) =>
  `${OPENSEA_COLLECTIONS_BASE_URL}/asset/${contractAddress}/${tokenId}`

export const FETCH_SINGLE_COLLECTION_ENDPOINT = (slug) =>
  `${OPENSEA_COLLECTIONS_BASE_URL}/collection/${slug}`

// export const partnercontractAddresses = {
//   CG: '', //Cryptograpes
//   HOL: '0x8C714199d2eA08CC1f1F39A60f5cD02aD260A1e3', //House Of legends
//   DAW: '0x2953399124F0cBB46d2CbACD8A89cF0599974963', //Desperate Ape Wifes
//   GP: '0xDf3407636bBF3a015a8E48A079ef7bA49E687fD3', //GhostProject
// }
