// About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate('/')} style={{height:'100vh',textAlign:'center',marginTop:'35px',display:'grid',placeContent:'center'}}>
      <p>Wecome!</p>
      <h1 style={{padding:'20px'}}>d&d</h1>
      <p>Decveloped by Padecholl</p>
    </div>
  );
};

export default About;