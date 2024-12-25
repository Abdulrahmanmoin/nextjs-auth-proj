"use client"

import React, { FormEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordClient ()  {

    const searchParams = useSearchParams()

    const tokenValue = searchParams.get("token")
    console.log(tokenValue);


    const [userData, setUserData] = useState({
        token: tokenValue,
        newPassword: "",
    })

    const [isDataSent, setIsDataSent] = useState(false)
    const [isError, setIsError] = useState< string | undefined >()

    const resetPassword = async () => {

        try {
            const res = await axios.post("/api/users/forgotpassword", userData)
            console.log("res: ", res);


            userData.newPassword = ""

            setIsDataSent(true)
        } catch (error) {
            if ( axios.isAxiosError(error) && error.response) {
                console.log(error);
                console.log(error.response);
                setIsError(error.response.data.message)
            }
            else {
                console.log(error);
                setIsError("Something went wrong!")
            }

        }
    }

    return (
        <>
            {(!isDataSent && !isError) &&

                <div className='flex justify-center items-center flex-col h-screen gap-y-3 bg-black text-white px-5 sm:px-0'>

                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            resetPassword()
                        }}
                        className='space-y-10'
                    >

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                                required={true}
                                minLength={6}
                                value={userData.newPassword}
                                onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className='bg-white text-black font-semibold hover:bg-slate-200'
                        >Reset Password</Button>

                    </form>

                </div >}

            {
                isDataSent &&
                <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>

                    <h3 className='text-white font-semibold text-3xl sm:text-4xl text-center'>Password got reset</h3>
                    <h3 className='text-white font-semibold text-3xl sm:text-4xl'>Login Again</h3>
                    <Link
                        href="/login"
                        className='text-blue-300 font-semibold  p-2 rounded-md underline'
                    >Visit login page</Link>

                </div>
            }

            {
                isError &&
                <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>
                    <h3 className='text-white font-semibold text-3xl sm:text-4xl'>{isError}</h3>
                </div>
            }


        </>
    )
}