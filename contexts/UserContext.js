import React from 'react'

const UserContext = React.createContext({
  user: null,
  update: (data) => {},
})

export default UserContext
