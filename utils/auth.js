// import java.util.regex.Matcher;
// import java.util.regex.Pattern;

import Onboard from 'bnc-onboard'
import Web3 from 'web3'
const USER_LOCAL_STORAGE_KEY = 'user'
const WALLET_PREFERENCE_KEY = 'wallet'

export async function loginWithBlockNative(preference) {
  let web3

  // head to blocknative.com to create a key
  const BLOCKNATIVE_KEY = process.env.BN_API_KEY

  // the network id that your dapp runs on
  const NETWORK_ID = 1

  const onboard = Onboard({
    dappId: BLOCKNATIVE_KEY,
    networkId: NETWORK_ID,
    subscriptions: {
      wallet: (wallet) => {
        // instantiate web3 when the user has selected a wallet
        web3 = new Web3(wallet.provider)
        window.web3provider = wallet.provider
        saveWalletPreferenceToStorage(wallet.name)
        console.log(`${wallet.name} connected!`)
      },
    },
  })
  // Prompt user to select a wallet
  console.log('logging in with preference', preference)
  const selected = await onboard.walletSelect(preference)
  let state = onboard.getState()
  console.log('inbetween state', state)
  if (!selected) {
    return null
  }
  // if (!state.address) {
  //   return null
  // }
  // Run wallet checks to make sure that user is ready to transact
  await onboard.walletCheck()
  const currentState = onboard.getState()
  console.log(currentState)
  window.web3 = web3

  console.log('Setting address', currentState.address)
  let user = { address: currentState.address }
  return user
}

export const logout = async () => {
  await window?.solana.disconnect()
  // removeLoggedInUserFromLocalStorage()
  removeWalletPreferenceFromLocalStorage()
}

const saveToLocalStorage = (key, data) => {
  window.dispatchEvent(new Event('storage'))
  localStorage.setItem(key, data)
}

const readFromLocalStorage = (key) => {
  window.dispatchEvent(new Event('storage'))
  return JSON.parse(localStorage.getItem(key))
}

////preference saving

export const saveWalletPreferenceToStorage = (preferenceData) => {
  saveToLocalStorage(WALLET_PREFERENCE_KEY, JSON.stringify(preferenceData))
  window.dispatchEvent(new Event('preference-storage'))
}
export const getUserFromWalletWithPreference = async () => {
  if (!isPreferenceSet()) {
    console.log('preference was not set while attempting to read user')
    //if nto set, do not auto-start
    // return await loginWithBlockNative()
    return null
  }
  const wallet = readFromLocalStorage(WALLET_PREFERENCE_KEY)
  console.log('wallet', wallet)
  try {
    return await loginWithBlockNative(wallet)
  } catch (e) {
    console.log('error logging in', e.message)
    return null
  }
}

export const isPreferenceSet = () => {
  return readFromLocalStorage(WALLET_PREFERENCE_KEY) !== null
}

export const removeWalletPreferenceFromLocalStorage = () => {
  localStorage.removeItem(WALLET_PREFERENCE_KEY)
  window.dispatchEvent(new Event('preference-storage'))
}

export const requestUserLogin = async (global) => {
  let user = await loginWithBlockNative()
  if (user) global.update({ user: { address: user.address, hasAccess: true } })
  // router.reload()
}
