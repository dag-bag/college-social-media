/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import ThemeSwitch from '@/components/common/theme-switch';
import ProfileIcon from '@/components/common/icons/profile';
import BookmarkIcon from '@/components/common/icons/bookmark-empty';
import LogOutIcon from '@/components/common/icons/log-out';
import GraphIcon from '../common/icons/graph';
import HashIcon from '../common/icons/hash';
import ExclamationIcon from '../common/icons/exclamation';
import { GrFormClose } from "react-icons/gr"






const Links = [
  { name: "my profile", Icon: GrFormClose, href: '/' },
  { name: "my company", Icon: GrFormClose, href: '/' },
  { name: "my cvs", Icon: GrFormClose, href: '/' },
  { name: "my job ads", Icon: GrFormClose, href: '/' },
  { name: "my communities", Icon: GrFormClose, href: '/' },
  { name: "my communities", Icon: GrFormClose, href: '/' },
  { name: "my favorites", Icon: GrFormClose, href: '/' },
  { name: "my documents", Icon: GrFormClose, href: '/' },
]

const Links2 = [
  { name: "settings", Icon: GrFormClose, href: '/' },
  { name: "help center", Icon: GrFormClose, href: '/' },
  { name: "tell a friend", Icon: GrFormClose, href: '/' },

]





interface DropdownMenuProps {
  userId: string;
  closeDropDown: () => void;
  notificationCount: number | undefined;
}

const DropdownMenu = ({
  userId,
  closeDropDown,
  notificationCount,
}: DropdownMenuProps) => (
  <>
    <div
      aria-label="Close modal"
      className="bg-neutral-800 opacity-80 fixed inset-0 top-14 z-10 md:hidden"
      onClick={(e) => {
        e.stopPropagation();
        closeDropDown();
      }}
    />
    <nav className="fixed inset-0 top-14 left-0 right-20 md:inset-[unset] md:right-5 md:top-[72px] md:min-w-[300px] md:absolute z-[100] bg-primary-0 dark:bg-primary-dark-100  p-3 md:rounded-xl shadow-2xl select-none ">
      {/* <ThemeSwitch /> */}
      {/* <hr className="my-4 dark:border-primary-700" /> */}


      <div className='flex items-center justify-end'>

        <button onClick={(e) => {
          e.stopPropagation();
          closeDropDown();
        }}><GrFormClose size={30} /></button>

      </div>

      <ul className='p-5'>


        {

          Links.map(({ name, href, Icon }) => <li className="hover:bg-slate-100  dark:hover:bg-primary-dark-200 rounded-lg flex items-center">
            <Link href={`user/${userId}`}>
              <a className="px-3 py-2 w-full rounded-lg flex items-center">
                <Icon />
                <span className="ml-2 text-md capitalize font-[500]">{name}</span>
              </a>
            </Link>
          </li>)

        }

        <hr className='mb-5 mt-2' />



        {

          Links2.map(({ name, href, Icon }) => <li className="hover:bg-slate-100  dark:hover:bg-primary-dark-200 rounded-lg flex items-center">
            <Link href={href}>
              <a className="px-3 py-2 w-full rounded-lg flex items-center">
                <Icon />
                <span className="ml-2 text-md capitalize font-[500]">{name}</span>
              </a>
            </Link>
          </li>)

        }







        {/* <li className="hover:bg-slate-100  dark:hover:bg-primary-dark-200 rounded-lg flex items-center">
          <Link href={`/user/${userId}`}>
            <a className="px-3 py-3 w-full rounded-lg flex items-center">
              <ProfileIcon />
              <span className="ml-2" text-sm>Profile</span>
            </a>
          </Link>
        </li>
        <li className="lg:hidden hover:bg-slate-100 dark:hover:bg-primary-dark-200  rounded-lg flex items-center w-full   ">
          <Link href="/bookmarks">
            <a className="px-3 py-3 w-full rounded-lg flex items-center">
              <BookmarkIcon />
              <span className="ml-2 text-sm">My Favorites</span>
            </a>
          </Link>
        </li>
        <li className="lg:hidden hover:bg-slate-100 dark:hover:bg-primary-dark-200  rounded-lg flex items-center w-full   ">
          <Link href="/community">
            <a className="px-3 py-3 w-full rounded-lg flex items-center">
              <GraphIcon />
              <span className="ml-2 text-sm">Communities</span>
            </a>
          </Link>
        </li>
        <li className="lg:hidden hover:bg-slate-100  dark:hover:bg-primary-dark-200  rounded-lg flex items-center w-full   ">
          <Link href="/explore">
            <a className="px-3 py-3 w-full rounded-lg flex items-center">
              <HashIcon />
              <span className="ml-2 text-sm">Explore</span>
            </a>
          </Link>
        </li>
        <li className="hover:bg-slate-100  dark:hover:bg-primary-dark-200  rounded-lg flex items-center w-full   ">
          <Link href="/notifications">
            <a className="px-3 py-3 w-full rounded-lg flex items-center relative">
              <ExclamationIcon />
              <span className="ml-2 text-sm">Notifications</span>
              {!!notificationCount && (
                <div className="w-[22px] h-[22px] flex items-center justify-center text-sm text-white bg-red-500 absolute rounded-full right-1 top-1/2 -translate-y-1/2">
                  {notificationCount}
                </div>
              )}
            </a>
          </Link>
        </li>
        <li className="hover:bg-slate-100 dark:hover:bg-primary-dark-200 rounded-lg ">
          <button
            type="button"
            onClick={() => signOut()}
            className="flex items-center px-3 py-3 w-full rounded-lg"
          >
            <LogOutIcon />
            <span className="ml-2">Log Out</span>
          </button>
        </li> */}
      </ul>
    </nav>
  </>
);

export default DropdownMenu;
