import React from 'react'
import { Route } from 'react-router-dom'
import PageWrapper from '../layout/PageWrapper'
import ProtectedRoute from './protectedRoute'

export const generateRoute = (routes) => {
  return routes.map((route, index) => {
    return route.index ? (
      <Route
        index
        path={route.path}
        element={
          <ProtectedRoute state={route.state} isAllowed={true}>
            <PageWrapper state={route.state}> {route.element}</PageWrapper>
          </ProtectedRoute>
        }
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <ProtectedRoute state={route.child ? undefined : route.state} isAllowed={true} role={route.role} >
            <PageWrapper state={route.child ? undefined : route.state}>{route.element}</PageWrapper>
          </ProtectedRoute>
        }
        key={index}
      >
        {route.child && generateRoute(route.child)}
      </Route>
    )
  })
}
