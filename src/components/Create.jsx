import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const [date, setDate] = useState('');
  const [ampm, setAmpm] = useState('');
  const [create, setCreate] = useState([]);

  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedCreate = JSON.parse(localStorage.getItem('create')) || [];
    setCreate(storedCreate);
  }, []);

    // useEffect(() => {
    //   localStorage.setItem('create', JSON.stringify(create));
    // }, [create]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (date == '') {
      alert('နေ့စွဲထည့်ရန်');
      return;
    }

    const formattedDate = date.split('-').reverse().join('/');
    const newEntry = { Date: formattedDate, Ampm: ampm };
    const latestEntry = [newEntry];

    localStorage.setItem('create', JSON.stringify(latestEntry));
    setCreate(latestEntry);
    navigate('/')
    window.location.reload()
    setDate('');
    setAmpm('');
  };

  return (
    <div style={{display:'grid',justifyItems:'center',marginTop:'35px'}}>
      <h4>နေ့စွဲထည့်ရန်</h4>
      <form onSubmit={handleSubmit} style={{width:'200px'}}>
        <div style={{marginBottom:'20px'}}>
          <label htmlFor="date">နေ့စွဲ : </label>
          <input
          style={{width:'100%',height:'30px'}}
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div style={{marginBottom:'40px'}}>
          <label htmlFor="ampm">မနက်/ညနေ : </label>
          <select
          style={{width:'100%',height:'30px'}}
            id="ampm"
            value={ampm}
            onChange={(e) => setAmpm(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="မနက်">မနက်</option>
            <option value="ညနေ">ညနေ</option>
          </select>
        </div>
         <button type="submit" style={{width:'100%',height:'50px'}}>Create</button>
      </form>
    </div>
  );
};

export default Create;
