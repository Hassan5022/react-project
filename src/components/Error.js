import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css'

export default function Error() {

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }, [navigate])

  return (
    <p>Invalid URL!</p>
  )
}
