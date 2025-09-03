import React from 'react'

export default function UIForm() {
    return (
        <div>
            <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">Form</h2>
            <div className="flex items-center text-xs text-gray-500 gap-x-[11px] mb-[37px]">
                <div className="flex items-center gap-x-1"><img src="/icon/icon-home-2.svg" alt="home icon" /><a class="capitalize" href="index.html">home</a></div><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><a class="capitalize" href="index.html">agentui</a><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><span class="capitalize dark:text-primary text-brand">Form</span>
            </div>
            <section>
                <div class="flex justify-between gap-6 flex-col xl:flex-row">
                    <div class="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl px-5 py-7 flex-1 md:py-[42px] md:px-12">
                        <h1 class="font-bold text-gray-1100 text-[24px] leading-[30px] dark:text-gray-dark-1100 tracking-[0.1px] mb-[39px]">Add New Category</h1>
                        <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">Category name</p>
                        <div class="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12">
                            <input class="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" type="text" placeholder="Add name" />
                        </div>
                        <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">Parent</p>
                        <div class="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12">
                            <input class="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" type="text" placeholder="Add name" />
                        </div>
                        <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">Description</p>
                        <div class="rounded-lg mb-8 border border-neutral dark:border-dark-neutral-border p-[13px] md:mb-12">
                            <div class="flex items-center gap-y-4 flex-col gap-x-[27px] mb-[31px] xl:flex-row xl:gap-y-0">
                                <div class="flex items-center gap-x-[20px]"><img class="cursor-pointer" src="/icon/icon-bold.svg" alt="bold icon" /><img class="cursor-pointer" src="/icon/icon-italicized.svg" alt="italicized icon" /><img class="cursor-pointer" src="/icon/icon-underlined.svg" alt="underlined icon" /><img class="cursor-pointer" src="/icon/icon-strikethrough.svg" alt="strikethrough icon" /><img class="cursor-pointer" src="/icon/icon-textcolor.svg" alt="textcolor icon" /><img class="cursor-pointer" src="/icon/icon-backgroundcolor.svg" alt="backgroundcolor icon" /><img class="cursor-pointer" src="/icon/icon-smile.svg" alt="smile icon" /></div>
                                <div class="flex items-center gap-x-[20px]">
                                    <div class="flex items-center cursor-pointer gap-x-[1.5px]"><img src="/icon/icon-paragraphformat.svg" alt="paragraphformat icon" /><img src="/icon/icon-arrow-down-triangle.svg" alt="arrow down triangle icon" /></div>
                                    <div class="flex items-center cursor-pointer gap-x-[1.5px]"><img src="/icon/icon-align-left.svg" alt="align left icon" /><img src="/icon/icon-arrow-down-triangle.svg" alt="arrow down triangle icon" /></div>
                                    <div class="flex items-center cursor-pointer gap-x-[1.5px]"><img src="/icon/icon-ordered-list.svg" alt="ordered list icon" /><img src="/icon/icon-arrow-down-triangle.svg" alt="arrow down triangle icon" /></div>
                                    <div class="flex items-center cursor-pointer gap-x-[1.5px]"><img src="/icon/icon-unordered-list.svg" alt="unordered list icon" /><img src="/icon/icon-arrow-down-triangle.svg" alt="arrow down triangle icon" /></div><img class="cursor-pointer" src="/icon/icon-indent.svg" alt="indent icon" /><img class="cursor-pointer opacity-40" src="/icon/icon-indent.svg" alt="outdent icon" />
                                </div>
                                <div class="flex items-center gap-x-[20px]"><img class="cursor-pointer" src="/icon/icon-insert-image.svg" alt="insert image icon" /><img class="cursor-pointer" src="/icon/icon-insert-link.svg" alt="insert link icon" /><img class="cursor-pointer" src="/icon/icon-insert-file.svg" alt="insert-file icon" /><img class="cursor-pointer" src="/icon/icon-insert-video.svg" alt="insert video icon" /><img class="cursor-pointer opacity-40" src="/icon/icon-undo.svg" alt="undo icon" /><img class="cursor-pointer opacity-40" src="/icon/icon-redo.svg" alt="redo icon" /></div>
                            </div>
                            <textarea class="textarea w-full p-0 text-gray-400 resize-none rounded-none bg-transparent leading-4 min-h-[300px] focus:outline-none dark:text-gray-dark-400 text-[14px]" placeholder="Content here"></textarea>
                        </div>
                        <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">Thumbnail / Gallery</p>
                        <div class="border-dashed border-2 text-center border-neutral cursor-pointer mb-8 py-[26px] dark:border-dark-neutral-border md:mb-12"><img class="mx-auto inline-block mb-[15px]" src="/icon/icon-image.svg" alt="image icon" />
                            <p class="text-sm leading-6 text-gray-500 font-normal mb-[5px]">Drop your image here, or browse</p>
                            <p class="leading-6 text-gray-400 text-[13px]">JPG,PNG and GIF files are allowed</p>
                        </div>
                        <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">Tag</p>
                        <div class="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px]">
                            <input class="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" type="text" placeholder="Add tags" />
                        </div>
                        <div class="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-lg p-[15px] mt-[10px]">
                            <div class="flex flex-wrap gap-[10px]">
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">smartwatch</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">Apple</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">Watch</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">smartphone</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">iPhone14 max</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">iPhone14 max</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">iPhone14 max</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">smartwatch</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">Apple</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                                <div class="flex items-center py-1 px-2 gap-x-[5px] mb-[10px] bg-[#E8EDF2] dark:bg-[#313442] rounded-[5px]"><span class="text-xs text-gray-400">Watch</span><img class="cursor-pointer" src="/icon/icon-close.svg" alt="close icon" /></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-[27px] xl:w-[24.4%]">
                        <div class="border border-neutral rounded-lg bg-neutral-bg dark:border-dark-neutral-border pb-[31px] dark:bg-dark-neutral-bg">
                            <div class="bg-neutral rounded-t-lg py-[15px] pl-[18px] mb-[27px] dark:bg-dark-neutral-border">
                                <p class="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-[14px]">Ticket Details</p>
                            </div>
                            <div class="flex flex-col pl-[18px] gap-y-[15px] mb-[25px]">
                                <div class="flex items-center gap-x-[6px]"><img src="/icon/icon-tree.svg" alt="tree icon" /><span class="text-gray-500 text-xs dark:text-gray-dark-500">Status:</span><span class="text-gray-1100 text-xs dark:text-gray-dark-1100">Open</span></div>
                                <div class="flex items-center gap-x-[6px]"><img src="/icon/icon-eye.svg" alt="eye icon" /><span class="text-gray-500 text-xs dark:text-gray-dark-500">Visibility:</span><span class="text-gray-1100 text-xs dark:text-gray-dark-1100">Publish</span></div>
                                <div class="flex items-center gap-x-[6px]"><img src="/icon/icon-calendar-1.svg" alt="calendar icon" /><span class="text-gray-500 text-xs dark:text-gray-dark-500">Last update:</span><span class="text-gray-1100 text-xs dark:text-gray-dark-1100">2 mins ago</span></div>
                            </div>
                            <div class="px-[18px] mb-[25px]">
                                <div class="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border"></div>
                            </div>
                            <div class="flex justify-between px-[18px]">
                                <button class="btn normal-case h-fit min-h-fit transition-all duration-300 border-4 border-neutral-bg bg-gray-200 font-medium text-gray-500 dark:border-dark-neutral-bg py-[7px] px-[14px] dark:bg-gray-dark-200 text-[12px] leading-[18px] dark:text-gray-dark-500 hover:bg-gray-200 dark:hover:bg-gray-dark-200 hover:border-gray-300 dark:hover:border-gray-dark-300">Save Status</button>
                                <button class="btn normal-case h-fit min-h-fit transition-all duration-300 border-4 bg-brand dark:hover:bg-primary hover:border-[#B2A7FF] dark:hover:border-[#ffffa7] border-neutral-bg dark:bg-primary dark:text-black font-medium dark:border-dark-neutral-bg py-[7px] px-[14px] text-[12px] leading-[18px]">Delete ticket</button>
                            </div>
                        </div>
                        <div class="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pt-[21px] px-[23px] pb-[34px]"><span class="text-gray-500 leading-4 font-semibold border-b border-neutral block dark:text-gray-dark-500 text-[14px] pb-[14px] dark:border-dark-neutral-border mb-[18px]">Support Team</span>
                            <div class="grid grid-cols-4 justify-items-center gap-y-[18px] gap-x-[14px]">
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar1.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] bg-green"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Saleh</span>
                                </div>
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar2.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] hidden bg-green"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Edilson</span>
                                </div>
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar3.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] bg-green"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Afrim</span>
                                </div>
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar4.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] hidden bg-green"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Eduar</span>
                                </div>
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar5.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] bg-orange"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Saleh</span>
                                </div>
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar6.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] hidden bg-green"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Edilson</span>
                                </div>
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar1.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] hidden bg-green"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Afrim</span>
                                </div>
                                <div class="flex flex-col cursor-pointer items-center gap-y-[10px] w-[50px]">
                                    <div class="relative">
                                        <div class="overflow-hidden rounded-full w-[50px] h-[50px] border-[#7364DB] border-2"><img class="w-full h-full object-cover" src="/pic/avatar2.png" alt="avatar" /></div>
                                        <div class="absolute rounded-full border border-neutral-bg bottom-0 right-0 dark:border-dark-neutral-bg w-[16px] h-[16px] bg-green"></div>
                                    </div><span class="leading-4 text-[14px] text-gray-500 dark:text-gray-dark-500">Eduar</span>
                                </div>
                            </div>
                        </div>
                        <div class="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pb-5 px-7 pt-[35px]">
                            <button class="btn flex items-center normal-case bg-primary dark:bg-primary h-auto border-neutral-bg rounded-lg gap-x-3 border-4 w-full leading-4 font-semibold hover:border-[#B2A7FF] hover:bg-primary dark:border-dark-neutral-bg dark:hover:border-[#d9ffa3] py-[10px] px-[15px] mb-[30px] text-[14px]"><span class="text-black font-semibold leading-4 text-[14px]">New Category</span></button>
                            <div class="flex flex-col pb-5 border-b border-neutral mb-5 dark:border-dark-neutral-border">
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Plugins</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">2568</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Account</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">986</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Permission</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">2235</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Update theme</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">256</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Download</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">124</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Install</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">15</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">API</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">365</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Development</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">546</span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover filter-green" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Unassigned</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">25</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover filter-state" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Open</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">58</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover filter-orange" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Closed</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">1356</span>
                                </div>
                                <div class="flex items-center justify-between bg-transparent rounded cursor-pointer gap-2 p-[10px] hover:bg-neutral dark:hover:bg-dark-neutral-border">
                                    <div class="flex items-center gap-x-[14px]">
                                        <div class="w-5 h-5 overflow-hidden"><img class="w-full h-full object-cover filter-pink" src="/icon/icon-folder-open.svg" alt="folder open icon" /></div>
                                        <h3 class="text-gray-500 leading-4 font-semibold dark:text-gray-dark-500 text-[14px]">Archived</h3>
                                    </div><span class="text-xs text-gray-500 dark:text-gray-dark-500">2563</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    )
}
