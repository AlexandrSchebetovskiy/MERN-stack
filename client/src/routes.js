import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"


export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      
      <Switch>
        <Route path="/links" exact >
          <LinksPage />
        </Route>
        <Route path="/create">
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  )
}