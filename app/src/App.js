import React, {useState, useEffect} from 'react';
import axios from 'axios'
import localforage from 'localforage'
import {encrypt, decrypt, generateKey} from './secretbox'

const access_token = 'aeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IjQxMjMyNDAwODkwIiwibmFtZWlkIjoiNDEyMzI0MDA4OTAiLCJnaXZlbl9uYW1lIjoiS2VsdnltIE1pcmFuZGEiLCJ2ZXJzaW9uIjoidjEiLCJpYXQiOiIxNTg4MjA2NTYwIiwiZW1haWwiOiJrZWx2eW1tQGdtYWlsLmNvbSIsImNsaSI6IntcIkNsaWVudElkXCI6XCI4NzZkYWIyMTkwNDY0ODg0YmY5YjA5MmFhMTQwNzU4NVwiLFwiTmFtZVwiOlwiUG9ydGFsL0hvbWUgQnJva2VyXCIsXCJJbnRlcm5hbFwiOmZhbHNlfSIsImFjYyI6IjcwNTQyMjgiLCJlc2ciOiJBTEloOVdYK256WW1TUGJZKyticnU2Z0FuUjdnbTYvdTI3ekpOVE5HZjMrK2NlR3dCU1k9IiwiYWR2IjoiODAiLCJjaWEiOiIxOTEuMTMuOTQuNjUiLCJzaGMiOiI2TjhTSyIsImlzcyI6Imh0dHBzOi8vYXBpLmVhc3ludmVzdC5jb20uYnIvYXV0aCIsImF1ZCI6Imh0dHBzOi8vd3d3LmVhc3ludmVzdC5jb20uYnIiLCJleHAiOjE1ODgyMzUzNjB9.NfJ9kJzuh7-haOOgy3dB21KyqSb6xrV_2XFcVidZXC0'
const enc = new TextEncoder()
const key = generateKey(enc.encode(access_token.slice(0,32)))

function App() {
  const [request, setRequest] = useState(null)

  useEffect(() => {
    const fetchCustodyPosition = async () => {
      console.log(key)
      const hasItem = await localforage.getItem('custodyPosition')
      
      if(!hasItem){
        axios.get('http://localhost:3200/custody-position').then(res => {
          const custodyPosition = res.data

          localforage.setItem('custodyPosition', encrypt(custodyPosition, key)).then(function () {
            return localforage.getItem('custodyPosition');
          })
        })
      }
    }

    fetchCustodyPosition()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const imprimeDados = async () => {
    const storage = await localforage.getItem('custodyPosition')
    setRequest(storage, key)
  }
  const decifra = async () => {
    const storage = await localforage.getItem('custodyPosition')
    setRequest(decrypt(storage, key))
  }
  return (
    <div>
        <button onClick={() => imprimeDados()}>Traz valor</button>
        <button onClick={() => decifra()}>Decifra</button>
        <div>
          {JSON.stringify(request)}
        </div>
    </div>
  );
}

export default App;
