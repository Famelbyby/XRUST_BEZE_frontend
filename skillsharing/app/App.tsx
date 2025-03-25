import './App.scss'
import { BrowserRouter, Route } from 'react-router'
import Header from '../widgets/Header/ui/Header'
import SideBar from '../widgets/SideBar/ui/SideBar'
import Chat from '../pages/Chat/ui/Chat'
import Dialogs from '../pages/Dialogs/ui/Dialogs'
import Profile from '../pages/Profile/ui/Profile'
import Settings from '../pages/Settings/ui/Settings'
import { Routes } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='main-part'>
        <SideBar/>
        <Routes>
          <Route path='/profile/:userID' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/chat/:chatID' element={<Chat/>} />
          <Route path='/chats' element={<Dialogs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
