import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default async function HeaderServer() {


    const payload = await getPayloadHMR({config})
    const header = await payload.findGlobal({
        slug: 'header',
    })
    


    return (


        <div className='bg-customPurple text-white p-4'>
        <div className='py-4 max-w-5xl mx-auto flex justify-between w-full'>



        <div className="relative w-40 h-40">
            <Link href={header.nav[0].link}>
                <Image alt={header.logo.alt} src={header.logo.url} fill className='object-contain' />
            </Link>
        </div>
            <div>
                {header.nav.map((item, index) => {
                    if (index > 0) {
                        return (
                        <Link key={index} href={item.link} className='text-black text-lg mx-10'>{item.label}</Link>
                        )
                    }
                })}
            </div>
        </div>
        </div>

    )
}