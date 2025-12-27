'use client'
import React from 'react'
import { IconType } from "react-icons";

function TechShow({ icon, name, iconColor, link }: { icon: IconType, name: string, iconColor: string, link: string }) {
    const Icon = icon;
    return (
        <button 
            onClick={() => window.open(link, "_blank")} 
            className='bg-card border-2 mx-0.5 md:mx-1 my-1 cursor-pointer hover:scale-95 hover:bg-card/90 border-border px-2 md:px-3 flex py-1.5 md:py-2 rounded-2xl md:rounded-2xl flex-row justify-center items-center gap-x-1.5 md:gap-x-2 transition-transform duration-100'
        >
            <Icon style={{ color: iconColor }} className="text-xs md:text-sm shrink-0" />
            <h2 className='text-[10px] md:text-sm font-semibold text-foreground whitespace-nowrap'>{name}</h2>
        </button>
    )
}

export default TechShow