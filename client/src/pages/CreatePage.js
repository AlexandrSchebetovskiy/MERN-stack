import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.contexr'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
  const history = useHistory()
  const {requset} = useHttp()
  const [link, setLink] = useState('')
  const auth = useContext(AuthContext)
  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  const pressHandler = async  event => {
    if(event.key === 'Enter') {
      try{  
        const data = await requset('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch(e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
      <div className="input-field">
        <input
        placeholder="Вставте ссылку"
          id="link"
          type="text"
          className="validate "
          name="link"
          onChange={e => setLink(e.target.value)}
          onKeyPress={pressHandler}
          value={link}
        />
        <label htmlFor="link">Ссылка</label>
      </div>
      </div>
    </div>
  )
}
