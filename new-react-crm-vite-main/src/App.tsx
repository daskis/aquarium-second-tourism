import React from 'react';
import './App.module.scss'
import {Search, Sidebar} from "@/components";
import {AppRouter} from "@/pages";
import cls from "./App.module.scss"
import { CreateInvestor } from './components/createInverstor/CreateInverstor';
function App() {

//   React.useEffect(() => {
//     fetch('https://vegas.pythonanywhere.com/api/v1/users/')
//     .then(response => response.json())
//     .then(data => console.log(data)
//     )
//   },[])


// async function postData(url = "", data = {}) {

//   const response = await fetch(url, {
//     method: "POST", 
//     headers: {
//       "Content-Type": "application/json",
//       "auth_token": "98c60d4d9584882e8345b9db03d643ae845c8c4f"
//     },
//     body: JSON.stringify(data), 
//   });
//   return response.json(); 
// }

// postData("/api/v1/cashier/", { answer: 42 }).then((data) => {
//   console.log(data);
// });


  return (
    <div className={cls.main}>
        <Sidebar/>
        <main className="main">
            <AppRouter/>
        </main>
    </div>
  )
}

export default App
