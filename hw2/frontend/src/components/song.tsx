import React, { useState } from 'react';

import { Paper } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

type OnCheckboxChangeCallback = (isChecked: boolean, songId: string) => void;

export type SongProps = {
    id: string;
    title: string;
    description: string;
    link: string;
    onCheckboxChange: OnCheckboxChangeCallback;
}

export default function Song({id, title, description, link, onCheckboxChange}:SongProps) {
  const [checked, setChecked] = useState(false)
  
  const handleCheckboxClick = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);

    // Call the callback function with the song ID and the new checked state
    onCheckboxChange(newCheckedState, id);
  };
  
    return(
      <>
    <Paper className="flex flex-col" elevation={6}>
      
      <div className='grid grid-cols-4'>
      <Checkbox
      checked={checked}
      onClick={handleCheckboxClick}
      />
        <div className='ml-2'>{title}</div>
        <div className='ml-2'>{description}</div>
        <div className='ml-2' onClick={() => {window.open(link, '_blank');}}>{link}</div>
      </div>

    </Paper>
    </>
    )
}
