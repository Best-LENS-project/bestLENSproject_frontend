import React from 'react'

const UserContext = React.createContext({
  user: null,
  profileId: null,
  profile: null,
  update: (data) => {},
})

export default UserContext
