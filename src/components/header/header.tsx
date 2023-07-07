/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import React from 'react';
import SearchBar from '@/components/header/search-bar';
import Menu from '@/components/header/menu';
import { FiUser } from "react-icons/fi";
import DesktopNavigation from './desktop-navigation';

import { FaUserAlt } from "react-icons/fa"
import { BiMessageRounded } from "react-icons/bi"
import { AiFillQuestionCircle } from 'react-icons/ai'


const Header = () => (
  <div className="dark:bg-primary-dark-50  grid grid-cols-[50px_2fr_80px] bg-primary-50 px-3 py-2 md:py-3 md:px-5 sticky top-0 z-[10] shadow-md no-scroll-header">

    <Menu></Menu>


    <div className='flex items-center justify-center '>
      <h1 className='font-bold text-xl italic'>babila</h1>
    </div>

    <div className='flex'>
      <button className='p-2'><AiFillQuestionCircle size={25} /></button>
      <button className='p-2'><BiMessageRounded size={25} /></button>
    </div>



  </div >
);

export default Header;
