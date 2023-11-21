'use client'

import { Input } from "@/components/ui/input";
import { KeyboardEventHandler } from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SubInput = () => {
    const [value, setValue] = useState('');
    const router = useRouter();

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            setTimeout(() => {
                router.refresh();
                setValue('');
            }, 300);
        }
    };

    return (
        <>
            <Input
                id="messageInput"
                className="bg-gray-300 border rounded-2xl hover:bg-gray-200 w-full"
                placeholder="please enter your message here"
                name="messageInput"
                onChange={(e) => {setValue(e.currentTarget.value)}}
                onKeyDown={
                    handleKeyDown
                }
                value={value}
            />
        </>
    );

}

export default SubInput;