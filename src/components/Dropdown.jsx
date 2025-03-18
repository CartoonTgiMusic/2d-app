import React from 'react'
import './Dropdown.css'
import { Link } from 'react-router-dom'

const Dropdown = () => {
    const Reset=()=>{
       if(confirm('စားရင်းအားလုံးဖျက်မှာလား?')){
         localStorage.clear()
         window.location.reload()
       }
    }
  return (
    <div className="dropdown">
          <button className="dropbtn">
            <i className="fa-solid fa-list-ul"></i>
          </button>
          <div className="dropdown-content">
            <li><Link to={'/create'}>စာရင်းအသစ် သွင်းရန်</Link></li>
            <li><Link to={'/compute'}>နိုင်/ရှုံး တွက်ရန်</Link></li>
            <li><Link to={'/displaysave'}>ဘောင်ချာများ ကြည့်ရန်</Link></li>
            <li><Link to={'/table'}>မိန်းစာမျက်နှာ ကြည့်ရန်</Link></li>
            <li><Link to={'/displaylists'}>စားရင်းအားလုံး ကြည့်ရန်</Link></li>
            <li style={{color:'red'}} onClick={Reset}><Link to={'/'}>စားရင်းအားလုံး ဖျက်ရန်</Link></li>
            <li><Link to={'/about'}>About</Link></li>
          </div>
        </div>
  )
}

export default Dropdown
