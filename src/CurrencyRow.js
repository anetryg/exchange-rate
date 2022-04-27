import React from "react";

export default function CurrencyRow(props) {
    const {
        currency,
        selectedCurrency,
        onChangeCurrency,
        amount, 
        onChangeAmount
    } = props
    return (
        <div>
            <input type="number" className="input" value={amount} onChange = {onChangeAmount} />
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currency.map((options, index) => (
                    <option value={options} key={index}>{options}</option>
                ))}
                
            </select>
        </div>
    )
}