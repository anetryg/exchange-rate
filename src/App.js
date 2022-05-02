import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const id = process.env.REACT_APP_MY_API_ID

const URL = `http://data.fixer.io/api/latest?access_key=${id}`


function App() {

  const [currency, setCurrency] = useState(['EUR'])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState('CZK')
  const [amount, setAmount] = useState(1)
  const [amountFromCurrency, setAmountFromCurrency] = useState(true)
  const [exchange, setExchange] = useState()
  

  let toAmount
  let fromAmount
  
  if (amountFromCurrency) {
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
        setExchange(data.rates[Object.keys(data.rates)[0]])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined && fromCurrency !== 'EUR') {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          setExchange(data.rates[toCurrency]/data.rates[fromCurrency])
        })
    }
    else if (fromCurrency !== undefined && toCurrency !== undefined && fromCurrency === 'EUR') {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          setExchange(data.rates[toCurrency])
        })
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(i) {
    setAmount(i.target.value)
    setAmountFromCurrency(true)
  }

  function handleToAmountChange(i) {
    setAmount(i.target.value)
    setAmountFromCurrency(false)
  }

  return (
    <>
      <h1>CURRENCY CONVERTER</h1>
      <h2>From</h2>
      <CurrencyRow currency={currency} selectedCurrency={fromCurrency} onChangeCurrency={e => setFromCurrency(e.target.value)} amount={fromAmount} onChangeAmount = {handleFromAmountChange}/>
      <h2>To</h2>
      <CurrencyRow currency={currency} selectedCurrency={toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount} onChangeAmount = {handleToAmountChange}/>
    </>
  );
  
}

export default App;
