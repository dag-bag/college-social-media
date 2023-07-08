import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import { useElementSize } from 'usehooks-ts';
import { PostDetailsType } from '@/types/db';
import Author from './author';
import TagsList from './tags-list';
import ImagesGrid from './images-grid';
import PostCardFooter from './post-card-footer';
import PostThumbnail from '../post/post-thumbnail';
import CommunityBadge from './community-badge';
import MentionsList from './mentions-list';
import PostCardLink from './post-card-link';
import RepostBadge from './repost-badge';
import ReactTimeAgo from 'react-time-ago';

import { FiCopy } from "react-icons/fi"
import { GoAlert } from "react-icons/go"



import { Dialog } from '@headlessui/react';
import { BsThreeDotsVertical, BsThreeDots } from "react-icons/bs"

export interface PostCardProps {
  post: PostDetailsType;
}

const reports = ["I just don't like it", "it's spam", "Hate speech", "Bullying and Harrasement", "Inappropriate Content", "Other"]

const PostCard = ({ post }: PostCardProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)

  const [report, setReport] = useState('')
  const [customReport, setCustomReport] = useState('')


  const handleClickToggle = () => {
    setIsOpen(!isOpen)
  }

  console.log(post)

  const router = useRouter();

  const basePath = router.asPath.split('?')[0];
  const showModalOnClick = basePath === '/';

  const goToPostDetails = () => {
    const url = showModalOnClick ? `${basePath}` : `/post/${post.id}`;

    router.push(
      {
        pathname: url,
        query: { ...router.query, postId: post.id },
      },
      `/post/${post.id}`,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  return (

    <>

      <Dialog className={'bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center'} open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel >

          <div className='bg-white w-[95vw] mx-auto rounded-md grid p-5 gap-2 text-purple-0' >
            <button className=' flex items-center  gap-2 mb-3'><FiCopy size={20} />Copy post link</button>
            <button onClick={() => {
              setIsOpen(false);
              setIsOpen2(true)
            }} className=' flex items-center  gap-2'><GoAlert size={20} />Report post</button>
          </div>

        </Dialog.Panel>
      </Dialog>

      <Dialog className={'bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-[100] flex items-center justify-center'} open={isOpen2} onClose={() => setIsOpen2(false)}>
        <Dialog.Panel >

          <div className='bg-white text-purple-0 w-[95vw] mx-auto rounded-md grid px-5 py-3' >
            <h2 className='font-bold mb-2 text-lg p-b'>Why are you reporting this post?</h2>
            <div className='grid gap-2'>
              {reports.map(rep => (
                <div onClick={() => { setReport(rep) }} className='flex items-center gap-2.5 '>
                  <div className={`w-[15px] h-[15px]  rounded-full ${report == rep ? 'border-purple-0 border-2' : 'bg-gray-200'}`}></div>
                  <span className=''> {rep}</span>
                </div>
              ))}
            </div>


            {report == 'Other' && (
              <div className='ml-5 mt-2'>
                <p className='mb-1 text-gray-600 text-sm'>Define your report</p>
                <input onChange={event => { setCustomReport(event.target.value) }} type="text" className='border-2 border-gray-100 p-1 px-2 w-full rounded-md' placeholder='Describe your report...' />
              </div>
            )}

            <button onClick={() => setIsOpen2(false)} disabled={report == ''} className='bg-purple-0 py-1.5 text-white rounded-md mt-3 disabled:opacity-30'>Submit</button>

          </div>

        </Dialog.Panel>
      </Dialog>



      <div className=" bg-primary-0 text-purple-0  w-full  rounded-lg cursor-pointer ">
        <div className='grid '>
          <div>
            <header className='grid grid-cols-[40px_auto_50px] gap-2 px-2'>
              <div>
                <div className='w-[40px] h-[40px] bg-red-500 rounded-full overflow-hidden'>
                  <img src={post.user.image as string} alt="user-omage" />
                </div>
              </div>
              <div>
                <h2 className=' font-extrabold text-[18px]'>{post.user.name}</h2>
                <div className='text-[12px] font-[500]  gap-2 flex'>
                  <span>@{post.user.name}</span> ● <span> <ReactTimeAgo date={post.createdAt} /></span>
                </div>
              </div>
              <button onClick={handleClickToggle} className='  bg-red-500-- flex items-center justify-center'>
                <BsThreeDots size={20} />
              </button>
            </header>

            <main className='mt-2'>
              <p className='mb-2 px-2'>{post.content}</p>
              <ImagesGrid images={post.images} />
            </main>

            <PostCardFooter post={post} />

          </div>
        </div>

      </div>

    </>
  );
};

export default PostCard;
