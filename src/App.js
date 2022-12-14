// style
import './App.css';
// components
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error'
// pages and components
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Tool from './pages/tool/Tool';
import CommingSoon from './pages/CommingSoon';
import ImageGenerator from './pages/tool/ImageGenerator';
import data from './routes.json'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/tool' element={<Tool />} />
          {data.map((elem) => (
            elem.status === 'NEW!' ? <Route path={`/tool/${elem.route}`} key={elem.id} element={<ImageGenerator data={elem} />} />: <Route path={`/tool/${elem.route}`} key={elem.id} element={<CommingSoon />} />
          ))}
          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
