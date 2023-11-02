"use client";

import { useRef, useState } from "react";
import GrowingTextarea from "@/components/GrowingTextarea";
import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

export default function TweetInput() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [startDate, setStartDate] = useState(""); // State for Start Date
  const [endDate, setEndDate] = useState("");     // State for End Date
  const { postTweet, loading } = useTweet();
  const [addEvent, setAddEvent] = useState(false);
  const [addButtonText, setAddButtonText] = useState("add event");

  const handleTweet = async () => {
    const content = textareaRef.current?.value;

    if (!content) return;
    if (!handle) return;
    if (!startDate) return;
    if (!endDate) return;

    try {
      await postTweet({
        handle,
        content,
        startDate, // Pass the start date and time to the postTweet function
        endDate,   // Pass the end date and time to the postTweet function
      });
      
      textareaRef.current.value = "";
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      
      // Reset the date input values after posting
      setStartDate("");
      setEndDate("");
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
  }

  const handleAddEvent = () => {
    if (addButtonText === "add event") {
      setAddButtonText("finish/cancel");
    } else {
      setAddButtonText("add event");
    }
    setAddEvent(!addEvent);
  }

  // Event handler to update the Start Date value
  const handleStartDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  }

  // Event handler to update the End Date value
  const handleEndDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  }

  return (
    <>
      <button
        className={cn(
          "m-1 mb-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
          "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
        )}
        onClick={handleAddEvent}
      >
        {addButtonText}
      </button>

      {addEvent && (
        <div className="flex gap-4 mt-3" onClick={() => textareaRef.current?.focus()}>
          <UserAvatar className="h-12 w-12" />
          <div className="flex w-full flex-col px-2">
            <div className="mb-2 mt-6">
              <GrowingTextarea
                ref={textareaRef}
                className="bg-transparent outline-none placeholder:text-gray-500"
                placeholder="Enter the event name"
              />
            </div>
            <Separator />
            <p>Start time (press the small icon on the right to edit):</p>
            <input
              type="date"
              className="bg-transparent outline-none placeholder:text-gray-500 mb-2"
              placeholder="Start Date"
              value={startDate}  // Bind the value to startDateTime
              onChange={handleStartDateTimeChange}  // Handle change event
            />
            <Separator />
            <p>End time:</p>
            <input
              type="date"
              className="bg-transparent outline-none placeholder:text-gray-500"
              placeholder="End Date"
              value={endDate}  // Bind the value to endDateTime
              onChange={handleEndDateTimeChange}  // Handle change event
            />
            <Separator />
            <div className="flex justify-end">
              <button
                className={cn(
                  "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
                  "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
                )}
                onClick={handleTweet}
                disabled={loading}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
