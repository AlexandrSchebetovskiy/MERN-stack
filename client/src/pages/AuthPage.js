import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.contexr'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, requset, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: [event.target.value] })
  }

  const regHandler = async () => {
    try {
      const data = await requset('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) { }
  }

  const loginHandler = async event => {
    try {
      const data = await requset('/api/auth/login', 'POST', { ...form })

      auth.login(data.token, data.userId)

    } catch (e) { }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center-align">Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизациия</span>
            <div>

              <div className="input-field">
                <input
                  id="email"
                  type="email"
                  className="validate yellow-input"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  className="validate yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                  name="password"
                />
                <label htmlFor="password">Пароль</label>
              </div>

            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                disabled={loading}
                style={{ marginRight: 10 }}
                onClick={loginHandler}
              >
                Войти
              </button>
              <button
                onClick={regHandler}
                className="btn grey lighten-1 black-text"
                disabled={loading}
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
