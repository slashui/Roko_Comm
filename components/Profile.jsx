"use client"
import React from 'react'
import { useState } from 'react'

export const Profile = ({userData}) => {
    const [cdata, setCdata] = useState(
        {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            image: userData.image,
            Homepage: userData.homepage,
            Aboutyou: userData.aboutyou,
            GithubName: userData.githubname,
            TwitterName: userData.twittername
        }
    )
    
  return (
    <div>
       {cdata}
    </div>
  )
}
