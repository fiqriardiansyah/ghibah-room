import React,{useRef} from 'react';


export const useComponentWillMount = callback =>{
    const willMount = useRef(true);

    if(willMount.current) return callback();

    willMount.current = false;
}