import { BrowserRouter, Route } from 'react-router'
import Header from '../widgets/Header/ui/Header'
import SideBar from '../widgets/SideBar/ui/SideBar'
import Chat from '../pages/Chat/ui/Chat'
import { Routes } from 'react-router'
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='main-part'>
        <SideBar/>
        <Routes>
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
