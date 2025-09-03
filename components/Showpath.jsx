"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * A utility function to get the current path for i18n routing.
 * Shows whether the path contains /cn or /en for language-specific routing.
 */



const showpath = () => {
    const router = useRouter();
    let currentURL = '';
    currentURL = window ? `${window.location.origin}${router.asPath}` : router.asPath;
    return currentURL;
    
}

export default showpath