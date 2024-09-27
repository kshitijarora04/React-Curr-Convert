import { useState } from 'react'
// since index file is directly called from the components folder
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  // states to be set to pass through the data
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0)

  //taking data from useCurrencyInfo 
  const currencyInfo = useCurrencyInfo(from)

  // getting the currency options from the data
  const options = Object.keys(currencyInfo);

  // method for swap function
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  // converting the amount 
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"

      // style in react expects an object in which the values should be in string
      style={{
        backgroundImage: `url('https://www.shutterstock.com/shutterstock/photos/2469272775/display_1500/stock-photo-blue-money-business-graph-finance-chart-diagram-on-economy-d-coin-background-with-growth-financial-2469272775.jpg')`
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setFrom(currency)
                }}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
