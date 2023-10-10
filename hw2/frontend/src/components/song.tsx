import React from 'react';

import { Paper } from "@mui/material";

export type SongProps = {
    id: string;
    title: string;
    description: string;
    listId: string;
}

export default function Song({id, title, description, listId }:SongProps) {
    
    return(
    <Paper className="flex w-full flex-col p-2" elevation={6}>
      {title}
    </Paper>)
}
