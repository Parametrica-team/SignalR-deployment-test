import styles from '../styles/Home.module.css'
import React from 'react'
import useConnection from '../features/connection/useConnection'
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState('')

  let connection = useConnection();
  if (connection){
    connection.invoke<string>("Echo", "fuck you!").then(r => {
      setResponse(r);
    })
  }
  
  return (
    <div className={styles.container}>
      <h1>frontpage</h1>
      <h1>{response}</h1>
    </div>
  )
}
