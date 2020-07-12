import React from 'react'

import {
  Route as ReactDomRoute,
  RouteProps as ReactDomRouteProps,
  Redirect as ReactDomRedirect
} from 'react-router-dom'

import { useAuth } from '../hooks/auth'

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean,
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...props }) => {
  const { user: isSigned } = useAuth()

  return (
    <ReactDomRoute
      {...props}
      render={() => {
        return isPrivate === !!isSigned ? (
          <Component />
        ) : (
          <ReactDomRedirect to={{
            pathname: isPrivate ? '/' : '/dashboard'
          }}/>
        )
      }}
    />
  )
}

export default Route
