import Link from "next/link";

import { MessageCircle, Repeat2, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getAvatar } from "@/lib/utils";

import LikeButton from "./LikeButton";
import TimeText from "./TimeText";

type TweetProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
  startDate: string;
  endDate: string;
  likes: number;
  createdAt: Date;
  liked?: boolean;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Tweet({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  content,
  startDate,
  endDate,
  likes,
  createdAt,
  liked,
}: TweetProps) {
  return (
    <>
      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <article className="flex grow flex-col">
            <p className="font-bold ml-5">
            {content}
              <time className="ml-2 font-normal text-gray-400">
                create time：
                <TimeText date={createdAt} format="h:mm A · D MMM YYYY" />
              </time>
            </p>
            <article className="mt-2 ml-7 whitespace-pre-wrap"></article>
            <div>
              START：
              <TimeText date={startDate} format="h:mm A · D MMM YYYY" />
            </div>
            <div>
              END：
              <TimeText date={endDate} format="h:mm A · D MMM YYYY" />
            </div>
            
          </article>
        </div>
      </Link>
      <Separator />
    </>
  );
}
