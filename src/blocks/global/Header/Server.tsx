import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import React from 'react'
import Image from 'next/image'

export default async function HeaderServer() {


    const payload = await getPayloadHMR({config})
    const header = await payload.findGlobal({
        slug: 'header',
    })


    return (
        <div className='bg-gray-100 py-12'>
            <div className="relative w-64 h-64">
                <Image src={header.logo.url} fill className='object-contain' />
            </div>
        </div>
    )
}