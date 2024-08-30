import FooterServer from '@/blocks/global/Footer/Server'
import HeaderServer from '@/blocks/global/Header/Server'
import React, { ReactNode } from 'react'

export default function layout({children} : {children: ReactNode}) {
    return (
        <div>
            <HeaderServer />
            {children}
            <FooterServer />
        </div>
    )
}