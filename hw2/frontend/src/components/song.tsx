import React, { useState } from 'react';

import { Paper } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

export type SongProps = {
    id: string;
    title: string;
    description: string;
    link: string;
}

export default function Song({id, title, description, link}:SongProps) {
  const [checked, setChecked] = useState(false)
    
    return(
      <>
    <Paper className="flex flex-col" elevation={6}>
      
      <div className='grid grid-cols-4'>
      <Checkbox
      checked={checked}
      />
        <div className='ml-2'>{title}</div>
        <div className='ml-2'>{description}</div>
        <div className='ml-2' onClick={() => {window.open(link, '_blank');}}>{link}</div>
      </div>

    </Paper>
    </>
    )
}
