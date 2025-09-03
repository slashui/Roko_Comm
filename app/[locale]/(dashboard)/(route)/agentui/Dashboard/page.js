import React from 'react'

export default function UIDashboard() {
  return (
    <div>
      <div>
        <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">Dashboard</h2>
        <div className="flex items-center text-xs text-gray-500 gap-x-[11px] mb-[37px]">
          <div className="flex items-center gap-x-1"><img src="/icon/icon-home-2.svg" alt="home icon" /><a class="capitalize" href="index.html">home</a></div><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><a class="capitalize" href="index.html">agentui</a><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><span class="capitalize dark:text-primary text-brand">Dashboard</span>
        </div>
      </div>

      <section>
        <div className="flex justify-between gap-6 mb-6 flex-col xl:flex-row">
          <div className="border bg-neutral-bg border-neutral dark:bg-black dark:border-primary rounded-2xl px-6 flex-1 pt-[15px] pb-[30px]">

            <div className='p-6'>
              <h1 className='text-4xl dark:text-white text-black font-inter text-bold '>🎉 Hi,Builder</h1>
              <p className='mt-6 dark:text-white text-black text-sm font-Courier'>Artificial intelligence has advanced to a point where it presents an unprecedented opportunity for all independent developers. I've laid the groundwork by setting up a basic platform for you. Now it's time for you to start building something on it.
              </p><p className='mt-2 dark:text-white text-black text-sm font-Courier'>Remember to let me know once you've finished setting things up.</p>
              <button className='dark:bg-primary px-8 py-2 mt-8 rounded-full bg-[#f7ce49] dark:hover:bg-primary/80 font-inter text-lg '>Let's do something</button>
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:w-[29%]">
            <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl px-6 flex-1 pt-[20px] pb-[41px]">
              <div className="flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[24px] pb-[16px]">
                <div className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100">Storage Overview</div>
                <div className="dropdown dropdown-end ml-auto translate-x-4 z-10">
                  <label className="cursor-pointer dropdown-label flex items-center justify-between py-2 px-4" tabindex="0"><img className="cursor-pointer" src="/icon/icon-toggle.svg" alt="toggle icon" />
                  </label>
                  <ul className="dropdown-content" tabindex="0">
                    <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border  dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span></a>
                      </li>
                      <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Remove widget</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="grid items-center gap-4 grid-cols-4 mb-9">
                <div
                  className="radial-progress bg-[#DAFCCC] text-green max-w-[65px]"
                  style={{
                    '--value': 70,
                    '--size': '65px',
                    '--thickness': '4px'
                  }}
                >
                  <span className="text-black text-xs">70%</span>
                </div>
                <div
                  className="radial-progress bg-[#DAD7FE] text-violet max-w-[65px]"
                  style={{
                    '--value': 46,
                    '--size': '65px',
                    '--thickness': '4px'
                  }}
                >
                  <span className="text-black text-xs">46%</span>
                </div>
                <div
                  className="radial-progress bg-[#FFE5D3] text-red max-w-[65px]"
                  style={{
                    '--value': 15,
                    '--size': '65px',
                    '--thickness': '4px'
                  }}
                >
                  <span className="text-black text-xs">15%</span>
                </div>
                <div
                  className="radial-progress bg-[#CCECFE] text-blue max-w-[65px]"
                  style={{
                    '--value': 67,
                    '--size': '65px',
                    '--thickness': '4px'
                  }}
                >
                  <span className="text-black text-xs">67%</span>
                </div>
                <div
                  className="radial-progress bg-[#CCECFE] text-fuchsia max-w-[65px]"
                  style={{
                    '--value': 23,
                    '--size': '65px',
                    '--thickness': '4px'
                  }}
                >
                  <span className="text-black text-xs">23%</span>
                </div>
                <div
                  className="radial-progress bg-[#CCECFE] text-orange max-w-[65px]"
                  style={{
                    '--value': 88,
                    '--size': '65px',
                    '--thickness': '4px'
                  }}
                >
                  <span className="text-black text-xs">88%</span>
                </div>
                <div
                  className="radial-progress bg-[#CCECFE] text-teal-400 max-w-[65px]"
                  style={{
                    '--value': 50,
                    '--size': '65px',
                    '--thickness': '4px'
                  }}
                >
                  <span className="text-black text-xs">50%</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center mb-6 gap-[15px]">
                <div className="flex items-center gap-[2.5px]">
                  <div className="w-2 h-2 rounded-full bg-orange"></div><span className="text-gray-1100 text-[7px] leading-[11px] dark:text-gray-dark-1100">Shopping</span>
                </div>
                <div className="flex items-center gap-[2.5px]">
                  <div className="w-2 h-2 rounded-full bg-red"></div><span className="text-gray-1100 text-[7px] leading-[11px] dark:text-gray-dark-1100">Document</span>
                </div>
                <div className="flex items-center gap-[2.5px]">
                  <div className="w-2 h-2 rounded-full bg-fuchsia"></div><span className="text-gray-1100 text-[7px] leading-[11px] dark:text-gray-dark-1100">Video</span>
                </div>
                <div className="flex items-center gap-[2.5px]">
                  <div className="w-2 h-2 rounded-full bg-blue"></div><span className="text-gray-1100 text-[7px] leading-[11px] dark:text-gray-dark-1100">Audio</span>
                </div>
                <div className="flex items-center gap-[2.5px]">
                  <div className="w-2 h-2 rounded-full bg-violet"></div><span className="text-gray-1100 text-[7px] leading-[11px] dark:text-gray-dark-1100">Images</span>
                </div>
                <div className="flex items-center gap-[2.5px]">
                  <div className="w-2 h-2 rounded-full bg-orange"></div><span className="text-gray-1100 text-[7px] leading-[11px] dark:text-gray-dark-1100">Exe</span>
                </div>
                <div className="flex items-center gap-[2.5px]">
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div><span className="text-gray-1100 text-[7px] leading-[11px] dark:text-gray-dark-1100">Other</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="flex justify-between gap-6 flex-col xl:flex-row">
          <div className="flex flex-col gap-y-6 flex-1">
            <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl px-6 pt-[15px] pb-[29px]">
              <div className="flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[26px] pb-[15px]">
                <div className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100">Favorite Folders</div>
                <div className="dropdown dropdown-end ml-auto translate-x-4 z-10">
                  <label className="cursor-pointer dropdown-label flex items-center justify-between py-2 px-4" tabindex="0"><img className="cursor-pointer" src="/icon/icon-toggle.svg" alt="toggle icon" />
                  </label>
                  <ul className="dropdown-content" tabindex="0">
                    <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border  dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span></a>
                      </li>
                      <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Remove widget</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[13px] md:grid-cols-3 xl:grid-cols-6">
                <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-lg py-3 px-[11px]">
                  <div className="flex items-end mb-2 gap-[7px]">
                    <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover filter-color-brands" src="/icon/icon-gallery-fill.svg" alt="image icon" /></div>
                    <div className="font-semibold leading-4 text-[14px] text-color-brands">Images</div>
                  </div>
                  <ul className="list-disc ml-4">
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">125 sub folders</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">1,895 files</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">24Gb</li>
                  </ul>
                </div>
                <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-lg py-3 px-[11px]">
                  <div className="flex items-end mb-2 gap-[7px]">
                    <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-note-green.svg" alt="note icon" /></div>
                    <div className="font-semibold leading-4 text-[14px] text-green">Note</div>
                  </div>
                  <ul className="list-disc ml-4">
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">125 sub folders</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">1,895 files</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">24Gb</li>
                  </ul>
                </div>
                <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-lg py-3 px-[11px]">
                  <div className="flex items-end mb-2 gap-[7px]">
                    <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-design.svg" alt="design icon" /></div>
                    <div className="font-semibold leading-4 text-[14px] text-blue">Design</div>
                  </div>
                  <ul className="list-disc ml-4">
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">125 sub folders</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">1,895 files</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">24Gb</li>
                  </ul>
                </div>
                <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-lg py-3 px-[11px]">
                  <div className="flex items-end mb-2 gap-[7px]">
                    <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-archive-orange.svg" alt="image icon" /></div>
                    <div className="font-semibold leading-4 text-[14px] text-orange">Archive</div>
                  </div>
                  <ul className="list-disc ml-4">
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">125 sub folders</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">1,895 files</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">24Gb</li>
                  </ul>
                </div>
                <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-lg py-3 px-[11px]">
                  <div className="flex items-end mb-2 gap-[7px]">
                    <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-music-pink.svg" alt="music icon" /></div>
                    <div className="font-semibold leading-4 text-[14px] text-pink">Music</div>
                  </div>
                  <ul className="list-disc ml-4">
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">125 sub folders</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">1,895 files</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">24Gb</li>
                  </ul>
                </div>
                <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-lg py-3 px-[11px]">
                  <div className="flex items-end mb-2 gap-[7px]">
                    <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-movie-skype.svg" alt="movie icon" /></div>
                    <div className="font-semibold leading-4 text-[14px] text-sky">Movie</div>
                  </div>
                  <ul className="list-disc ml-4">
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">125 sub folders</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">1,895 files</li>
                    <li className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[11px]">24Gb</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl px-6 overflow-x-scroll scrollbar-hide pt-[25px] pb-[42px] lg:overflow-x-hidden">
              <div className="flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[20px] pb-[16px] min-w-[852px] lg:min-w-fit">
                <div className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100">Recent Purchases</div>
                <div className="dropdown dropdown-end ml-auto translate-x-4 z-10">
                  <label className="cursor-pointer dropdown-label flex items-center justify-between py-2 px-4" tabindex="0"><img className="cursor-pointer" src="/icon/icon-toggle.svg" alt="toggle icon" />
                  </label>
                  <ul className="dropdown-content" tabindex="0">
                    <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border  dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span></a>
                      </li>
                      <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Remove widget</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <table className="w-full min-w-[852px] lg:min-w-fit">
                <thead>
                  <tr>
                    <th className="text-left pb-3">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </th>
                    <th className="text-gray-400 leading-4 font-normal text-left pb-3 dark:text-gray-dark-400 text-[14px]">File name</th>
                    <th className="text-gray-400 leading-4 font-normal text-left pb-3 dark:text-gray-dark-400 text-[14px]">Size</th>
                    <th className="text-gray-400 leading-4 font-normal text-left pb-3 dark:text-gray-dark-400 text-[14px]">Modified</th>
                    <th className="text-gray-400 leading-4 font-normal text-left pb-3 dark:text-gray-dark-400 text-[14px]">Category</th>
                    <th className="text-gray-400 leading-4 font-normal text-left pb-3 dark:text-gray-dark-400 text-[14px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="flex items-center gap-[5px]">
                        <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-design.svg" alt="design icon" /></div><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">dahsboard_design.fig</span>
                      </div>
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">2.4Mb</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Aug 5th, 2022</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Mac Image</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="dropdown dropdown-end">
                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabindex="0"><img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                        </label>
                        <ul className="dropdown-content" tabindex="0">
                          <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Approve</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Unapprove</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Mark as spam</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Move to Trash</span></a>
                            </li>
                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Block</span></a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="flex items-center gap-[5px]">
                        <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover filter-green" src="/icon/icon-gallery-fill.svg" alt="image icon" /></div><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">macbook_pro.jpg</span>
                      </div>
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">2.4Mb</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Aug 5th, 2022</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Mac Image</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="dropdown dropdown-end">
                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabindex="0"><img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                        </label>
                        <ul className="dropdown-content" tabindex="0">
                          <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Approve</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Unapprove</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Mark as spam</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Move to Trash</span></a>
                            </li>
                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Block</span></a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="flex items-center gap-[5px]">
                        <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-code-violet.svg" alt="code icon" /></div><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">index.html</span>
                      </div>
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">2.4Mb</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Aug 5th, 2022</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Mac Image</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="dropdown dropdown-end">
                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabindex="0"><img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                        </label>
                        <ul className="dropdown-content" tabindex="0">
                          <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Approve</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Unapprove</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Mark as spam</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Move to Trash</span></a>
                            </li>
                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Block</span></a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="flex items-center gap-[5px]">
                        <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-archive-orange.svg" alt="archive icon" /></div><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">code.zip</span>
                      </div>
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">2.4Mb</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Aug 5th, 2022</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Mac Image</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="dropdown dropdown-end">
                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabindex="0"><img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                        </label>
                        <ul className="dropdown-content" tabindex="0">
                          <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Approve</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Unapprove</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Mark as spam</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Move to Trash</span></a>
                            </li>
                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Block</span></a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="flex items-center gap-[5px]">
                        <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-music-pink.svg" alt="music icon" /></div><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">sound_bird.mp3</span>
                      </div>
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">2.4Mb</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Aug 5th, 2022</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Mac Image</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="dropdown dropdown-end">
                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabindex="0"><img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                        </label>
                        <ul className="dropdown-content" tabindex="0">
                          <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Approve</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Unapprove</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Mark as spam</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Move to Trash</span></a>
                            </li>
                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Block</span></a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="flex items-center gap-[5px]">
                        <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-movie-red.svg" alt="movie icon" /></div><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">full_trailer_2.mp4</span>
                      </div>
                    </td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">2.4Mb</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Aug 5th, 2022</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Mac Image</span></td>
                    <td className="border-t border-neutral pb-[15px] pt-[15px] dark:border-dark-neutral-border">
                      <div className="dropdown dropdown-end">
                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabindex="0"><img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                        </label>
                        <ul className="dropdown-content" tabindex="0">
                          <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Approve</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Unapprove</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Mark as spam</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Move to Trash</span></a>
                            </li>
                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Block</span></a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-neutral pt-[15px] dark:border-dark-neutral-border">
                      <input className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] translate-y-[3px]" type="checkbox" />
                    </td>
                    <td className="border-t border-neutral pt-[15px] dark:border-dark-neutral-border">
                      <div className="flex items-center gap-[5px]">
                        <div className="w-6 h-6 overflow-hidden"><img className="w-full h-full object-cover" src="/icon/icon-code-pink.svg" alt="code icon" /></div><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">router.js</span>
                      </div>
                    </td>
                    <td className="border-t border-neutral pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">2.4Mb</span></td>
                    <td className="border-t border-neutral pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Aug 5th, 2022</span></td>
                    <td className="border-t border-neutral pt-[15px] dark:border-dark-neutral-border"><span className="leading-4 text-gray-1100 text-[14px] dark:text-gray-dark-1100">Mac Image</span></td>
                    <td className="border-t border-neutral pt-[15px] dark:border-dark-neutral-border">
                      <div className="dropdown dropdown-end">
                        <label className="cursor-pointer dropdown-label flex items-center justify-between p-4" tabindex="0"><img className="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                        </label>
                        <ul className="dropdown-content" tabindex="0">
                          <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                            <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Approve</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Unapprove</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Mark as spam</span></a>
                            </li>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Move to Trash</span></a>
                            </li>
                            <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                            <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Block</span></a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:w-[29%]">
            <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pt-5 px-6 pb-8">
              <div className="flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[31px] pb-[16px]">
                <div className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100">Popular tags</div>
                <div className="dropdown dropdown-end ml-auto translate-x-4 z-10">
                  <label className="cursor-pointer dropdown-label flex items-center justify-between py-2 px-4" tabindex="0"><img className="cursor-pointer" src="/icon/icon-toggle.svg" alt="toggle icon" />
                  </label>
                  <ul className="dropdown-content" tabindex="0">
                    <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border  dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span></a>
                      </li>
                      <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Remove widget</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-[10px]"><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Figma</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Adobe XD</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">PSD Editor</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Employer</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Online Jobs</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Remote Work</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Salary</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Tips</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Income</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Develop</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">App</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Digital</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">Marketing</a><a className="bg-neutral text-gray-500 leading-3 rounded-[50px] dark:bg-dark-neutral-border py-[10px] px-[18px] dark:text-gray-dark-500 text-[10px]" href="#">CEO</a>
              </div>
            </div>
            <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pt-5 px-6 pb-[39px]">
              <div className="flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[24px] pb-[16px]">
                <div className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100">New active users</div>
                <div className="dropdown dropdown-end ml-auto translate-x-4 z-10">
                  <label className="cursor-pointer dropdown-label flex items-center justify-between py-2 px-4" tabindex="0"><img className="cursor-pointer" src="/icon/icon-toggle.svg" alt="toggle icon" />
                  </label>
                  <ul className="dropdown-content" tabindex="0">
                    <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border  dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span></a>
                      </li>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span></a>
                      </li>
                      <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li className="text-normal mb-[7px]"><a className="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span className="text-red text-[11px] leading-4">Remove widget</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-y-[22px]">
                <div className="flex justify-between">
                  <div className="flex gap-x-3">
                    <div className="overflow-hidden w-[40px] h-[40px] rounded-[100px]"><img className="w-full h-full object-cover" src="/pic/avatar1.png" alt="avatar" /></div>
                    <div className="flex flex-col gap-y-[7px]">
                      <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">Esther Howard</h4><span className="text-gray-400 text-xs dark:text-gray-dark-400">Administrator</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 items-end">
                    <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">1832</h5><span className="text-gray-400 text-xs dark:text-gray-dark-400">files</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-x-3">
                    <div className="overflow-hidden w-[40px] h-[40px] rounded-[100px]"><img className="w-full h-full object-cover" src="/pic/avatar2.png" alt="avatar" /></div>
                    <div className="flex flex-col gap-y-[7px]">
                      <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">Wade Warren</h4><span className="text-gray-400 text-xs dark:text-gray-dark-400">Manager</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 items-end">
                    <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">576</h5><span className="text-gray-400 text-xs dark:text-gray-dark-400">files</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-x-3">
                    <div className="overflow-hidden w-[40px] h-[40px] rounded-[100px]"><img className="w-full h-full object-cover" src="/pic/avatar3.png" alt="avatar" /></div>
                    <div className="flex flex-col gap-y-[7px]">
                      <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">Cameron Williamson</h4><span className="text-gray-400 text-xs dark:text-gray-dark-400">Guest</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 items-end">
                    <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">446</h5><span className="text-gray-400 text-xs dark:text-gray-dark-400">files</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-x-3">
                    <div className="overflow-hidden w-[40px] h-[40px] rounded-[100px]"><img className="w-full h-full object-cover" src="/pic/avatar4.png" alt="avatar" /></div>
                    <div className="flex flex-col gap-y-[7px]">
                      <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">Cameron Williamson</h4><span className="text-gray-400 text-xs dark:text-gray-dark-400">Guest</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 items-end">
                    <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">446</h5><span className="text-gray-400 text-xs dark:text-gray-dark-400">files</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-x-3">
                    <div className="overflow-hidden w-[40px] h-[40px] rounded-[100px]"><img className="w-full h-full object-cover" src="/pic/avatar5.png" alt="avatar" /></div>
                    <div className="flex flex-col gap-y-[7px]">
                      <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">Cameron Williamson</h4><span className="text-gray-400 text-xs dark:text-gray-dark-400">Guest</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 items-end">
                    <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">446</h5><span className="text-gray-400 text-xs dark:text-gray-dark-400">files</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-x-3">
                    <div className="overflow-hidden w-[40px] h-[40px] rounded-[100px]"><img className="w-full h-full object-cover" src="/pic/avatar6.png" alt="avatar" /></div>
                    <div className="flex flex-col gap-y-[7px]">
                      <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">Cameron Williamson</h4><span className="text-gray-400 text-xs dark:text-gray-dark-400">Guest</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 items-end">
                    <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">446</h5><span className="text-gray-400 text-xs dark:text-gray-dark-400">files</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
