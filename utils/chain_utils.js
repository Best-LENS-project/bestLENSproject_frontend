// import { ERC721_ABI } from './abis/erc721-common'
import { create } from 'ipfs-http-client'
import { LENSHUB_ABI } from './abi/LENSHUB_ABI'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const contract_address = '0xC0fe412c86Eb59A3639D461aF26297f3B91CBE72'
export const tryContract = async () => {
  console.log(LENSHUB_ABI)
  console.log(window.web3)
  const contract = getWeb3Contract(
    '0xC0fe412c86Eb59A3639D461aF26297f3B91CBE72',
    LENSHUB_ABI,
  )
  const result = await contract.methods
    .isProfileCreatorWhitelisted('0x189B4e1c7a1733fa8563DCC8e22231D85D8D88D8')
    .call()
  console.log('got back:', result)
  let profres = await contract.methods.getProfile(4).call()
  console.log('got back profile:', profres)
  profres = await contract.methods.getPub(4, 1).call()
  console.log('got back publication:', profres)
  // const r2 = await contract.methods
  //   .createProfile({
  //     to: '0x189B4e1c7a1733fa8563DCC8e22231D85D8D88D8',
  //     handle: 'wholllywolly',
  //     imageURI:
  //       'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  //     followModule: ZERO_ADDRESS,
  //     followModuleData: [],
  //     followNFTURI:
  //       'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  //   })
  //   .send({ from: '0x189B4e1c7a1733fa8563DCC8e22231D85D8D88D8' })

  // // const r2 = await contract.methods.ownerOf(0).call()
  // console.log('got profile:', r2)

  // console.log('aaa', 2)
  // const r3 = await contract.methods
  //   .post({
  //     profileId: 4,
  //     contentURI:
  //       'https://ipfs.fleek.co/ipfs/plantghostplantghostplantghostplantghostplantghostplantghos',
  //     collectModule: '0x2617Ad0202309327Ecd3766e9fF81506502d3303',
  //     collectModuleData: [],
  //     referenceModule: ZERO_ADDRESS,
  //     referenceModuleData: [],
  //   })
  //   .send({ from: '0x189B4e1c7a1733fa8563DCC8e22231D85D8D88D8' })
  // console.log('got post:', r3)
  // contract.methods.
  // const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance)
}

export const getProfileIdFromHandle = async (handle) => {
  const contract = getWeb3Contract(contract_address, LENSHUB_ABI)
  try {
    const profid = await contract.methods.getProfileIdByHandle(handle).call()
    console.log('got ', profid, ' for', handle)
    if (profid == 0) return null
    return profid
  } catch (e) {
    console.log('cannot handle', handle)
    return null
  }
}

export const getProfileById = async (id) => {
  const contract = getWeb3Contract(contract_address, LENSHUB_ABI)
  try {
    const profile = await contract.methods.getProfile(id).call()
    console.log('got ', profile, ' for', id)
    if (profile == 0) return null
    return profile
  } catch (e) {
    console.log('cannot handle', handle)
    return null
  }
}

export const createProfile = async (handle, image, userAddress) => {
  const contract = getWeb3Contract(contract_address, LENSHUB_ABI)
  let imagepath
  try {
    const client = create('https://ipfs.infura.io:5001/api/v0')
    const added = await client.add(image)
    console.log('image', added)
    imagepath = added.path
  } catch (e) {
    console.log('could not upload content', e.message)
    return null
  }
  try {
    const profile = await contract.methods
      .createProfile({
        to: userAddress,
        handle: handle,
        imageURI: 'https://ipfs.infura.io/ipfs/' + imagepath,
        followModule: ZERO_ADDRESS,
        followModuleData: [],
        followNFTURI: 'https://ipfs.infura.io/ipfs/' + imagepath,
      })
      .send({ from: userAddress })

    // const profile = await contract.methods.ownerOf(0).call()

    console.log('got ', profile, ' for', handle)
    return true
  } catch (e) {
    console.log('cannot create profile', handle, e.message)
    return null
  }
}

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
