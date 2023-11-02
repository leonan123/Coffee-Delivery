import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

interface Address {
  city: string
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  stateCode: string
}

interface LocationContextType {
  location: Address
}

export const LocationContext = createContext({} as LocationContextType)

interface LocationProviderProps {
  children: React.ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [location, setLocation] = useState<Address>(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:location-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return {}
  })

  async function getUserLocationData(latitude: number, longitude: number) {
    const url = 'https://api.bigdatacloud.net/data/reverse-geocode'

    const response = await axios.get(`${url}`, {
      params: {
        latitude,
        longitude,
        localityLanguage: 'pt',
        key: 'bdc_5c9de794b7f74797bcc61b4e9e49a395',
      },
    })

    return response.data
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords

      const locationData = await getUserLocationData(latitude, longitude)

      setLocation((state) => {
        return {
          ...state,
          city: locationData.city,
          stateCode: locationData.principalSubdivisionCode.substr(3) ?? '',
        }
      })
    })
  }, [])

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  )
}
