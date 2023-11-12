// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import './i18n';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import "@progress/kendo-theme-material/dist/all.css";
import { createRoot } from 'react-dom/client';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import 'vazirmatn/Vazirmatn-font-face.css';
import 'vazirmatn/Vazirmatn-Variable-font-face.css';
import axios from 'axios';

/**
 * Axios HTTP Request defaults
 */

let isLocal = false;
if (isLocal)
  axios.defaults.baseURL = "http://localhost/nft-wallet-backend/public";
else
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
console.log(process.env.REACT_APP_BACKEND_URL)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';




const container = document.getElementById('root');
const root = createRoot(container);


const NoAccess =({message,ip})=>{
  return (<div style={{width:"100%",height:"100%",textAlign:"center",color:"white"}}>
    <h1 style={{color:"red"}}>403 - ACCESS DENIED</h1>
    <h3>sorry,you are connected from an unathorized country</h3>
  </div>);
}

    root.render(<App />);
axios.post('api/site', {}).then((response) => {
  setTimeout(()=>{
    root.render(<App />);
  },3000)
}).catch(error =>{
  if(error.response.status===403){
    root.render(<NoAccess message={error.response.data.message} ip={error.response.data.data.ip} />);
  }
});

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
