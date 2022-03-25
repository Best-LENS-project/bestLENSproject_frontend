import { ERC721_ABI } from './abis/erc721-common'

export const findOwnedTokensOnERC721Contract = async (
  contractAddress,
  walletAddress,
) => {
  if (!walletAddress) {
    console.log('wallet addr undefined', walletAddress)
    return
  }

  if (!contractAddress) {
    console.log('contr addr undefined', contractAddress)
    return
  }

  const contract = getWeb3Contract(contractAddress, ERC721_ABI, {
    // from: walletAddress,
    // gasPrice: '300000000',
  })
  console.log('calling supply')
  const numberOfTokens = await contract.methods.totalSupply().call()
  console.log('calling tokens', numberOfTokens)
  const tokensOfUser = []
  for (let i = 0; i < numberOfTokens; i++) {
    console.log('checking', i)
    const owner = await checkOwnershipOfTokenOnERC721Contract(contract, i)
    const ownedByUser = owner.toLowerCase() === walletAddress
    if (ownedByUser) {
      const tokenURI = await requestTokenURIFromContract(contract, i)
      tokensOfUser.push(tokenURI)
    }
  }
  console.log(tokensOfUser)
  return tokensOfUser
}

const getWeb3Contract = (contractAddress, abi, options) => {
  //   if (window.web3) {
  //     window.web3 = new Web3(window.ethereum)
  //   }

  const contract = new window.web3.eth.Contract(abi, contractAddress, options)

  return contract
}

const checkOwnershipOfTokenOnERC1155Contract = async (
  contract,
  walletAddress,
  tokenId,
) => {
  return await contract.methods.balanceOf(walletAddress, tokenId).call()
}

const checkOwnershipOfTokenOnERC721Contract = async (contract, tokenId) => {
  return await contract.methods.ownerOf(tokenId).call()
}
const requestTokenURIFromContract = async (contract, tokenId) => {
  return await contract.methods.tokenURI(tokenId).call()
}

export const getSpecificToken = async (contractAddress, tokenId) => {
  if (!contractAddress || !tokenId) {
    console.error('cannot call', contractAddress, 'ID:', tokenId)
    return
  }
  const contract = getWeb3Contract(contractAddress, ERC721_ABI)
  const tokenURI = await requestTokenURIFromContract(contract, tokenId)
  console.log('token:', tokenURI)
  return tokenURI
}
