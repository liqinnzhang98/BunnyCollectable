import React from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Image from 'next/image'

export default async function FooterServer() {

    const payload = await getPayloadHMR( { config } )
    const footer = await payload.findGlobal({
        slug: 'footer',
    })

    return (
        <div className='bg-customPurple text-white'>
        <div className='max-w-7xl mx-auto flex flex-row items-center justify-center w-full space-y-4'>
          {footer.logo && footer.logo.url && (
                    <div className="relative w-64 h-40 flex items-center justify-center">
                        <Image
                            alt={footer.logo.alt || 'Logo'}
                            src={footer.logo.url}
                            className='object-contain'
                            width={60} // Base width
                            height={50} // Base height

                        />
                    </div>
                )}

          <div>
            { footer.copyrightNotice}
          </div>

        </div>
        </div>
    )
}