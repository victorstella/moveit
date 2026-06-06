import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type UserData = {
  name: string
  image: string
}

type UserContextData = {
  user: UserData | null
  isLoaded: boolean
  saveUser: (data: UserData) => void
  logout: () => void
}

const UserContext = createContext({} as UserContextData)

const USER_KEY = 'getup_user'
export const GAME_KEY = 'getup_state'

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY)
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setIsLoaded(true)
  }, [])

  function saveUser(data: UserData) {
    localStorage.setItem(USER_KEY, JSON.stringify(data))
    setUser(data)
  }

  function logout() {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(GAME_KEY)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, isLoaded, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
