import './App.scss'
import { BrowserRouter, Route } from 'react-router'
import Header from '../widgets/Header/ui/Header'
import SideBar from '../widgets/SideBar/ui/SideBar'
import Chat from '../pages/Chat/ui/Chat'
import Dialogs from '../pages/Dialogs/ui/Dialogs'
import Profile from '../pages/Profile/ui/Profile'
import Main from '../pages/Main/ui/Main'
import Settings from '../pages/Settings/ui/Settings'
import { Routes } from 'react-router'
import User from '../entity/User/User'
import WebSocket from '../shared/WebSocket/WebSocket'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    WebSocket.openSocket(User.getUserID());
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <div className='main-part'>
        <SideBar/>
        <Routes>
          <Route index element={<Main />} />
          <Route path='/profile/:userID' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/chat'>
            <Route path='/:chatID' element={<Chat />} />
          </Route>
          <Route path='/chats' element={<Dialogs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
