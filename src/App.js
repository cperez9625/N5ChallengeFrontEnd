import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PermissionsMain from './components/PermissionsMain';
import PermissionManagement from './components/PermissionManagement';
class App extends React.Component{
  render() {
    const myStyle={
      backgroundColor:'gray',
    //   backgroundImage: 
    // "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
      height:'2000vh',
      marginTop:'-42px',
      // fontSize:'50px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
  };

    return(
      <div style={myStyle}>
              <Router>
        <Routes>
          <Route exact path="/" element={<PermissionsMain/>}/>
          <Route path='/add'  element={<PermissionManagement/>}/>
        </Routes>
      </Router>
      </div>

    );
    
  }
}
export default App;
