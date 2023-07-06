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

          <div className='bg-white min-w-[300px] mx-auto rounded-md grid p-3' >
            <button className=' flex items-center  gap-2 mb-3 '><FiCopy />Copy post link</button>
            <button onClick={() => {
              setIsOpen(false);
              setIsOpen2(true)
            }} className=' flex items-center  gap-2 '><GoAlert />Report post</button>
          </div>

        </Dialog.Panel>
      </Dialog>

      <Dialog className={'bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-[100] flex items-center justify-center'} open={isOpen2} onClose={() => setIsOpen2(false)}>
        <Dialog.Panel >

          <div className='bg-white min-w-[99%]  max-w-[99%] mx-auto rounded-md grid px-5 py-3' >
            <h2 className='font-medium mb-2 text-lg p-b'>Why are you reporting this post?</h2>
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



      <div
        // role="link"
        // tabIndex={0}
        // onKeyDown={(e) => {
        //   if (e.target !== e.currentTarget) return;
        //   if (e.code === 'Enter') {
        //     goToPostDetails();
        //   }
        // }}
        className=" bg-primary-0 dark:bg-primary-dark-200 w-full p-2 shadow-sm rounded-lg cursor-pointer "
      // onClick={goToPostDetails}
      >
        {/* <div className="lg:flex ml-14 space-y-2 lg:space-y-0 lg:space-x-5 items-baseline">
        {post.communityId && post.communityName && (
          <CommunityBadge
            communityId={post.communityId}
            communityName={post.communityName}
          />
        )}
        {post.sharedBy.length > 0 && <RepostBadge users={post.sharedBy} />}
      </div>
      <div className="flex mt-2">
        <Author
          authorId={post.user.id}
          authorImage={post.user.image}
          authorName={post.user.name}
          postCreatedAt={post.createdAt}
        />
      </div>
      <div className="md:ml-14">
        <TagsList tags={post.tags} />
        <div className="relative">
          <p className="mb-3 whitespace-pre-wrap overflow-hidden">
            {post.content}
          </p>
          {post.link && <PostCardLink link={post.link} />}
          <ImagesGrid images={post.images} />
          {post.shareParent && (
            <>
              <div className="mt-3 h-1" />
              <PostThumbnail sharedPost={post.shareParent} />
            </>
          )}
        </div>
        <MentionsList mentions={post.mentions} />
      </div> */}


        <div className='grid grid-cols-[50px_auto]'>
          <div>


            <div className='w-[40px] h-[40px] bg-red-500 rounded-full overflow-hidden'>
              <img src={post.user.image as string} alt="user-omage" />
            </div>

          </div>
          <div>


            <header className='flex gap-5 justify-between'>
              <div>
                <h2 className='font-[500] text-[15px]'>{post.user.name}</h2>
                <div className='text-[13px] font-[500] text-gray-500'>
                  <span>@{post.user.id}</span> ● <span> <ReactTimeAgo date={post.createdAt} /></span>
                </div>
              </div>
              <button onClick={handleClickToggle} className='w-[30px] h-[30px]'>
                <BsThreeDots />
              </button>
            </header>

            <main>
              <p className='text-sm mb-2'>{post.content}</p>
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
