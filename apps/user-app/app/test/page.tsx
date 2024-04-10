"use client";
import { useEffect } from 'react';
import { useBalance } from '@repo/store/useBalance';


// here we will test whether we have the proper setting or not for this purpose 

export default  function Test (){
    const balance = useBalance();
    
    useEffect(() => {
        console.log("this is the rendering of the component and the value of the balance is as follows \n", balance);
        
    }, [balance])

    // here we have to return the component from the this file for this purpsoe 
    return (
        <>
        <h1>The balance currently that you have is as follows {balance}</h1>
        </>
    )

}