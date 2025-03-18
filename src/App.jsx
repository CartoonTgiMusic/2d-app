
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import DIsplaySave from './components/DIsplaySave'
import Nav from './components/Nav'
import About from './components/About'
import Home from './components/Home';
import Dropdown from './components/Dropdown';
import Table from './components/Table';
import Create from './components/Create';
import Compute from './components/Compute';
import DisplayLists from './components/DisplayLists';

function App() {

  return (
      <Router>
        <Nav/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dropdown' element={<Dropdown/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/compute' element={<Compute/>}/>
            <Route path='/displaysave' element={<DIsplaySave/>}/>
            <Route path='/table' element={<Table/>}/>
            <Route path='/displaylists' element={<DisplayLists/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
      </Router>

  )
}

export default App
