import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LinksList } from '../components/LinksList'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/auth.contexr'
import { useHttp } from '../hooks/http.hook'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {requset, loading} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try{
      const fethced = await requset('/api/link', 'GET', null, {Authorization: `Bearer ${token}`})
      setLinks(fethced)
    } catch(e) {

    }
  }, [requset, token])


  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if(loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links ={links}/>}
    </>
  )
}
