import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'


const API = import.meta.env.VITE_API
const PhotographerContext = createContext()

export function PhotographerProvider({ children }){
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // UI states
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 420)

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(999999)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [selectedStyles, setSelectedStyles] = useState([])
  const [city, setCity] = useState('')
  const [sortBy, setSortBy] = useState('')

  // pagination
  const PAGE_SIZE = 6
  const [page, setPage] = useState(1)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    axios.get(`${API}`)
      .then(res => {
        if(!mounted) return
        setAll(res.data || [])
        // set sensible price bounds
        const prices = (res.data || []).map(p => p.price)
        if(prices.length){
          setMinPrice(Math.min(...prices))
          setMaxPrice(Math.max(...prices))
        }
      })
      .catch(e => setError(e))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  // unique styles & cities
  const styles = useMemo(() => {
    const s = new Set()
    all.forEach(p => (p.styles || []).forEach(x => s.add(x)))
    return Array.from(s)
  }, [all])

  const cities = useMemo(() => {
    const s = new Set(all.map(p => p.location))
    return Array.from(s)
  }, [all])

  // filtering & sorting
  const filtered = useMemo(() => {
    let res = [...all]
    const q = (debouncedSearch || '').trim().toLowerCase()
    if(q){
      res = res.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.location || '').toLowerCase().includes(q) ||
        ((p.tags || []).join(' ') || '').toLowerCase().includes(q)
      )
    }

    // price range
    res = res.filter(p => Number(p.price) >= Number(minPrice) && Number(p.price) <= Number(maxPrice))

    // rating
    if(Number(ratingFilter) > 0) res = res.filter(p => Number(p.rating) >= Number(ratingFilter))

    // styles: require all selected styles (AND)
    if(selectedStyles.length > 0){
      res = res.filter(p => selectedStyles.every(s => (p.styles || []).includes(s)))
    }

    // city
    if(city) res = res.filter(p => p.location === city)

    // sort options
    if(sortBy === 'price_asc') res.sort((a,b) => a.price - b.price)
    else if(sortBy === 'rating_desc') res.sort((a,b) => b.rating - a.rating)
    else if(sortBy === 'recent') res.sort((a,b) => b.id - a.id)

    return res
  }, [all, debouncedSearch, minPrice, maxPrice, ratingFilter, selectedStyles, city, sortBy])

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page])

  function loadMore(){ setPage(p => p + 1) }
  function resetPagination(){ setPage(1) }

  // reset page when filters/search change
  useEffect(() => { resetPagination() }, [debouncedSearch, minPrice, maxPrice, ratingFilter, selectedStyles, city, sortBy])

  return (
    <PhotographerContext.Provider value={{
      all,
      loading,
      error,
      filtered,
      paginated,
      styles,
      cities,
      search,
      setSearch,
      minPrice, setMinPrice,
      maxPrice, setMaxPrice,
      ratingFilter, setRatingFilter,
      selectedStyles, setSelectedStyles,
      city, setCity,
      sortBy, setSortBy,
      page, loadMore
    }}>
      {children}
    </PhotographerContext.Provider>
  )
}

export const usePhotographers = () => useContext(PhotographerContext)
