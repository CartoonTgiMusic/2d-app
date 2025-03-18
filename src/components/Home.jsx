import React, { useState, useRef, useEffect } from 'react';
import './Home.css'


const Home = () => {
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [activeInput, setActiveInput] = useState('code');
  const keyboardRef = useRef(null);
  // const forcompute = JSON.parse(localStorage.getItem('forcompute')) || []
  const table = JSON.parse(localStorage.getItem("table")) || [];
  const fortable = JSON.parse(localStorage.getItem("fortable")) || [];
  const create = JSON.parse(localStorage.getItem("create")) || [];
  const save = JSON.parse(localStorage.getItem("save")) || [];
  // const totals = JSON.parse(localStorage.getItem("totals")) || [];
  // for display
  const [enter, setEnter] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedEnter = JSON.parse(localStorage.getItem('enter')) || [];
    setEnter(storedEnter);
  }, []);

  // Save data to localStorage whenever `enter` changes
  useEffect(() => {
    localStorage.setItem('enter', JSON.stringify(enter));
  }, [enter]);

  const total = enter.reduce((acc, item) => acc + (+item.subtotal || 0), 0);

  const handleRemove = (index) => {
    const updatedEnter = enter.filter((_, i) => i !== index);
    setEnter(updatedEnter);
  };

  const keyboardLayout = [
    '1', '2', '3', 'ပတ်', '<',
    '4', '5', '6', 'တိုင်', 'ထိပ်',
    '7', '8', '9', 'ပူး', 'ပိတ်',
    'Save', '0', '=', 'v', 'Enter'
  ];

const handleKeyPress = (key) => {
    if (key === '<') {
      if (activeInput === 'code') {
        setCode((prev) => {
          const lastChar = prev.charAt(prev.length - 1);
          if (lastChar === 'ပူး') {
            return prev.slice(0, -2);
          }if (lastChar === '်'){
            return prev.slice(0,-4)
          }
          else {
            return prev.slice(0, -1);
          }
        });
      } else {
        setPrice((prev) => prev.slice(0, -1));
      }
    } else if (key === 'Enter') {
      setActiveInput(activeInput === 'code' ? 'price' : 'code');
      Enter();
    } else if (key === 'Save') {
      Save();
    } else if (key === 'v') {
      keyboardRef.current.classList.add('inactive');
    } else {
      if (activeInput === 'code') {
        setCode((prev) => prev + key);
      } else {
        setPrice((prev) => prev + key);
      }
    }
  };

function roundNumbers(string) {
    const digits = string;
    const combinations = [];

    for (let i = 0; i < digits.length; i++) {
      for (let j = 0; j < digits.length; j++) {
        if (i !== j) {
          combinations.push(digits[i] + digits[j]);
        }
      }
    }

    return combinations;
  }

function hasSameNumber(str) {
    const count = {};

    for (let char of str) {
      if (count[char]) {
        return true; // The digit has appeared before
      }
      count[char] = 1;
    }

    return false; // No repeated digits found
  }

function RoundAllNumbers(string) {
    const digits = string;
    const combinations = [];

    for (let i = 0; i < digits.length; i++) {
      for (let j = 0; j < digits.length; j++) {
        combinations.push(digits[i] + digits[j]);
      }
    }

    return combinations;
  }
// const [create,setCreat]=useState([])
// useEffect(()=>{
//   const createData = JSON.parse(localStorage.getItem('create'))
//   setCreat(createData)
// },[])

const Enter = () => {
    if(create == ''){
      alert('နေ့စွဲထည့်ရန်')
      return
    }
          let CodeInput = document.querySelector("#code_input").value;
          let PriceInput = document.querySelector("#price_input").value;
          if(CodeInput === "" || PriceInput === ""){
            return
          }
          // Use a regular expression to match all non-digit characters and replace them with an empty string
          const numbersOnly = CodeInput.replace(/\D/g, '');
          const nonNumbersOnly = CodeInput.replace(/\d/g, '');

    if(numbersOnly.length != 2 && nonNumbersOnly == "" ){
      return
    }

    if(CodeInput.includes('တိုင်')){
      if(CodeInput.length > 6 || CodeInput.length < 6){
        return
      }
      // Generate the array
      const result = Array.from({ length: 20 }, (_, index) => {
        if (index < 10) {
          return `${numbersOnly}${index}`; // Add leading zero for numbers 0-9 (e.g., '00', '01', ..., '09')
        } else {
          return `${(index - 10)}${numbersOnly}`; // Generate numbers 10, 20, ..., 90
        }
      });
      let numbers = [...new Set(result)]
      let nums = numbers.map(code => ({ [code]: PriceInput }));
        table.push(nums)
        localStorage.setItem('table',JSON.stringify(table));

        let qty = numbers.length
        let subtotal = qty * PriceInput
        let codes = {code:CodeInput,qty:qty,price:PriceInput,subtotal:subtotal}
        enter.push(codes)
        localStorage.setItem("enter", JSON.stringify(enter));
        document.querySelector("#code_input").value = "";
        document.querySelector("#price_input").value = "";
            }
    
    if(CodeInput.includes('ပတ်ပူး') && nonNumbersOnly.length == 6){
      let samenums = hasSameNumber(numbersOnly);
       if(samenums || numbersOnly.length < 2 || nonNumbersOnly.length >6
       ){
        return
       }
        let allPermutations = [];
        let numbers = [numbersOnly];
        numbers.forEach((number) => {
            allPermutations = allPermutations.concat(RoundAllNumbers(number));
        });

            let nums = allPermutations.map(code => ({ [code]: PriceInput }));
            table.push(nums)
            localStorage.setItem('table',JSON.stringify(table));

            const numericPart = CodeInput.replace(/\D+/g, ''); // Remove all non-digits
            const textPart = CodeInput.replace(/\d+/g, ''); // Remove all digits
            const codeText = numericPart + textPart;
        let qty = allPermutations.length
        let subtotal = qty * PriceInput
        let codes = {code:codeText,qty:qty,price:PriceInput,subtotal:subtotal}
        enter.push(codes)
        localStorage.setItem("enter", JSON.stringify(enter));
        document.querySelector("#code_input").value = "";
        document.querySelector("#price_input").value = "";
    };

  if(CodeInput >= 0 || CodeInput <=99){
                  let codes =[CodeInput]
                  let nums = codes.map(code => ({ [code]: PriceInput }));
                  table.push(nums)
                  localStorage.setItem('table',JSON.stringify(table))
        let qty = '1'
        let code = {code:CodeInput,qty:qty,price:PriceInput,subtotal:PriceInput}
        enter.push(code)
        localStorage.setItem("enter", JSON.stringify(enter));
        document.querySelector("#code_input").value = "";
        document.querySelector("#price_input").value = "";
    };
          
  if(CodeInput.includes('=')){
            let codes = CodeInput.split("=");
            for(let i=0; i < codes.length; i++){
                if(codes[i].length !== 2){
                return
                }
              }
              let nums = codes.map(code => ({ [code]: PriceInput }));
              table.push(nums)
              localStorage.setItem('table',JSON.stringify(table))
              let qty = codes.length
              let subtotal = qty * PriceInput
              let code = {code:codes,qty:qty,price:PriceInput,subtotal:subtotal}
              enter.push(code)
              localStorage.setItem("enter", JSON.stringify(enter));
              document.querySelector("#code_input").value = "";
              document.querySelector("#price_input").value = "";
          };
  
  if(CodeInput.includes('ပတ်') && nonNumbersOnly.length === 3){
      let samenums = hasSameNumber(numbersOnly);
      if(samenums || numbersOnly.length < 2)
           {
                return
            }

              let removeChar = CodeInput.replace('ပတ်','')
              let allPermutations = [];
              let numbers = [removeChar];
              numbers.forEach((number) => {
                allPermutations = allPermutations.concat(roundNumbers(number));
              });
  
  
            let nums = allPermutations.map(code => ({ [code]: PriceInput }));
            table.push(nums)
            localStorage.setItem('table',JSON.stringify(table));

            const numericPart = CodeInput.replace(/\D+/g, ''); // Remove all non-digits
            const textPart = CodeInput.replace(/\d+/g, ''); // Remove all digits
            const codeText = numericPart + textPart;
              
              let qty = allPermutations.length
              let subtotal = qty * PriceInput
              let codes = {code:codeText,qty:qty,price:PriceInput,subtotal:subtotal}
              enter.push(codes)
              localStorage.setItem("enter", JSON.stringify(enter));
              document.querySelector("#code_input").value = "";
              document.querySelector("#price_input").value = "";
          }

  if(CodeInput.includes('ပူး') && nonNumbersOnly.length === 3){
    if(CodeInput.length > 3){
      return
    }
            let dbcodes = ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99",];
            let nums = dbcodes.map(code=>({[code]:PriceInput}))
            table.push(nums)
            localStorage.setItem('table',JSON.stringify(table))

            const numericPart = CodeInput.replace(/\D+/g, ''); // Remove all non-digits
            const textPart = CodeInput.replace(/\d+/g, ''); // Remove all digits
            const codeText = numericPart + textPart;
              let qty = dbcodes.length
              let subtotal = qty * PriceInput
              let codes = {code:codeText,qty:qty,price:PriceInput,subtotal:subtotal}
              enter.push(codes)
            localStorage.setItem("enter", JSON.stringify(enter));
            document.querySelector("#code_input").value = "";
            document.querySelector("#price_input").value = "";
          }
          
  if(CodeInput.includes('ထိပ်') && nonNumbersOnly.length === 4){
   
            if(CodeInput.length > 5){
              return
            };

              let removeChar = CodeInput.replace('ထိပ်','')
              let startValue = removeChar
              let codes =[]
              for (let i = 0; i < 10; i++) {
                 codes.push(startValue + i.toString()); // Convert each number to a string and add to codes
              }
  
  
            let nums = codes.map(code => ({ [code]: PriceInput }));
            table.push(nums)
            localStorage.setItem('table',JSON.stringify(table));

            const numericPart = CodeInput.replace(/\D+/g, ''); // Remove all non-digits
            const textPart = CodeInput.replace(/\d+/g, ''); // Remove all digits
            const codeText = numericPart + textPart;
              let qty = codes.length 
              let subtotal = qty * PriceInput
              let code = {code:codeText,qty:qty,price:PriceInput,subtotal:subtotal}
              enter.push(code)
              localStorage.setItem('enter',JSON.stringify(enter))
              document.querySelector("#code_input").value = "";
              document.querySelector("#price_input").value = "";
          }
          
  if(CodeInput.includes('ပိတ်') && nonNumbersOnly.length === 4){
            if(CodeInput.length > 5){

              return
            }

            let removeChar = CodeInput.replace('ပိတ်','')
            let codes = [];
            for (let i = 0; i < 10; i++) {
                codes.push(i.toString() + removeChar);
            }
  
  
            let nums = codes.map(code => ({ [code]: PriceInput }));
            table.push(nums)
            localStorage.setItem('table',JSON.stringify(table));

            const numericPart = CodeInput.replace(/\D+/g, ''); // Remove all non-digits
            const textPart = CodeInput.replace(/\d+/g, ''); // Remove all digits
            const codeText = numericPart + textPart;
              let qty = codes.length   
              let subtotal = qty * PriceInput
              let code = {code:codeText,qty:qty,price:PriceInput,subtotal:subtotal}
              enter.push(code)
            localStorage.setItem('enter',JSON.stringify(enter))
            document.querySelector("#code_input").value = "";
            document.querySelector("#price_input").value = "";
          }
  setCode('')
  setPrice('')
  };

const Save = () => {
    if (enter =="") {
      return enter;
    }
    let enterTotal = enter.reduce((acc, price) => acc + +price.subtotal, 0);
        fortable.push(table)
        localStorage.setItem("fortable", JSON.stringify(fortable));
        localStorage.removeItem("table");
        enter.push({enterTotal:enterTotal})
        save.push(enter);
        localStorage.setItem("save", JSON.stringify(save));

        localStorage.removeItem("enter");
        window.location.reload()
};



return (
  <div>
   <div className='table-ctn'>
      <table className="enter-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {enter.map((item, index) => (
            <tr key={index}>
              <td>{Array.isArray(item.code) ? item.code.join(', ') : item.code}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>{item.subtotal || item.enterTotal}</td>
              <td className="b-td">
                <button onClick={() => handleRemove(index)}>
                <i className="fa-solid fa-trash-can trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>       
      <h4 className='home-total'>စုစုပေါင်း = {total}/-</h4>
    </div>



{/* keyboardLayout */}
    <div className='keyboard-ctn'>
      <div className='inputs-ctn'>
      <input
      readOnly
        type="text"
        id='code_input'
        value={code}
        onFocus={() => {
          setActiveInput('code');
          keyboardRef.current.classList.remove('inactive');
        }}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code"
      />
      <input
      readOnly
        type='numbers'
        id='price_input'
        value={price}
        onFocus={() => {
          setActiveInput('price');
          keyboardRef.current.classList.remove('inactive');
        }}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      </div>

      <div className="keypart inactive" ref={keyboardRef}>
        {keyboardLayout.map((key, index) => (
          <button key={index} className="key" onClick={() => handleKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Home;