"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function Profile() {

    const router = useRouter()

    const [userData, setUserData] = useState({
        email: "",
        username: ""
    })

    useEffect(() => {

        let res;

        const fetchUserData = async () => {

            try {
                res = await axios.get("/api/users/me")
                console.log(res.data.data);

                setUserData({
                    email: res.data.data.email,
                    username: res.data.data.username
                })

            } catch (error) {
                console.log(error);
            }

        }

        fetchUserData()


    }, [])

    const logoutButtonClick = async () => {
        const res = await axios.get("/api/users/logout")
        console.log(res);
        // setIsDataSent(false)
        router.push("/login")
        
    }


    return (
        <div className='flex justify-center items-center flex-col  h-screen gap-y-10 bg-black text-black px-5 sm:px-0 font-semibold'>
            <ul className="menu bg-slate-300 rounded-box  ">
                <li className="space-y-3">
                    <h2 className="menu-title text-black text-lg">My Profile</h2>
                    <ul className="space-y-3 ">
                        <li className="">
                            Email: {userData.email}
                        </li>

                        <li>
                            Username:  {userData.username}
                        </li>

                        <li>
                            <Button
                                type="button"
                                onClick={logoutButtonClick}
                                className='bg-black text-white font-semibold hover:bg-slate-900'
                            >Logout</Button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
