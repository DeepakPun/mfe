import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    })

  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el)

  return {
    onParentNavigate({ pathname: nextPathname }) {
      // console.log('Container just navigated')

      const { pathname } = history.location
      if (pathname !== nextPathname) {
        // console.log(location)
        history.push(nextPathname)
      }
    },
  }
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }
