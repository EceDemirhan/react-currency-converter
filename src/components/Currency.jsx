import React, { useState } from 'react';
import '../css/currency.css';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_IPkHmiLjjkLeFBoyrkhATepbYldtfqyx0rYi4K7H";

function Currency() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState("");

  const exchange = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
      );
      const rate = response.data.data[toCurrency];
      const calculated = (rate * amount).toFixed(5);
      setResult(calculated);
    } catch (error) {
      console.error("Çeviri hatası:", error);
    }
  };

  return (
    <div className="currency-div">
      <div className='title'>
        <h2>Döviz Kuru Hesapla</h2>
      </div>

      <div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className='amount'
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className='from-currency-options'
        >
          <option value="USD">USD</option>
          <option value="EUR">EURO</option>
          <option value="TRY">TRY</option>
        </select>

        <FaRegArrowAltCircleRight className='icon' />

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className='from-currency-options'
        >
          <option value="TRY">TRY</option>
          <option value="EUR">EURO</option>
          <option value="USD">USD</option>
        </select>

        <input
          value={result}
          type="number"
          readOnly
          className='result'
        />
      </div>

      <div>
        <button onClick={exchange} className='exchange'>Çevir</button>
      </div>
    </div>
  );
}

export default Currency;
