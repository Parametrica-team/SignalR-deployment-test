import styles from '../styles/Home.module.css'
import React, { useEffect } from 'react'
import useConnection from '../features/connection/useConnection'
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState('')
  const [weather, setWeather] = useState('')

  // let connection = useConnection();
  // if (connection){
  //   connection.invoke<string>("Echo", "fuck you!").then(r => {
  //     setResponse(r);
  //   })
  // }

  useEffect(()=>{
    const getWeather = async () => {
      const r = await fetch("https://urbanbot.parametrica.work:5025/weatherforecast");
      const text = await r.text()
      setWeather(text)
    }

    getWeather()

  },[])
  
  return (
    <div className={styles.container}>
      <h1>frontpage</h1>
      <h1>{response}</h1>
      <div>{weather}</div>
    </div>
  )
}
