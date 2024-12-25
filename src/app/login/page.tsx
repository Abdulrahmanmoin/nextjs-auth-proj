"use client"

import React, { FormEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'

const Login = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const [isDataSent, setIsDataSent] = useState(false)
    const [isError, setIsError] = useState<string | undefined>()

    const loginButtonClick = async () => {

        try {
            const res = await axios.post("/api/users/login", userData)
            console.log(res);

            userData.email = ""
            userData.password = ""

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


    const logoutButtonClick = async () => {
        const res = await axios.get("/api/users/logout")
        console.log(res);
        setIsDataSent(false)
    }

    return (
        <>
            {(!isDataSent && !isError) &&

                <div className='flex justify-center items-center flex-col h-screen gap-y-3 bg-black text-white px-5 sm:px-0'>

                    <Link
                        href="/signup"
                        className='text-blue-300 font-semibold  p-2 rounded-md underline'
                    >Don&apos;t have an account: Signup</Link>


                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            loginButtonClick()
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

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                                required={true}
                                minLength={6}
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className='bg-white text-black font-semibold hover:bg-slate-200'
                        >Login</Button>

                    </form>

                   
                        <Link
                            href="/forgotpassword-email"
                            className='text-blue-300 font-semibold  p-2 rounded-md underline'
                        >Forgot Password</Link>
                    

                </div >}

            {
                isDataSent &&
                <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>

                    <h3 className='text-white font-semibold text-3xl sm:text-4xl'>You are logged In</h3>


                    <Button
                        type="button"
                        onClick={logoutButtonClick}
                        className='bg-white text-black font-semibold hover:bg-slate-200'
                    >Logout</Button>

                    <Link href="/profile">
                        <Button
                            type="button"
                            className='bg-white text-black font-semibold hover:bg-slate-200'
                        >Visit your profile</Button>
                    </Link>

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

export default Login