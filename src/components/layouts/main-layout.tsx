import { ReactNode } from 'react';
import TrendingTagsList from '@/components/common/trending-tags-list';
import { ToastContainer } from 'react-toastify';

import Header from '../header/header';
import BackButton from '../common/back-button';
import SuggestionList from '../community/suggestion-list';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => (
  <div>
    <Header />
    <div className="no-scroll-shake pb-[80px]">
      <div className="relative min-h-screen grid grid-cols-1 max-w-[1000px] lg:grid-cols-[1fr_300px] mx-auto gap-x-5 mt-0 lg:mt-5 ">
        <main className=" w-full max-w-[680px] mx-auto">
          {children}
        </main>

        <div className="h-fit max-h-[calc(100vh-92px)] space-y-5 lg:block hidden sticky top-[92px] overflow-auto rounded-xl">
          <TrendingTagsList />
          <SuggestionList />
        </div>
      </div>
    </div>
    <Footer />
    <ToastContainer autoClose={3000} position="bottom-right" />
  </div>
);

export default MainLayout;


import { FiHome, FiSearch, FiBell, FiUsers } from 'react-icons/fi'
import { useRouter } from 'next/router';


const Footer = () => {
  const { pathname, push } = useRouter()
  return (
    <div className='grid grid-cols-4 fixed bottom-0 left-0 py-3 bg-purple-0 text-white w-full'>
      <Button onClick={() => { push('/') }} name="Home" active={pathname === '/'} Icon={FiHome} />
      <Button onClick={() => { }} name="Search" active={false} Icon={FiSearch} />
      <Button onClick={() => { }} name="Contacts" active={false} Icon={FiUsers} />
      <Button onClick={() => { }} name="Alerts" active={false} Icon={FiBell} />
    </div>
  )
}

const Button = ({ name, Icon, active, onClick }: { name: string, Icon: any, active: boolean, onClick: any }) => {
  return (
    <button onClick={onClick} className={`flex items-center justify-center px-3 flex-col`}>
      <div className={`${active ? 'bg-[#71F7ED] text-purple-0' : 'bg-none'} w-[60px] flex  justify-center py-1 rounded-full`} >
        <Icon size={20} />
      </div>
      <span className={`text-sm`}>{name}</span>
    </button>
  )
}