import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {mediaQueries} from './utils/mediaQueries';

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html{
        font-size: 62.5%;
        font-family: 'Roboto', sans-serif;

        @media(max-width: 600px){
          font-size: 50%;
        }
    }
    body {
        padding: 0;
        margin: 0;  
        overflow: hidden;
    }

    

    /* width */
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #41414a; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #222226; 
    }

    [type="radio"]:checked,
[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #F87DA9;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}
`

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle whiteColor />
    <App/>
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.register();
