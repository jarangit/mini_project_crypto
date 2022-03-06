import React from 'react'
// import millify from 'millify'
// import HTMLReactParser from 'html-react-parser'

import {useGetExchangesQuery} from '../services/cryptoApi'
const Exchanges = () => {
  const {data, isFetching} = useGetExchangesQuery()
  console.log(data);
  return (
    <div>Exchanges</div>
  )
}

export default Exchanges