import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate()
    return (
        <div dir='rtl' className='p-10 homee flex flex-col text-white text-center justify-center items-center khatArabie'>
            <h1 className='text-4xl reem text-white'>مرحبًا بك في موقعنا</h1>
            <p>
            اكتشف كتاب الله الحكيم. تلاوة القرآن الكريم بصوت القراء المشهورين، 
            <span>تعلم كيفية تلاوة القرآن الكريم بطريقة صحيحة واستمتع بمعانيه العظيمة</span>
            </p>
            <p>
                <Button 
                    className={'audio-lines-icon'}
                    onClick={()=>navigate('/koran')}
                >
                    إستماع   
                </Button>
            </p>
        </div>
    )
}
