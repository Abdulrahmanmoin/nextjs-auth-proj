'use client'

import VerifyEmailClient from '@/components/verifyemailClient';
import React, { Suspense} from 'react'


export default function VerifyEmail() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailClient />
        </Suspense>
    );
}