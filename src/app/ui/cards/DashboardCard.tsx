import { Oxanium } from 'next/font/google'
import React from 'react'
import './dashboardcard.css'

const oxanium = Oxanium({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-oxanium",
})

const DashboardCard = ({label, content}:{label:string, content:string}) => {
  return (
    <div 
    className="relative wrapper py-5 px-5 bg-white rounded-xl shadow-xl">
        <h2 className={`${oxanium.className} text-4xl mb-2 font-bold`}>{content}</h2>
        <span>{label}</span>
    </div>
  )
}

export default DashboardCard