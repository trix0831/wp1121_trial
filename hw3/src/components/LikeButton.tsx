"use client";

// import { useState } from "react";
// import type { EventHandler, MouseEvent } from "react";

// import { Heart } from "lucide-react";

// import useLike from "@/hooks/useLike";
// import { cn } from "@/lib/utils";

// import { Button } from "./ui/button";

// type LikeButtonProps = {
//   initialLikes: number;
//   initialLiked?: boolean;
//   tweetId: number;
//   handle?: string;
// };

// export default function LikeButton({
//   initialLikes,
//   initialLiked,
//   tweetId,
//   handle,
// }: LikeButtonProps) {
//   const [liked, setLiked] = useState(initialLiked);
//   const [likesCount, setLikesCount] = useState(initialLikes);
//   const [participateButtonText, setParticipateButtonText] = useState("participate");
//   const { likeTweet, unlikeTweet, loading } = useLike();

//   const handleClick: EventHandler<MouseEvent> = async (e) => {
//     // since the parent node of the button is a Link, when we click on the
//     // button, the Link will also be clicked, which will cause the page to
//     // navigate to the tweet page, which is not what we want. So we stop the
//     // event propagation and prevent the default behavior of the event.
//     e.stopPropagation();
//     e.preventDefault();
//     if (!handle) return;
//     if (liked) {
//       await unlikeTweet({
//         tweetId,
//         userHandle: handle,
//       });

//       setLikesCount((prev) => prev - 1);
//       setLiked(false);
//       setParticipateButtonText("participate");
//     } else {
//       await likeTweet({
//         tweetId,
//         userHandle: handle,
//       });

//       setLikesCount((prev) => prev + 1);
//       setLiked(true);
//       setParticipateButtonText("participated");
//     }
//   };

//   return (
//     <>
//     <button
//       className={cn(
//         "flex w-16 items-center gap-1 hover:text-brand",
//         liked && "text-brand",
//       )}
//       onClick={handleClick}
//       disabled={loading}
//     >
//       <div
//         className={cn(
//           "flex items-center gap-1 rounded-full p-1.5 duration-300 hover:bg-brand/10",
//           liked && "bg-brand/10",
//         )}
//       >
//         {participateButtonText}
//       </div>
      
//     </button>
//     <p>{likesCount} participants</p>
//     </>
//   );
// }

import { useState } from 'react';
import { EventHandler, MouseEvent } from 'react';
import useLike from '@/hooks/useLike';
import { cn } from '@/lib/utils';

type onParticipateStateCallback = (participateState:boolean) => void;

type LikeButtonProps = {
  initialLikes: number;
  initialLiked?: boolean;
  tweetId: number;
  handle?: string;
  onParticipateState: onParticipateStateCallback;
};

export default function LikeButton({
  initialLikes,
  initialLiked,
  tweetId,
  handle,
  onParticipateState
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [participateButtonClass, setParticipateButtonClass] = useState(
    'flex items-center gap-1 rounded-full p-1.5 duration-300 hover:bg-brand/10'
  );
  const { likeTweet, unlikeTweet, loading } = useLike();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!handle) return;
    if (liked) {
      await unlikeTweet({
        tweetId,
        userHandle: handle,
      });

      setLikesCount((prev) => prev - 1);
      setLiked(false);
      setParticipateButtonClass('flex items-center gap-1 rounded-full p-1.5 duration-300 hover:bg-brand/10');
      onParticipateState(false);
    } else {
      await likeTweet({
        tweetId,
        userHandle: handle,
      });

      setLikesCount((prev) => prev + 1);
      setLiked(true);
      setParticipateButtonClass('flex items-center gap-1 rounded-full p-1.5 duration-300 hover:bg-brand/10 bg-brand/10');
      onParticipateState(true);
    }
  };

  return (
    <>
      <button
        className={cn('flex w-16 items-center gap-1 hover:text-brand', liked && 'text-brand')}
        onClick={handleClick}
        disabled={loading}
      >
        <div className={cn(participateButtonClass, liked && 'bg-amber-400')}>
          {liked ? 'participated' : 'participate'}
        </div>
      </button>
      <p>{likesCount} participants</p>
    </>
  );
}
