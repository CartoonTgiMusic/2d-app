import React, { useState, useEffect } from 'react';

const DisplayLists = () => {
  const [savetolists, setSavetolists] = useState([]);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('savetolists');
    if (savedData) {
      setSavetolists(JSON.parse(savedData));
    }
  }, []);

  if (savetolists.length === 0) {
    return <h4 style={{marginTop:'50px',textAlign:'center'}}>စားရင်းမရှိသေးပါ.</h4>;
  }

  return (
    <div id="savetolists-ctn" style={{marginTop:'35px'}}>
      {savetolists.map((entry, index) => (
        <SaveEntry key={index} entry={entry} />
      ))}
    </div>
  );
};

const SaveEntry = ({ entry }) => {
  const [isTableVisible, setTableVisible] = useState(false);
  const [isComputeVisible, setComputeVisible] = useState(false);

  const dateAmpm = entry[0][0];
  const tablesData = entry[1];
  const details = entry[2][0];
  const computeDetails = entry[3][0];

  const comArrs = tablesData.flat().flat();
  const saveallTotal = comArrs.reduce((sum, obj) => sum + parseFloat(Object.values(obj)[0]), 0);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 0);
  const keys = numbers.map(num => (num < 10 ? `0${num}` : `${num}`));

  const data = comArrs.reduce((acc, obj) => {
    keys.forEach(key => {
      if (obj[key]) {
        acc[key] = acc[key] || [];
        acc[key].push(obj[key]);
      }
    });
    return acc;
  }, {});

  const generateSaveAllTable = (data, keys) => {
    return (
      <table className="formain-table toggle-table">
        <thead>
          <tr className="tr-btn">
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
    );
  };

  const handleTableToggle = () => setTableVisible(!isTableVisible);
  const handleComputeToggle = () => setComputeVisible(!isComputeVisible);

  return (
    <div className="savelist-ctn"style={{padding:'0.5rem'}}>
        <div>
            <h4 className="saveall-header" onClick={handleTableToggle}>
                {dateAmpm.Date} - {dateAmpm.Ampm} (မိန်းဇယား)
            </h4>
            {isTableVisible && (
                <div className="saveall-table" onClick={handleTableToggle}>
                {generateSaveAllTable(data, keys)}
                </div>
            )}
        </div>
      <div className="saveall-compute">
        <h4 onClick={handleComputeToggle}>{dateAmpm.Date} - {dateAmpm.Ampm}  (နိုင်/ရှုံး စားရင်း) </h4>
        {isComputeVisible && (
          <div style={{border:'1px solid gray',padding:'1rem '}} onClick={handleComputeToggle}>
            <p>ကောက်ကြေး: {saveallTotal}.</p>
            <p> ဆ: {details.xx}.</p>
            <p>လျော်: ({details.JP}) = {computeDetails.total} x {details.xx} = {computeDetails.winlose}.</p>
            <p>ကော်မရှင်: {saveallTotal} x {details.comm / 100} = {computeDetails.comcompute}.</p>
            <h4 style={{ color: computeDetails.winlose >= 0 ? 'blue' : 'red' }}>
              စုစုပေါင်း = {computeDetails.winlose}. ({computeDetails.winlose >= 0 ? 'မြတ်' : 'စိုက်'})
            </h4>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default DisplayLists;