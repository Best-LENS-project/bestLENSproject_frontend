export const SignMessageWithNonce = async (street, address) => {
  return window.web3.eth.personal.sign(address + 'at' + street, address)
}
// console.log(
//   await window.web3.eth.personal.ecRecover(
//     'I confirm nonce:2',
//     res,
//   )
export const signMessageWithDifferentMethods = async (street, address) => {
  console.log('signing', street, address)
  let return_value
  try {
    return_value = await window.web3.eth.personal.sign(
      address + 'at' + street,
      address,
    )
  } catch (e) {
    console.log('could not sign method one', e.message)
  }
  console.log(window.web3provider)
  try {
    return_value = await window.web3provider
      .getSigner(address)
      .sign(address + 'at' + street, address)
  } catch (e) {
    console.log('could not sign method two', e.message)
  }
  return return_value
}
