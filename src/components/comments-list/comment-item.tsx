import { CommentDetailsType } from '@/types/db';
import useComment from '@/components/comments-list/use-comment';
import CommentInput from './comment-input';
import clsx from 'clsx';

// import Author from '../post-card/author';
// import CommentFooter from './comment-footer';
// import CommentContent from './comment-content';
import DeletedCommenFallback from './deleted-comment-fallback';
import HeartIcon from '../common/icons/heart';
import HeartEmptyIcon from '../common/icons/heart-empty';
import { useToggleCommentLikeMutation } from '@/hooks/mutation';
import ReactTimeAgo from 'react-time-ago';
import UserProfilePicture from '../common/user-profile-image';
export interface CommentitemProps {
  comment: CommentDetailsType;
  parentUserName: string | null;
}

const CommentItem = ({ comment, parentUserName }: CommentitemProps) => {
  const {
    onChangeDraftContent,
    handleAddCommentReply,
    handleUpdateComment,
    isReplying,
    toggleIsEditing,
    toggleIsReplying,
    draftContent,
    isEditing,
  } = useComment({ comment });

  if (comment.isDeleted) {
    return <DeletedCommenFallback />;
  }

  const toggleLike = useToggleCommentLikeMutation(comment.postId);

  const handleToggleLike = () => {
    toggleLike({ commentId: comment.id });
  };

  return (
    <>
      <div
        className="bg-gray-50 gap-x-3 p-2 rounded-lg mb-3 dark:bg-primary-dark-100"
        id={`comment-${comment.id}`}
      >
        {/* <Author
          authorId={comment.userId}
          authorImage={comment.user.image}
          authorName={comment.user.name}
          postCreatedAt={comment.createdAt}
        />
        <CommentContent
          commentMessage={comment.message}
          draftContent={draftContent}
          handleUpdateComment={handleUpdateComment}
          isEditing={isEditing}
          onChangeDraftContent={onChangeDraftContent}
          parentUserName={parentUserName}
        />
        <CommentFooter
          comment={comment}
          toggleIsEditing={toggleIsEditing}
          toggleIsReplying={toggleIsReplying}
        /> */}

        <div className='w-full grid grid-cols-[50px_auto_50px]'>
          <div className='rouded-full overflow-hidden'>
            <UserProfilePicture imageUrl={comment.user.image} userID={comment.userId} />
          </div>
          <div className=''>
            <header className='flex gap-5 items-center '>
              <h2 className='font-[500] text-[15px]'>{comment.user.name}</h2>
              <span className='text-[13px]'> <ReactTimeAgo date={comment.createdAt} /></span>
            </header>
            <main className='text-sm'>{comment.message}</main>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type="button"
              className={clsx([
                'flex items-center cursor-pointer w-fit',
                comment.likedByMe && 'text-red-500',
              ])}
              onClick={handleToggleLike}
            >
              {comment.likedByMe ? (
                <HeartIcon width={16} height={16} />
              ) : (
                <HeartEmptyIcon width={16} height={16} />
              )}
              <p className="ml-2">{comment.likeCount}</p>
            </button>
          </div>
        </div>
      </div>
      {isReplying && <CommentInput onMessageSubmit={handleAddCommentReply} />}
    </>
  );
};

export default CommentItem;
