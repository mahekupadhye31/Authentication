import Form from './components/Form'
import Signin from './components/Signin';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,

} from "react-router-dom";

function App(){
  return (
    
     <>
     <Routes>
     <Route path='/' element={<Form/>}/>
     <Route path='/Form' element={<Form/>}/>
     <Route path='/Signin' element={<Signin/>} />
     </Routes>
    
  </>
  );
}

export default App;
