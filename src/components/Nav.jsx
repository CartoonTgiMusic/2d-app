
import './Nav.css'
import { Link } from "react-router-dom";

import React from 'react'

const Nav = () => {
  const create = JSON.parse(localStorage.getItem('create'))||[]

  return (
    <div className='nav-ctn'>
      <div className="navbar">
          <div><Link to={'/'}><i className="fa-solid fa-house"></i></Link></div>
          
          <div>
              {create.length > 0 ? (
                <div style={{display:'flex',alignItems:'center'}}>
                  <p style={{paddingRight:'10px'}}>{create[0].Date}</p>
                  <p>({create[0].Ampm})</p>
                </div>
              ) : (
                <p>နေ့စွဲထည့်ရန် လိုအပ်သည်.</p>
              )}
        </div>

        <div><Link to={'/dropdown'}><i className="fa-solid fa-list-ul"></i></Link></div>
      </div>
    </div>
  )
}

export default Nav
