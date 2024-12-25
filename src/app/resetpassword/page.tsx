'use client'

import ResetPasswordClient from '@/components/resetpasswordClient';
import React, { Suspense} from 'react'


export default function VerifyEmail() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordClient />
        </Suspense>
    );
}