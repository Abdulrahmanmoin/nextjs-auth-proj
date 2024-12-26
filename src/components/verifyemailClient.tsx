'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


export default function VerifyEmailClient() {

    const searchParams = useSearchParams()

    const [isDataSent, setIsDataSent] = useState(false)

    const tokenValue = searchParams.get("token")
    console.log(tokenValue);

    const verifyEmail = () => {
        try {
            axios.post("/api/users/verifyemail", { token: tokenValue })
            setIsDataSent(true)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {!isDataSent &&
                <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>

                    <Button
                        type="submit"
                        onClick={verifyEmail}
                        className='bg-white text-black font-semibold hover:bg-slate-200'
                    >Verify your email</Button>

                </div>
            }

            {isDataSent &&
                <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>
                    <h3 className='text-white font-semibold text-3xl sm:text-4xl text-center'>You are verified</h3>
                    <Link
                        href="/login"
                        className='text-blue-300 font-semibold  p-2 rounded-md underline'
                    >Login</Link>
                </div>
            }
        </>
    )
}