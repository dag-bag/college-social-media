/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { GrFormClose } from "react-icons/gr"
import { useSession } from 'next-auth/react';












interface DropdownMenuProps {
  userId: string;
  closeDropDown: () => void;
  notificationCount: number | undefined;
}

const DropdownMenu = ({
  userId,
  closeDropDown,
  notificationCount,
}: DropdownMenuProps) => {

  const session = useSession()
  const user = session.data?.user


  const Links = [
    { name: "my profile", Icon: GrFormClose, href: `/user/${user?.id}` },
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

  return (
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


        <div className='flex items-center justify-end'>

          <button onClick={(e) => {
            e.stopPropagation();
            closeDropDown();
          }}><GrFormClose size={30} /></button>

        </div>
        <ul className='p-5'>
          {

            Links.map(({ name, href, Icon }) => <li className="hover:bg-slate-100  dark:hover:bg-primary-dark-200 rounded-lg flex items-center">
              <Link href={href}>
                <a className="px-3 py-2 w-full rounded-lg flex items-center">
                  <Icon />
                  <span className="ml-2 text-lg capitalize font-[500]">{name}</span>
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
                  <span className="ml-2 text-lg capitalize font-[500]">{name}</span>
                </a>
              </Link>
            </li>)

          }

        </ul>
      </nav>
    </>
  )
};

export default DropdownMenu;
