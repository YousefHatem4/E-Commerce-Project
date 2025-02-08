import React, { useState } from 'react'
import style from './Loading.module.css'
import { RingLoader } from 'react-spinners'
const override =
{
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
export default function Loading() {
   
    return <>
        <div className="sweet-loading py-10 ">
            
            <RingLoader

                color={'#000000'}
                loading={Loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    </>
}
