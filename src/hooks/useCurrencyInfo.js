// How is a custom hook designed

// custom hooks can also use built in hooks
// this piece of code sets the data of the api to a show exchange rates for a specific currency

import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    // we use useEffect here because we want to call the API whenever the component is loaded

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => setData(res[currency]))
    }, [currency])
    console.log(data);
    return data;
}

export default useCurrencyInfo;