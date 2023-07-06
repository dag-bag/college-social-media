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


import { AiOutlineMessage, AiOutlineDelete } from 'react-icons/ai';

interface PostCardFooterProps {
  post: PostDetailsType;
}

const PostCardFooter = ({ post }: PostCardFooterProps) => {
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

  return (
    <>
      <div className="flex items-center  pt-2 border-t border-gray-200">
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
          className={clsx(
            'flex items-center cursor-pointer w-fit opacity-80 ml-5 hover:opacity-50 transition-opacity',
            post.sharedByMe && 'text-green-600'
          )}
          onClick={toggleIsSharing}
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

      {isSharing && (
        <PostSharingModal
          closeSharingModal={closeSharingModal}
          sharedPost={post}
        />
      )}
    </>
  );
};

export default PostCardFooter;


