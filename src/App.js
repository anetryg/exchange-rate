import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const URL = 'http://data.fixer.io/api/latest?access_key=b033e4b0e14a15684e3580af0fc09a56'

function App() {

  const [currency, setCurrency] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [exchange, setExchange] = useState()
  

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchange
  } else {
    toAmount = amount
    fromAmount = amount / exchange
  }

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setCurrency([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        //setToCurrency(data.rates[Object.keys(data.rates)[0]])
        setToCurrency('CZK')
        setExchange(data.rates[Object.keys(data.rates)[0]])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null && fromCurrency !== 'EUR') {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          setExchange(data.rates[toCurrency]/data.rates[fromCurrency])
        })
    }
    else if (fromCurrency !== null && toCurrency !== null && fromCurrency === 'EUR') {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          setExchange(data.rates[toCurrency])
        })
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow currency={currency} selectedCurrency={fromCurrency} onChangeCurrency={e => setFromCurrency(e.target.value)} amount={fromAmount} onChangeAmount = {handleFromAmountChange}/>
      <div>=</div>
      <CurrencyRow currency={currency} selectedCurrency={toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount} onChangeAmount = {handleToAmountChange}/>
    </>
  );
  
}

export default App;
