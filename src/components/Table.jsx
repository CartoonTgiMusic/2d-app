import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate =useNavigate()
  // State to store the table data
  const [fortable, setFortable] = useState([]);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('fortable')) || [];
    setFortable(storedData);
  }, []);

  // Flatten the data
  const combindData = fortable.flat().flat();

  // Calculate the total
  const tableTotal = combindData.reduce((sum, obj) => {
    const value = parseFloat(Object.values(obj)[0]);
    return sum + value;
  }, 0);

  // Generate keys (00 to 99)
  const numbers = Array.from({ length: 100 }, (_, i) => i + 0); // [0, 1, 2, ..., 99]
  const keys = numbers.map(num => (num < 10 ? `0${num}` : `${num}`));

  // Group data by keys
  const data = combindData.reduce((acc, obj) => {
    keys.forEach(key => {
      if (obj[key]) {
        acc[key] = acc[key] || [];
        acc[key].push(obj[key]);
      }
    });
    return acc;
  }, {});

  // Render the table
  const generateTable = (data, keys) => {
    return (
      <div onClick={()=>navigate('/')}>
        <h4 style={{ padding: '8px' }}>Main Lists</h4>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Prices</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {keys.map(key => {
              const values = data[key] || [];
              const total = values.reduce((sum, value) => sum + Number(value), 0);
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{values.join(', ')}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h4 style={{ padding: '8px' }}>စုစုပေါင်း = {tableTotal}</h4>
      </div>
    );
  };

  return (
    <div>
      {generateTable(data, keys)}
    </div>
  );
};

export default Table;