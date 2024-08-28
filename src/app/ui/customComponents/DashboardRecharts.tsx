'use client'
import React, { PureComponent } from 'react'
import dayjs from 'dayjs'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getRechartsQuery } from '@/app/lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const getLastSevenDays =()=>{
    let days = [];
    for (let i = 0; i <= 7; i++) {
    days.push({date: dayjs().subtract(i, 'day').format('YYYY-MM-DD').toString(),
      name:dayjs().subtract(i, 'day').format('MMM, DD').toString(),
        uv:"",pv:""
    })
    }
    return days
}


const queryClient = new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus: false}}})

const DashboardRechartsWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
       <DashboardRecharts/>
    </QueryClientProvider>
   
  )
}

export default DashboardRechartsWrapper

export const DashboardRecharts = () => {
  const reddy = getLastSevenDays()

  const {data, isLoading} = useQuery({
    queryKey: ['rechartsData'],
    queryFn: async () => {
      const response = await getRechartsQuery(JSON.stringify(reddy))
      return response
    },
  })
  return (
      <div className={'py-10 rounded-xl mt-6 shadow-xl bg-white'}>
        <div className=' pb-4 relative left-[78px]'>
          <h2 className=' text-xl font-semibold text-textdark text-pretty'>Posts Activity</h2>
          <span>Last 7 Days</span>
        </div>
        {isLoading ?
      <div className=' bg-gray-300 animate-pulse h-[400px] w-full rounded-xl'></div>
      :
          <ResponsiveContainer  width="100%" height={450}>
          <LineChart
            width={700} height={300} data={data}
            margin={{top: 5, right: 30, left: 20,bottom: 5,}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" strokeWidth={2} dataKey="uv" stroke="#54a3a0 " />
          </LineChart>
        </ResponsiveContainer>
         }
      </div>
  )
}