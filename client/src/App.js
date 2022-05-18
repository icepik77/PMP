import './pages/auth';
import './App.css';
import { AuthenticationPage } from './pages/auth';
import {RegistrPage} from './pages/registr';
import { HostPage } from './pages/HostPage';
import { Route, Routes } from 'react-router-dom';
import {ISW} from './pages/ISW';
import {Cost} from './pages/cost.js';
import { render } from 'react-dom';
import  {CreateProject} from './pages/createProject';
import {Regulation} from './pages/Regulation';
import {Risks} from './pages/risks';
import {Participants} from './pages/participants';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationPage/>}/>
      <Route path="/registr" element={<RegistrPage/>}/>
      <Route path="/HostPage" element={<HostPage/>}/>
      <Route path="/isw" element={<ISW/>}/>
      <Route path ="/cost" element = {<Cost/>}/>
      <Route path ="/createProject" element = {<CreateProject/>}/>
      <Route path ="/regulation" element = {<Regulation/>}/>
      <Route path ="/risks" element = {<Risks/>}/>
      <Route path ="/participants" element = {<Participants/>}/>
    </Routes>
  );
}

export default App;
