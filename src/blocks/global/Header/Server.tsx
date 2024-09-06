"use client";

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import React , { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { useAuth } from '../../../utils/AuthContext'; // Adjust the import path

type HeaderData = {
    nav: Array<{
      label: string;
      link: string;
      subItems?: Array<{ label: string; link: string }>;
    }>;
    logo: {
      url: string;
      alt: string;
    };
    userLinks: Array<{
      label: string;
      link: string;
    }>;
  };


export default function HeaderServer() {


    // const payload = await getPayloadHMR({config})
    // const header = await payload.findGlobal({
    //     slug: 'header',
    // })

    const [header, setHeader] = useState<HeaderData | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showButton, setShowButton] = useState<boolean>(false);
    // const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        // Fetch header data from the public API endpoint
        const fetchHeaderData = async () => {
        try {
            const response = await fetch('/api/globals/header?depth=1&draft=false&locale=undefined'); // Adjust endpoint as needed
            console.log("the response" + response);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data: HeaderData = await response.json();
            setHeader(data);
        } catch (error) {
            console.error('Error fetching header data:', error);
        }
        };

        fetchHeaderData();
    }, []);

    useEffect(() => {
        // Show button when there is text in the search query
        setShowButton(searchQuery.length > 0);
      }, [searchQuery]);

    const handleSearchClick = () => {
        if (searchQuery) {
        console.log(`Searching for: ${searchQuery}`);
        // Implement search functionality
        }
    };
    console.log(header);
    if (!header) return null; // Render nothing or a loading state while fetching
    
    return (
        <div className='bg-customPurple text-white'>
        <div className='max-w-7xl mx-auto flex flex-row items-center justify-center w-full space-y-4'>
          <div className="relative w-64 h-64">
            <Link href={header.nav[0].link}>
              <Image
                alt={header.logo.alt}
                src={header.logo.url}
                fill
                className='object-contain'
              />
            </Link>
          </div>
          {/* Categories */}
          <div className='flex justify-center space-x-8'>
            {header.nav.map((item, index) => (
              <div key={index} className='relative group'>
                <Link href={item.link || '#'} className='text-white text-lg'>
                  {item.label}
                </Link>
                {item.subItems && item.subItems.length > 0 && (
                  <div className='absolute left-0 mt-2 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:visible group-hover:opacity-100'>
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.link}
                        className='block rounded px-4 py-2 hover:bg-gray-50'
                      >
                        {subItem.label}
                  
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Search Bar */}
            <div className='relative flex items-center w-full px-4'>
            <input
                type="text"
                placeholder="Search..."
                className="flex-grow px-7 py-3 rounded-lg text-black transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {showButton && (
                <button
                onClick={handleSearchClick}
                className={`absolute right-5 px-4 py-1 bg-white text-black rounded-lg transition-opacity duration-300 ease-in-out ${showButton ? 'opacity-100' : 'opacity-0'}`}
                >
                Search
                </button>
            )}
            </div>


        <div className='flex space-x-4'>  
          {/* User Links */}
          {header.userLinks.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className='text-white text-lg hover:text-gray-300'
            >
              {link.label}
            </Link>
          ))}
        </div>
        </div>
      </div>

    )
}