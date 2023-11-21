"use client"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const SearchBar = () =>{
    const router = useRouter();
    const [text, setText] = useState('');
    const [query] = useDebounce(text, 250);

    useEffect(() =>{
        if(!query){
            router.push(`/docs`);
        }else{
            router.push(`/docs?search=${query}`);
        }
    }, [query, router]
    )


    return(
    <Input
        placeholder="search user ..."
        value={text}
        onChange={(e) => {setText(e.target.value)}}
        className="pl-10 m-2 bg-gray-300 border rounded-2xl hover:bg-gray-200"
        >
      </Input>
    )
}

export default SearchBar;