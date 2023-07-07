import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import {
  useRemovePostMutation,
  useToggleBookmarkMutation,
  useTogglePostLikeMutation,
} from 'src/hooks/mutation';
import React, { useState } from 'react';
import { PostDetailsType } from '@/types/db';
import BookmarkIcon from '@/components/common/icons/bookmark-empty';
import BookmarkEmptyIcon from '@/components/common/icons/bookmark';
import ShareIcon from '@/components/common/icons/share';
import HeartIcon from '@/components/common/icons/heart';
import HeartEmptyIcon from '@/components/common/icons/heart-empty';
import PostSharingModal from './post-sharing-modal';
import { usePostCommentsQuery } from '@/hooks/query';

import { AiOutlineMessage, AiOutlineDelete } from 'react-icons/ai';
import CommentsList from '../comments-list/comments-list';
import Loading from '../common/loading';

import CommentInput from '../comments-list/comment-input';
import { useAddCommentMutation } from 'src/hooks/mutation';

import { FiCopy } from "react-icons/fi"
import { GoAlert } from "react-icons/go"
interface PostCardFooterProps {
  post: PostDetailsType;
}

import { Dialog } from '@headlessui/react';

const PostCardFooter = ({ post }: PostCardFooterProps) => {

  const [comment, setComments] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const { data: comments, isSuccess: isCommentsSuccess } =
    usePostCommentsQuery(post.id);

  const [isSharing, setIsSharing] = useState(false);
  const { data: session } = useSession();
  const me = session?.user!;

  const closeSharingModal = () => {
    setIsSharing(false);
  };

  const toggleIsSharing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSharing(!isSharing);
  };

  const toggleBookmark = useToggleBookmarkMutation();
  const togglePostLike = useTogglePostLikeMutation();
  const removePost = useRemovePostMutation();

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark({ postId: post.id });
  };


  const handleToggleMessages = () => {
    setIsOpen(!open)
  }

  const handleToggleLike = (e: React.MouseEvent) => {
    // e.preventDefault();
    e.stopPropagation();
    togglePostLike({ postId: post.id });
  };

  const handleRemovePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    removePost({ postId: post.id });
  };

  useTogglePostLikeMutation();

  const addComment = useAddCommentMutation(post.id);

  const handleAddComment = (message: string) => {
    addComment({
      message,
      parentId: null,
    });
  };

  return (
    <>


      <Dialog className={'bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-50 flex items-end justify-center'} open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel >

          <div className='bg-white  w-screen rounded-t-xl h-[600px] grid grid-rows-[40px_460px_100px]  py-3  overflow-hidden ' >

            <header className=' rounded-t-xl bg-transparent flex items-center bg-red-500-- flex-col  border-gray-200 border-b pb-2'>

              <p className='font-semibold'>{comments?.length} Comments</p>
            </header>


            <main className='px-2 mt-2 overflow-y-scroll' >

              {isCommentsSuccess ? (
                <CommentsList comments={comments} />
              ) : (
                <Loading height={200} />
              )}

            </main>

            <footer className='px-5'>
              <CommentInput onMessageSubmit={handleAddComment} />
            </footer>

          </div>

        </Dialog.Panel>
      </Dialog>



      {/* {comment && <div

        className="fixed top-0 left-0 w-full h-full bg-black z-50 bg-opacity-80 flex items-end ">
        <div className='bg-white w-full h-[90%] rounded-t-xl overflow-hidden'>
          <header onClick={handleToggleMessages} className='flex flex-col items-center justify-center py-3 '>

            <div className='flex flex-col gap-[2px] mb-2'>
              <div className='w-[60px] bg-gray-400 h-[2px] rounded-full'></div>
              <div className='w-[60px] bg-gray-400 h-[2px] rounded-full'></div>

            </div>

            <p className='font-semibold'>{comments?.length} Comments</p>
          </header>
          <main className=' h-full grid grid-rows-[auto_150px] '>
            <section className='px-5 overflow-scroll'>
              <section className='border-t-2 border-gray-200  pt-5'>
                {isCommentsSuccess ? (
                  <CommentsList comments={comments} />
                ) : (
                  <Loading height={200} />
                )}
              </section>
            </section>
            <section className='border-t border-gray-200 px-5'>
              <CommentInput onMessageSubmit={handleAddComment} />

            </section>

          </main>
        </div>


      </div >} */}

      <div className="flex items-center  pt-2 pr-2 border-t border-gray-200">
        <button
          type="button"
          className={clsx([
            'flex items-center cursor-pointer w-fit hover:opacity-80 transition-opacity',
            post.likedByMe && 'text-red-500',
          ])}
          onClick={handleToggleLike}
        >
          {post.likedByMe ? <HeartIcon /> : <HeartEmptyIcon />}
          <p className="ml-2">{post.likesCount}</p>
        </button>


        <button
          type="button"
          className={'flex items-center cursor-pointer w-fit opacity-80 ml-5 hover:opacity-50 transition-opacity'}
          onClick={() => { setIsOpen(true) }}
        >
          <AiOutlineMessage size={22} className={clsx(post.sharedByMe && 'fill-green-600')} />
          <p className="ml-2">{post.commentsCount}</p>
        </button>

        <button
          type="button"
          className={clsx(
            'flex items-center cursor-pointer w-fit opacity-80 ml-5 hover:opacity-50 transition-opacity',
            post.sharedByMe && 'text-green-600'
          )}
          onClick={toggleIsSharing}
        >
          <ShareIcon className={clsx(post.sharedByMe && 'fill-green-600')} />
        </button>

        <button
          type="button"
          className="flex ml-auto items-center cursor-pointer w-fit opacity-80 hover:opacity-50 transition-opacity"
          onClick={handleToggleBookmark}
        >
          {post.bookmarkedByMe ? <BookmarkEmptyIcon /> : <BookmarkIcon />}
        </button>

        {me.id === post.userId && (
          <button
            type="button"
            onClick={handleRemovePost}
            className="ml-3 font-medium text-xs text-red-400 hover:text-red-500 transition-colors"
          >
            <AiOutlineDelete size={28} />
          </button>
        )}
      </div>

      {
        isSharing && (
          <PostSharingModal
            closeSharingModal={closeSharingModal}
            sharedPost={post}
          />
        )
      }
    </>
  );
};

export default PostCardFooter;


