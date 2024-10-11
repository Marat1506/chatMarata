import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import SignIn from './pages/Sign-in/Sign-in.tsx'
import LogIn from './pages/Log-in/Log-in.tsx'
import Main from './pages/Main/Main.tsx'
import Home from './components/Home/Home.tsx'
import CHat from './components/Chat/Chat.tsx'
import Notifications from './components/Notifications/Notifications.tsx'
import Settings from './components/Settings/Settings.tsx'
import GroupChat from './components/GroupChat/GroupChat.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')


const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/log-in',
    element: <LogIn />
  },
  {
    path: '/main',
    element: <Main socket={socket} />,
    children: [
      {
        path: '/main/home',
        element: <Home />
      },
      {
        path: '/main/chat',
        element: <CHat socket={socket}/>,
        children: [
          {
            path: '/main/chat/group/:id',
            element: <GroupChat />
          }
        ]
      },
      {
        path: '/main/notifications',
        element: <Notifications />
      },
      {
        path: '/main/settings',
        element: <Settings />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>,
)
