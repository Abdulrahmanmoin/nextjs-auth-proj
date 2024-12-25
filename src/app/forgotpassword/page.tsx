"use client"

import React, { FormEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const ForgotPassword = () => {

    const [userData, setUserData] = useState({
        email: "",
    })

    const [isDataSent, setIsDataSent] = useState(false)
    const [isError, setIsError] = useState<string | undefined>()

    const forgotPasswordEmail = async () => {

        try {
            const res = await axios.post("/api/users/forgotpassword-email", userData)
            console.log(res);

            userData.email = ""

            setIsDataSent(true)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setIsError(error.response.data.message);
            } else {
                console.error("Unexpected error:", error);
                setIsError("Something went wrong!");
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
                            forgotPasswordEmail()
                        }}
                        className='space-y-10'
                    >

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                required={true}
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className='bg-white text-black font-semibold hover:bg-slate-200'
                        >Send Email</Button>

                    </form>

                </div >}

            {
                isDataSent &&
                <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>

                    <h3 className='text-white font-semibold text-3xl sm:text-4xl'>Email sended</h3>
                    <h3 className='text-white font-semibold text-3xl sm:text-4xl text-center'>Reset your password</h3>

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

export default ForgotPassword