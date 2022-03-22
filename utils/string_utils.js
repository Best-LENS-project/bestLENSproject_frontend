export function makeAddressShort(addr) {
  {
    if (!addr) return
    return addr.substr(0, 4) + '...' + addr.substr(addr.length - 4)
  }
}
