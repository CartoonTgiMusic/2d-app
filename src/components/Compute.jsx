import React, { useState,useEffect } from 'react';
import './Compute.css'
import { useNavigate } from 'react-router-dom';

const Compute = () => {
  const navigate = useNavigate()
  // State for input values
  const [JP, setJP] = useState('');
  const [xx, setXx] = useState('');
  const [comm, setComm] = useState('');

  // State for managing UI visibility
  // const [isInputActive, setIsInputActive] = useState(true);
  const [forcompute, setForcompute] = useState([]);

  // Handle input changes
  const handleJPChange = (e) => setJP(e.target.value);
  const handleXxChange = (e) => setXx(e.target.value);
  const handleCommChange = (e) => setComm(e.target.value);

  // Compute function
  const compute = () => {
    // Validation
    if (JP === '' || xx === '' || comm === '' || JP.length !== 2 || xx > 100) {
      alert('Please fill all fields correctly.');
      return;
    }

    // Add new entry to forcompute
    const newEntry = { JP, xx, comm };
    const updatedForcompute = [...forcompute, newEntry];
    setForcompute(updatedForcompute);

    // Save to localStorage
    localStorage.setItem('forcompute', JSON.stringify(updatedForcompute));

    // Reset inputs and update UI
    setJP('');
    setXx('');
    setComm('');
    // setIsInputActive(false);
  };
 
  // Edit function
  const edit = () => {
    forcompute.splice(0,forcompute.length)
    Result.splice(0,Result.length)
    localStorage.setItem('forcompute',JSON.stringify(forcompute))
    localStorage.setItem('result',JSON.stringify(Result))
    document.location.reload()
  };

const [fortable,setFortable]=useState([])
const [Result,setResult]=useState([])


useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('fortable')) || [];
    setFortable(storedData);
  }, []);

useEffect(() => {
    const resultData = JSON.parse(localStorage.getItem('result')) || [];
    setResult(resultData);
  }, []);


const comArrs = fortable.flat().flat();
const tableTotal = comArrs.reduce((sum, obj) => {
  let value = parseFloat(Object.values(obj)[0]);
  return sum + value;
}, 0);

const numbers = Array.from({ length: 100 }, (_, i) => i + 0); // [0, 1, 2, ..., 99]
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

      keys.map(key => {
        const values = data[key] || [];
        const total = values.reduce((sum, value) => sum + Number(value), 0);
        return forcompute.map(item => {
          if (item.JP === key) {
            let jp = total * item.xx;
            let comcompute = tableTotal * item.comm / 100;
            let winlose = tableTotal - (comcompute + jp);

            let num = key
            let xx = item.xx
            let com = item.comm
            
            let obj = {num:num,xx:xx,total:total,jpprice:jp,com:com,comcompute:comcompute,winlose:winlose}
            Result.push(obj)
            localStorage.setItem('result',JSON.stringify(Result))
            if(Result.length>1){
              Result.splice(0,Result.length-1)
              localStorage.setItem('result',JSON.stringify(Result))
            }
          }
          return null;
        });
      })
const savetolists = JSON.parse(localStorage.getItem('savetolists')) || []
const create = JSON.parse(localStorage.getItem('create'))
const SaveToLists=()=>{
    if(forcompute == ""){
      return
    }
    savetolists.push([create,fortable,forcompute,Result])
    localStorage.setItem('savetolists',JSON.stringify(savetolists))
    localStorage.removeItem('create')
    localStorage.removeItem('fortable')
    localStorage.removeItem('forcompute')
    localStorage.removeItem('result')
    localStorage.removeItem('save')
    navigate('/')
    window.location.reload()
   }
  // Render the component
  return (
    <div className='compute-ctn'>
              <h3>နိုင်ရှူံးစားရင်း</h3>
    <div className='ul-ctn'>{
      Result.map((res,index)=>{
       return(
          <ul key={index} style={{border:'2px solid black',padding:'10px', listStyle:'none',margin:'10px'}}>
            <li>ကောက်ကြေး = {tableTotal}</li>
            <li>ကော်မရှင် ={tableTotal} x 0.{res.com} = {res.comcompute}</li>
            <li>ဆ = {res.xx}</li>
            <li>လျော် = ({res.num}) = {res.total} x {res.xx} = - {res.jpprice}</li>
            <li style={{
                        color: res.winlose > 0 ? 'blue' : res.winlose < 0 ? 'red' : 'black',
                        fontWeight: 'bold'
                      }}
            > {res.winlose > 0 ? 'မြတ်' : 'စိုက်'} = {tableTotal} - {res.jpprice}  - {res.comcompute } = {res.winlose}</li>
          </ul>
       )
      })
      }
    </div>

      <div className='ins-ctn'>
        <input
          type="text"
          // className={`jp-input ${isInputActive ? '' : 'inactive'}`}
          value={JP}
          onChange={handleJPChange}
          placeholder="ပေါက်တီး"
          // disabled={!isInputActive}
        />
        <input
          type="number"
          // className={`x-input ${isInputActive ? '' : 'inactive'}`}
          value={xx}
          onChange={handleXxChange}
          placeholder="ဆ"
          // disabled={!isInputActive}
        />
        <input
          type="text"
          // className={`commition-input ${isInputActive ? '' : 'inactive'}`}
          value={comm}
          onChange={handleCommChange}
          placeholder="ကော်မရှင်"
          // disabled={!isInputActive}
        />
        <button
          // className={`compute-enter-btn ${isInputActive ? '' : 'inactive'}`}
          onClick={compute}
        >
        တွက်မည်
        </button>
        <button
          // className={`compute-edit-btn ${isInputActive ? 'inactive' : ''}`}
          onClick={edit}
        >
          Edit
        </button>
        <button
          // className={`compute-save-btn ${isInputActive ? 'inactive' : ''}`}
          onClick={SaveToLists}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Compute;