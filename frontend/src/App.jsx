import React from 'react'
import NewProfile from './components/newProfile/newProfile';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/navBar/navBar';




function App()
{

  return (

    <div className="container mt-5">

      <div>

        <NavBar></NavBar>

      </div>

      <div style={{border:"1px solid black"}} className='mt-5 p-3'>
        <NewProfile></NewProfile>
      </div>

    </div>

  )

}

export default App