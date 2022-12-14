import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToolNavbar from './tool/ToolNavbar';

export default function CommingSoon() {

  const navigate = useNavigate()

  useEffect(() => {
      setTimeout(() => {
          navigate('/tool')
      }, 2000)
  }, [navigate])

  return (
    <div className='tool'>
      <ToolNavbar/>
      <h2>Comming Soon</h2>
    </div>
  )
}
