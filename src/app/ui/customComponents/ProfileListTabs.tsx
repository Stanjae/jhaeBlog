'use client'
import React from 'react'
import {Tabs,TabsHeader,TabsBody,Tab,TabPanel} from './CustomComponents'
import ProfilePostCard from '../cards/ProfilePostCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfilePostsPagination } from '../Pagination/ProfilePostsPagination';

const data = [{label: "Home", value: "home"},{label: "About",value: "about"} ]

const queryClient = new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus: false}}
})


const ProfileListTabs = ({posts}:any) => {
    const [activeTab, setActiveTab] = React.useState("home");

    const [active, setActive] = React.useState(1);

    const ITEMS_PER_PAGE = 5
    const PAGINATION_COUNT = Math.ceil(posts.length / ITEMS_PER_PAGE)

    const nextPage = ITEMS_PER_PAGE * active
    const prevPage = ITEMS_PER_PAGE * (active - 1)

  return (
    <QueryClientProvider client={queryClient}>
        <div>
            <Tabs value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
            >
                {data.map(({ label, value }) => (
                <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-gray-900" : ""}
                >
                    {label}
                    {activeTab === value && (<span className='text-gray-500 ml-1'>({posts?.length})</span>)
                    }
                </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                <TabPanel className=' space-y-3 ' value={data[0].value}>
                    {posts?.slice(prevPage, nextPage)?.map((post:any) => (<ProfilePostCard key={post.slug} post={post}/>))}

                    <div>
                        {posts?.length > ITEMS_PER_PAGE && <ProfilePostsPagination pageArray={PAGINATION_COUNT} active={active} setActive={setActive}/>}
                    </div>
                    
                </TabPanel>

                <TabPanel value={data[1].value}>
                    "lolliopop"
                </TabPanel>

            </TabsBody>
            </Tabs>
        </div>
    </QueryClientProvider>
  )
}

export default ProfileListTabs