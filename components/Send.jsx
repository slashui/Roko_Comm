"use client"
import React from 'react'
import { useState } from 'react'

const send = () => {

    const [data, setData] = useState({
        name: "",
        email: "slashui@Live.cn",
        phone: "",
        subject: "OneDay Build Password Reset",
        message: "Hello",
        OTP:"123"
    });
    
    const sendEmail = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            alert("Message Sent.");
            setData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
              });
        }
    }
  return (
    <div>
        <button onClick={sendEmail}>send</button>
    </div>
  )
}

export default send