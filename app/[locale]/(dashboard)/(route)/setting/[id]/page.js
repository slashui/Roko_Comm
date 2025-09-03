
import { FormEvent } from 'react';
import EditUser from '@/components/EditUser';
import { NextIntlClientProvider } from 'next-intl';
import { useTranslations } from "next-intl";


export default function UserPage({ params: { id } }) {
    const t = useTranslations('Setting');
    const settingsTexts = {
        settingsTitle: t('Settings'),
        usernameLabel: t('Username'),
        saveButton: t('Save'),
        emailLabel: t('Email'),
        homePageLabel: t('HomePage'),
        homePageDescription: t('HomePageD'),
        aboutYouLabel: t('AboutYou'),
        aboutYouDescription: t('AboutYouD'),
        githubNameLabel: t('GithubName'),
        twitterNameLabel: t('TwitterName'),
    };

    return (
        <div className="w-full h-full  flex  justify-center items-start  bg-[#F5F6FB] dark:bg-black">
            <div className="max-w-[1200px] w-full flex flex-col justify-center">
                <div>
                    <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">{t('Settings')}</h2>
                    <div className="flex items-center text-xs text-gray-500 gap-x-[11px] mb-[37px]">
                        <div className="flex items-center gap-x-1"><img src="/icon/icon-home-2.svg" alt="home icon" /><a class="capitalize" href="index.html">home</a></div><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><span class="capitalize dark:text-primary text-brand">{t('Settings')}</span>
                    </div>
                </div>
                <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl px-6 pt-[15px] pb-[29px]">
                    <EditUser userData={id} texts={settingsTexts} />
                </div>
            </div>
        </div>


    )

}