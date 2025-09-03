import React from 'react'

export default function UIChat() {
    return (
        <div>
            <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">Dashboard</h2>
            <div className="flex items-center text-xs text-gray-500 gap-x-[11px] mb-[37px]">
                <div className="flex items-center gap-x-1"><img src="/icon/icon-home-2.svg" alt="home icon" /><a class="capitalize" href="index.html">home</a></div><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><a class="capitalize" href="index.html">agentui</a><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><span class="capitalize dark:text-primary text-brand">Dashboard</span>
            </div>
            <section>
                <div class="flex flex-col gap-[22px] xl:flex-row">
                    <div class="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl px-6 pb-5 pt-[15px]">
                        <div className="flex justify-between items-center border-b border-neutral pb-1 dark:border-dark-neutral-border mb-[11px]">
                            <span className="text-sm text-gray-800 dark:text-gray-200">36 Messages</span>
                            <select className="text-gray-500 pl-1 font-normal h-fit min-h-fit dark:text-gray-400 focus:outline-none appearance-none pr-6 bg-transparent">
                                <option>Newest</option>
                                <option>Newest01</option>
                                <option>Newest02</option>
                                <option>Newest03</option>
                            </select>
                        </div>
                        <div className="flex justify-between items-center gap-5 flex-row-reverse mb-[7px] lg:flex-row">
                            <form className="flex flex-1 items-center border border-neutral w-full order-last gap-[10px] py-[13px] rounded-[10px] dark:border-dark-neutral-border lg:w-[279px] pl-[18px] lg:order-first">
                                <button type="submit">
                                    <img src="/icon/icon-search-normal.svg" width={24} height={24} alt="search icon" />
                                </button>
                                <input className="w-full outline-none border-none text-xs font-normal bg-transparent text-gray-400 dark:text-gray-400" type="search" placeholder="people, groups, messages..." />
                            </form>

                        </div>
                        <div class="flex flex-col gap-y-2">
                            {/* First message card */}
                            <div className="bg-gray-100 rounded-lg border border-neutral relative pr-2 dark:bg-gray-dark-100 dark:border-dark-neutral-border py-[14px] mb-4">
                                <div className="flex gap-x-[11px]">
                                    <div className="flex flex-col cursor-pointer items-center gap-y-[10px] w-[32px]">
                                        <div className="relative">
                                            <div className="overflow-hidden rounded-full w-[32px] h-[32px] border-white dark:border-dark-neutral-bg border-2">
                                                <img src="/pic/avatar3.png" width={32} height={32} alt="Theresa Rose's avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:bg-primary w-[10px] h-[10px] bg-green"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <div className="flex items-center gap-x-[13px]">
                                            <span className="text-xs text-gray-500 dark:text-gray-dark-500">Theresa Rose</span>
                                            <time className="text-xs text-gray-400 dark:text-gray-dark-400">08:33AM</time>
                                        </div>
                                        <h4 className="text-gray-1100 font-semibold leading-4 dark:text-gray-dark-1100 text-[14px] mb-[6px]">I hope I can finish Frox soon</h4>
                                        <p className="text-xs text-gray-400 dark:text-gray-dark-400 max-w-[261px]">Hi, what's new with Frox? Please upload the latest code, and I will check today</p>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end absolute right-0 top-0">
                                    <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabIndex={0}>
                                        <img src="/icon/icon-more.svg" width={14} height={14} alt="more icon" className="mx-auto cursor-pointer" />
                                    </label>
                                    <ul className="dropdown-content" tabIndex={0}>
                                        <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Send message</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Contact</span></a></li>
                                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Delete</span></a></li>
                                        </div>
                                    </ul>
                                </div>
                            </div>

                            {/* Second message card */}
                            <div className="bg-gray-100 rounded-lg border border-neutral relative pr-2 dark:bg-gray-dark-100 dark:border-dark-neutral-border py-[14px]">
                                <div className="flex gap-x-[11px]">
                                    <div className="flex flex-col cursor-pointer items-center gap-y-[10px] w-[32px]">
                                        <div className="relative">
                                            <div className="overflow-hidden rounded-full w-[32px] h-[32px] border-white dark:border-dark-neutral-bg border-2">
                                                <img src="/pic/avatar4.png" width={32} height={32} alt="Alex Johnson's avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:bg-primary w-[10px] h-[10px] bg-green"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <div className="flex items-center gap-x-[13px]">
                                            <span className="text-xs text-gray-500 dark:text-gray-dark-500">Alex Johnson</span>
                                            <time className="text-xs text-gray-400 dark:text-gray-dark-400">09:15AM</time>
                                        </div>
                                        <h4 className="text-gray-1100 font-semibold leading-4 dark:text-gray-dark-1100 text-[14px] mb-[6px]">Project update: UI redesign</h4>
                                        <p className="text-xs text-gray-400 dark:text-gray-dark-400 max-w-[261px]">Hey team, I've just pushed the latest UI changes. Can you review and provide feedback?</p>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end absolute right-0 top-0">
                                    <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabIndex={0}>
                                        <img src="/icon/icon-more.svg" width={14} height={14} alt="more icon" className="mx-auto cursor-pointer" />
                                    </label>
                                    <ul className="dropdown-content" tabIndex={0}>
                                        <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Send message</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Contact</span></a></li>
                                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Delete</span></a></li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            {/* Third message card (new) */}
                            <div className="bg-gray-100 rounded-lg border border-neutral relative pr-2 dark:bg-gray-dark-100 dark:border-dark-neutral-border py-[14px] mb-4">
                                <div className="flex gap-x-[11px]">
                                    <div className="flex flex-col cursor-pointer items-center gap-y-[10px] w-[32px]">
                                        <div className="relative">
                                            <div className="overflow-hidden rounded-full w-[32px] h-[32px] border-white dark:border-dark-neutral-bg border-2">
                                                <img src="/pic/avatar5.png" width={32} height={32} alt="Sarah Lee's avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:bg-primary w-[10px] h-[10px] bg-green"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <div className="flex items-center gap-x-[13px]">
                                            <span className="text-xs text-gray-500 dark:text-gray-dark-500">Sarah Lee</span>
                                            <time className="text-xs text-gray-400 dark:text-gray-dark-400">10:42AM</time>
                                        </div>
                                        <h4 className="text-gray-1100 font-semibold leading-4 dark:text-gray-dark-1100 text-[14px] mb-[6px]">Need help with API integration</h4>
                                        <p className="text-xs text-gray-400 dark:text-gray-dark-400 max-w-[261px]">Hi everyone, I'm stuck with the new API integration. Can someone help me troubleshoot?</p>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end absolute right-0 top-0">
                                    <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabIndex={0}>
                                        <img src="/icon/icon-more.svg" width={14} height={14} alt="more icon" className="mx-auto cursor-pointer" />
                                    </label>
                                    <ul className="dropdown-content" tabIndex={0}>
                                        <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Send message</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Contact</span></a></li>
                                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Delete</span></a></li>
                                        </div>
                                    </ul>
                                </div>
                            </div>

                            {/* Fourth message card (new) */}
                            <div className="bg-gray-100 rounded-lg border border-neutral relative pr-2 dark:bg-gray-dark-100 dark:border-dark-neutral-border py-[14px]">
                                <div className="flex gap-x-[11px]">
                                    <div className="flex flex-col cursor-pointer items-center gap-y-[10px] w-[32px]">
                                        <div className="relative">
                                            <div className="overflow-hidden rounded-full w-[32px] h-[32px] border-white dark:border-dark-neutral-bg border-2">
                                                <img src="/pic/avatar6.png" width={32} height={32} alt="Mike Chen's avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:bg-primary w-[10px] h-[10px] bg-green"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <div className="flex items-center gap-x-[13px]">
                                            <span className="text-xs text-gray-500 dark:text-gray-dark-500">Mike Chen</span>
                                            <time className="text-xs text-gray-400 dark:text-gray-dark-400">11:15AM</time>
                                        </div>
                                        <h4 className="text-gray-1100 font-semibold leading-4 dark:text-gray-dark-1100 text-[14px] mb-[6px]">Weekly report ready for review</h4>
                                        <p className="text-xs text-gray-400 dark:text-gray-dark-400 max-w-[261px]">The weekly progress report is ready. Please review and let me know if any changes are needed.</p>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end absolute right-0 top-0">
                                    <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabIndex={0}>
                                        <img src="/icon/icon-more.svg" width={14} height={14} alt="more icon" className="mx-auto cursor-pointer" />
                                    </label>
                                    <ul className="dropdown-content" tabIndex={0}>
                                        <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Send message</span></a></li>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Contact</span></a></li>
                                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Delete</span></a></li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-full border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl flex-1 px-6 pt-[17px]">
                        <div class="relative">
                            <div className="flex justify-between border-b border-neutral pb-4 dark:border-dark-neutral-border mb-[18px]">
                                <div className="flex gap-x-[38px]">
                                    <div className="overflow-hidden w-12 h-12 rounded-full">
                                        <img className="w-full h-full object-cover" src="/pic/avatar1.png" alt="avatar" />
                                    </div>
                                    <div className="flex flex-col gap-y-[6px]">
                                        <h3 className="leading-4 font-medium text-gray-1100 text-[16px] dark:text-gray-dark-1100">Theresa Rose</h3>
                                        <div className="flex items-center gap-x-[5px]">
                                            <span className="text-gray-400 text-xs font-semibold dark:text-gray-dark-400">Active now</span>
                                            <div className="dark:bg-primary rounded-full w-[10px] h-[10px]"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-5">
                                    <button className="w-6 h-6 overflow-hidden">
                                        <img className="w-full h-full object-cover" src="/icon/icon-search-normal.svg" alt="search icon" />
                                    </button>
                                    <button className="w-6 h-6 overflow-hidden">
                                        <img className="w-full h-full object-cover filter-gray" src="/icon/icon-gallery.svg" alt="gallery icon" />
                                    </button>
                                    <button className="w-6 h-6 overflow-hidden">
                                        <img className="w-full h-full object-cover filter-blue" src="/icon/icon-video.svg" alt="video icon" />
                                    </button>
                                    <button className="w-6 h-6 overflow-hidden">
                                        <img className="w-full h-full object-cover filter-gray" src="/icon/icon-microphone-2.svg" alt="microphone icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <time class="text-center text-gray-400 text-xs block mb-6 dark:text-gray-dark-400">August 15, 2022</time>
                        <div class="flex flex-col overflow-y-scroll scrollbar-hide gap-y-[27px] max-h-[750px] mb-[180px]">
                            {/* first message */}
                            <div className="flex gap-x-[5px] max-w-[608px]">
                                <div className="flex flex-col cursor-pointer items-center gap-y-[10px] w-[32px]">
                                    <div className="relative">
                                        <div className="overflow-hidden rounded-full w-[32px] h-[32px] border-white dark:border-dark-neutral-bg border-0">
                                            <img className="w-full h-full object-cover" src="/pic/avatar1.png" alt="avatar" />
                                        </div>
                                        <div className="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[10px] h-[10px] dark:bg-primary"></div>
                                    </div>
                                    <span className="leading-4 text-[14px] hidden text-gray-500 dark:text-gray-dark-500">false</span>
                                </div>
                                <div className="flex flex-col mt-2 gap-y-[6px]">
                                    <div className="flex items-center gap-x-[13px]">
                                        <span className="text-xs text-gray-600 dark:text-gray-dark-600">Theresa Rose</span>
                                        <time className="text-xs text-gray-400 dark:text-gray-dark-400">08:33AM</time>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <div className="rounded-2xl rounded-tl-none bg-neutral dark:bg-dark-neutral-border p-[18px]">                        <p className="text-xs text-white max-w-[395px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum consequat suscipit. Praesent condimentum nibh sed sem ornare, ac malesuada diam congue.</p>
                                        </div>
                                        <div className="dropdown dropdown-end -translate-x-4">
                                            <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabIndex={0}>
                                                <img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                                            </label>
                                            <ul className="dropdown-content" tabIndex={0}>
                                                <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                                                    <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                                                    <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a></li>
                                                    <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Send message</span></a></li>
                                                    <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Contact</span></a></li>
                                                    <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                                                    <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Delete</span></a></li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* second message */}
                        <div className="flex ml-auto gap-x-[5px] max-w-[608px]">
                            <div className="flex flex-col mt-2 gap-y-[6px]">
                                <div className="flex items-center self-end gap-x-[13px]">
                                    <span className="text-xs text-gray-600 dark:text-gray-dark-600">Theresa Rose</span>
                                    <time className="text-xs text-gray-400 dark:text-gray-dark-400">08:33AM</time>
                                </div>
                                <div className="flex items-center gap-x-3 flex-row-reverse">
                                    <div className="rounded-2xl rounded-tr-none bg-primary dark:bg-black  p-[18px]">
                                        <p className="text-xs text-gray-1100 max-w-[395px] dark:text-gray-dark-1100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum consequat suscipit.</p>
                                    </div>
                                    <div className="dropdown dropdown-end translate-x-4">
                                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabIndex={0}>
                                            <img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                                        </label>
                                        <ul className="dropdown-content" tabIndex={0}>
                                            <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                                                <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                                                <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a></li>
                                                <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Send message</span></a></li>
                                                <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Contact</span></a></li>
                                                <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                                                <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Delete</span></a></li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div className="gap-2 mt-3 self-end grid-cols-[52px_52px_52px_52px] grid-rows-[52px_52px] md:grid-cols-[84px_84px_84px_84px] md:grid-rows-[84px_84px] grid">
                                    <div className="col-span-2 rounded-sm overflow-hidden cursor-pointer"><img className="w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1170&amp;q=80" alt="message photo" /></div>
                                    <div className="rounded-sm overflow-hidden cursor-pointer"><img className="w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2072&amp;q=80" alt="message photo" /></div>
                                    <div className="rounded-sm overflow-hidden cursor-pointer"><img className="w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1474533883693-59a44dbb964e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" alt="message photo" /></div>
                                    <div className="rounded-sm overflow-hidden cursor-pointer"><img className="w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1333&amp;q=80" alt="message photo" /></div>
                                    <div className="col-span-2 rounded-sm overflow-hidden cursor-pointer"><img className="w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1501696461415-6bd6660c6742?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=774&amp;q=80" alt="message photo" /></div>
                                    <div className="rounded-sm overflow-hidden cursor-pointer"><img className="w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1506252374453-ef5237291d83?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=774&amp;q=80" alt="message photo" /></div>
                                </div>
                            </div>
                            <div className="flex flex-col cursor-pointer items-center gap-y-[10px] w-[32px]">
                                <div className="relative">
                                    <div className="overflow-hidden rounded-full w-[32px] h-[32px] border-white dark:border-dark-neutral-bg border-0">
                                        <img className="w-full h-full object-cover" src="/pic/avatar2.png" alt="avatar" />
                                    </div>
                                    <div className="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[10px] h-[10px] dark:bg-primary"></div>
                                </div>
                                <span className="leading-4 text-[14px] hidden text-gray-500 dark:text-gray-dark-500">false</span>
                            </div>
                        </div>
                        <div className="relative py-10">
                            <form class="flex items-center border border-neutral w-full order-last  justify-between gap-[10px] py-[14px] rounded-[10px] dark:border-dark-neutral-border px-[22px] lg:order-first bottom-[-125px]" action="#">
                                <input class="w-full outline-none border-none text-xs font-normal bg-transparent text-gray-400 flex-1 dark:text-gray-dark-400" type="text" placeholder="Type to add your message" />
                                <div class="flex items-center gap-x-6">
                                    <button class="overflow-hidden w-[18px] h-[18px]"> <img class="w-full h-full object-cover" src="/icon/icon-smile.svg" alt="smile icon" /></button>
                                    <button class="overflow-hidden w-[13px] h-[13px]"> <img class="w-full h-full object-cover filter-gray" src="/icon/icon-add.svg" alt="add icon" /></button>
                                    <button class="dark:bg-black text-black rounded-full flex items-center justify-center w-11 h-11" type="submit"><img src="/icon/icon-send-1.svg" className="text-black" alt="send icon" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
