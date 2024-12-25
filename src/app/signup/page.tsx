"use client"

import React, { FormEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'


const SignUp = () => {


    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: ""
    })

    const [isDataSent, setIsDataSent] = useState(false)

    const signUpButtonClick = async () => {

        await axios.post("/api/users/signup", userData)

        userData.email = ""
        userData.username = ""
        userData.password = ""


        setIsDataSent(true)
    }

    return (
        <>
            {!isDataSent && <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>


                <Link
                    href="/login"
                    className='text-blue-300 font-semibold  p-2 rounded-md underline'
                >Already have an account: Login</Link>


                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        signUpButtonClick()
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
                        <Label htmlFor="usernamepassword">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            placeholder="Username"
                            required={true}
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
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
                    >Sign up</Button>
                </form>


            </div>}

            {isDataSent &&
                <div className='flex justify-center items-center flex-col h-screen gap-y-10 bg-black text-white px-5 sm:px-0'>

                    <Link
                        href="/login"
                        className='text-blue-300 font-semibold  p-2 rounded-md underline'
                    >Visit login page</Link>

                    <h3 className='text-white font-semibold text-3xl sm:text-4xl'>Email sended</h3>
                    <h3 className='text-white font-semibold text-3xl sm:text-4xl text-center'>Verify your email</h3>
                </div>
            }
        </>
    )
}

export default SignUp