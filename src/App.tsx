import React, { useState } from 'react'


const App = () => {

  const [login, setLogin] = useState(1);

  return (
    <div>
      <h1 className="text-3xl font-bold underline ">

        Welcome to Image App
      </h1>

      <div className="flex flex-wrap my-10 mx-10">


        {login === 0 ?

          <div>


            <button onClick={() => { setLogin(1) }} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
          </div>
          :
          <div>
            <button onClick={() => { setLogin(0) }} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Signup</button>

          </div>

        }



      </div>

    </div>
  )
}

export default App
