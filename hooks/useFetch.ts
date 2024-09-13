import React, { useEffect, useState } from "react"

const useFetch = (api: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(api)
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        setError("An error occurred. Awkward..")
      } finally {
        setLoading(false)
      }
    }
  }, [api])

  return { loading, data, error }
}

export default useFetch
