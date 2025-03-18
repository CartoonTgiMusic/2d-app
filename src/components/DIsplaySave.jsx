import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DIsplaySave = () => {
  const navigate = useNavigate()
    const [save, setSave] = useState([]);
  
    // Load data from localStorage on component mount
    useEffect(() => {
      const storedsave = JSON.parse(localStorage.getItem('save')) || [];
      setSave(storedsave);
    }, []);

    useEffect(()=>{
      localStorage.setItem('save',JSON.stringify(save))
    },[save])
  
  return (
<div className='table-ctn'>
  {save.map((entry, index) => (
    <div key={`vol-${index}`} style={{paddingTop:'10px'}} onClick={()=>navigate('/')}>
      <h4 style={{textAlign:'center'}}>{`VOL-${index + 1}`}</h4>
      <table id="saveTable">
        <thead>
            <tr>
              <th>Code</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
        </thead>
        <tbody>
          {entry.map((item, idx) => (
            <tr key={`${index}-${idx}`}>
              {/* Code Cell */}
              <td style={{backgroundColor:item.code? "inherit" : "#f4f4f4"}}>
                {Array.isArray(item.code) ? item.code.join(', ') : item.code }
              </td>

              {/* Price Cell */}
              <td style={{ backgroundColor: item.price ? 'inherit' : ' #f4f4f4' }}>
                {item.price || 'စုစုပေါင်း'}
              </td>

              <td style={{ backgroundColor: item.qty ? 'inherit' : ' #f4f4f4' }}>
                {item.qty || ''}
              </td>

              {/* Subtotal Cell */}
              <td style={{backgroundColor:item.enterTotal ? ' #f4f4f4' : 'inherit'}}>{item.subtotal || item.enterTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
</div>
  );
};

export default DIsplaySave;