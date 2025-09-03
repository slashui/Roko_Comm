import React from 'react'

export default function UITable() {
  return (
    <div>
      <div>
        <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">Table</h2>
        <div className="flex items-center text-xs text-gray-500 gap-x-[11px] mb-[37px]">
          <div className="flex items-center gap-x-1"><img src="/icon/icon-home-2.svg" alt="home icon" /><a class="capitalize" href="index.html">home</a></div><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><a class="capitalize" href="index.html">agentui</a><img src="/icon/icon-arrow-right.svg" alt="arrow right icon" /><span class="capitalize dark:text-primary text-brand">Table</span>
        </div>
      </div>

      {/* Search */}
      <div class="flex items-center justify-between flex-wrap gap-5 mb-[27px]">
        <div class="dropdown dropdown-end">
          <label class="cursor-pointer dropdown-label flex items-center justify-between" tabindex="0">
            <div class="flex items-center justify-between p-4 bg-neutral-bg border border-neutral rounded-lg w-[225px] dark:bg-dark-neutral-bg dark:border-dark-neutral-border">
              <p class="text-sm leading-4 text-gray-500 dark:text-gray-dark-500">All Category</p><img class="cursor-pointer" src="/icon/icon-arrow-down.svg" alt="arrow icon" />
            </div>
          </label>
          <ul class="dropdown-content" tabindex="0">
            <div class="relative menu rounded-box dropdown-shadow w-[225px] bg-neutral-bg pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
              <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
              <li class="text-normal mb-[7px]">
                <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span>
                </div>
              </li>
              <li class="text-normal mb-[7px]">
                <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span>
                </div>
              </li>
              <li class="text-normal mb-[7px]">
                <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span>
                </div>
              </li>
              <li class="text-normal mb-[7px]">
                <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div class="flex items-center gap-3">
          <div class="dropdown dropdown-end">
            <label class="cursor-pointer dropdown-label flex items-center justify-between" tabindex="0">
              <div class="flex items-center justify-between p-4 bg-neutral-bg border border-neutral rounded-lg w-[173px] dark:bg-dark-neutral-bg dark:border-dark-neutral-border">
                <p class="text-sm leading-4 text-gray-500 dark:text-gray-dark-500">10-02-2021</p><img class="cursor-pointer" src="/icon/icon-calendar-2.svg" alt="calendar icon" />
              </div>
            </label>
            <ul class="dropdown-content" tabindex="0">
              <div class="relative menu rounded-box dropdown-shadow w-[173px] bg-neutral-bg pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span>
                  </div>
                </li>
              </div>
            </ul>
          </div>
          <div class="dropdown dropdown-end">
            <label class="cursor-pointer dropdown-label flex items-center justify-between" tabindex="0">
              <div class="flex items-center justify-between p-4 bg-neutral-bg border border-neutral rounded-lg w-[173px] dark:bg-dark-neutral-bg dark:border-dark-neutral-border">
                <p class="text-sm leading-4 text-gray-500 dark:text-gray-dark-500">Status</p><img class="cursor-pointer" src="/icon/icon-arrow-down.svg" alt="arrow icon" />
              </div>
            </label>
            <ul class="dropdown-content" tabindex="0">
              <div class="relative menu rounded-box dropdown-shadow w-[173px] bg-neutral-bg pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span>
                  </div>
                </li>
              </div>
            </ul>
          </div>
          <div class="dropdown dropdown-end">
            <label class="cursor-pointer dropdown-label flex items-center justify-between" tabindex="0">
              <div class="flex items-center p-4 bg-neutral-bg border border-neutral rounded-lg w-[90px] dark:bg-dark-neutral-bg dark:border-dark-neutral-border gap-[5px]"><img class="cursor-pointer" src="/icon/icon-filter.svg" alt="calendar icon" />
                <p class="text-sm leading-4 text-gray-500 dark:text-gray-dark-500">Filters</p>
              </div>
            </label>
            <ul class="dropdown-content" tabindex="0">
              <div class="relative menu rounded-box dropdown-shadow w-[90px] bg-neutral-bg pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span>
                  </div>
                </li>
                <li class="text-normal mb-[7px]">
                  <div class="flex items-center bg-transparent p-0"><span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>


      {/* Table */}
      <div class="rounded-2xl border border-neutral bg-neutral-bg dark:border-dark-neutral-border dark:bg-dark-neutral-bg overflow-x-scroll scrollbar-hide p-[25px] pb-10 mb-[25px]">
        <div class="flex items-center justify-between pb-4 border-neutral border-b mb-5 dark:border-dark-neutral-border">
          <p class="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">Recent Orders</p>
          <div class="dropdown dropdown-end ml-auto translate-x-4 z-10">
            <label class="cursor-pointer dropdown-label flex items-center justify-between py-2 px-4" tabindex="0"><img class="cursor-pointer" src="/icon/icon-toggle.svg" alt="toggle icon" />
            </label>
            <ul class="dropdown-content" tabindex="0">
              <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border  dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Sales report</span></a>
                </li>
                <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Export report</span></a>
                </li>
                <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Profit manage</span></a>
                </li>
                <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Revenue report</span></a>
                </li>
                <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Remove widget</span></a>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <table class="w-full min-w-[900px]">
          <thead>
            <tr class="border-b border-neutral dark:border-dark-neutral-border pb-[15px]">
              <th class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[6px]" type="checkbox" />
              </th>
              <th class="font-normal text-normal text-gray-400 text-left pb-[15px] dark:text-gray-dark-400">Order ID</th>
              <th class="font-normal text-normal text-gray-400 text-left pb-[15px] dark:text-gray-dark-400">Customer name</th>
              <th class="font-normal text-normal text-gray-400 text-left pb-[15px] dark:text-gray-dark-400">Payment Method</th>
              <th class="font-normal text-normal text-gray-400 text-left pb-[15px] dark:text-gray-dark-400">Date</th>
              <th class="font-normal text-normal text-gray-400 text-left pb-[15px] dark:text-gray-dark-400">Status</th>
              <th class="font-normal text-normal text-gray-400 text-left pb-[15px] dark:text-gray-dark-400">Total</th>
              <th class="font-normal text-normal text-gray-400 text-center pb-[15px] dark:text-gray-dark-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar1.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Cooper</p>
                </div>
              </td>
              <td><span>American Express</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-green"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Delivered</p>
                </div>
              </td>
              <td><span>$102.23</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar2.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Gary Simmons</p>
                </div>
              </td>
              <td><span>PayPal</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-orange"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Pending</p>
                </div>
              </td>
              <td><span>$206.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar3.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Hank</p>
                </div>
              </td>
              <td><span>Check</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-red"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Canceled</p>
                </div>
              </td>
              <td><span>$346.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar4.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Nguyen</p>
                </div>
              </td>
              <td><span>Visa</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-green"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Delivered</p>
                </div>
              </td>
              <td><span>$236.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar5.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Halland</p>
                </div>
              </td>
              <td><span>American Express</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-orange"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Pending</p>
                </div>
              </td>
              <td><span>$106.56</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar6.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Mike</p>
                </div>
              </td>
              <td><span>Visa</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-red"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Canceled</p>
                </div>
              </td>
              <td><span>$122.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar5.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Taylor</p>
                </div>
              </td>
              <td><span>Check</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-green"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Delivered</p>
                </div>
              </td>
              <td><span>$136.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar2.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Smith</p>
                </div>
              </td>
              <td><span>American Express</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-orange"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Pending</p>
                </div>
              </td>
              <td><span>$1123.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar3.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Cooper</p>
                </div>
              </td>
              <td><span>Visa</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-red"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Canceled</p>
                </div>
              </td>
              <td><span>$106.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar1.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Cooper</p>
                </div>
              </td>
              <td><span>American Express</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-green"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Delivered</p>
                </div>
              </td>
              <td><span>$116.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar4.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Cooper</p>
                </div>
              </td>
              <td><span>Visa</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-orange"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Pending</p>
                </div>
              </td>
              <td><span>$126.58</span></td>
              <td>
                <div class="dropdown dropdown-end w-full">
                  <label class="cursor-pointer dropdown-label flex items-center justify-between p-3" tabindex="0"><img class="mx-auto cursor-pointer" src="/icon/icon-more.svg" alt="more icon" />
                  </label>
                  <ul class="dropdown-content" tabindex="0">
                    <div class="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                      <div class="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px] show-detail" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">View details</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Pending</span></a>
                      </li>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#"> <span class="text-gray-500 text-[11px] leading-4 hover:text-gray-700">Completed</span></a>
                      </li>
                      <div class="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>
                      <li class="text-normal mb-[7px]"><a class="flex items-center bg-transparent p-0 gap-[7px]" href="#remove"> <span class="text-red text-[11px] leading-4">Cancel</span></a>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
              <td class="text-left">
                <input class="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px] mb-[-6px]" type="checkbox" />
              </td>
              <td><span>#25413</span></td>
              <td class="py-[25px]">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full overflow-hidden"><img src="/pic/avatar6.png" alt="user avatar" /></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Bessie Cooper</p>
                </div>
              </td>
              <td><span>American Express</span></td>
              <td><span>17 Oct, 2022</span></td>
              <td>
                <div class="flex items-center gap-x-2">
                  <div class="w-2 h-2 rounded-full bg-red"></div>
                  <p class="text-normal text-gray-1100 dark:text-gray-dark-1100">Canceled</p>
                </div>
              </td>
              <td><span>$106.58</span></td>

            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center gap-x-10">
        <div>
          <button class="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-brand dark:bg-primary dark:text-black font-semibold py-[11px] px-[18px]">1</button>
          <button class="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:text-black hover:bg-primary dark:text-gray-dark-1100">2</button>
          <button class="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:text-black hover:bg-primary dark:text-gray-dark-1100">3</button>
          <button class="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:text-black hover:bg-primary dark:text-gray-dark-1100">4</button>
          <button class="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:text-black hover:bg-primary dark:text-gray-dark-1100">5</button>
        </div><a class="items-center justify-center border rounded-lg border-neutral hidden gap-x-[10px] px-[18px] py-[11px] dark:border-dark-neutral-border dark:hover:border-primary sm:flex" href="#"> <span class="text-gray-400 text-xs font-semibold leading-[18px] dark:text-gray-dark-400">Next</span><img src="/icon/icon-arrow-right-long.svg" alt="arrow right icon" /></a>
      </div>

    </div>
  )
}

