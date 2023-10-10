import  {useState, useRef} from 'react';

import { Paper } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import {updateCard } from "@/utils/client";

type OnCheckboxChangeCallback = (isChecked: boolean, songId: string) => void;

export type SongProps = {
    id: string;
    title: string;
    description: string;
    link: string;
    listId: string;
    editting: boolean;
    onCheckboxChange: OnCheckboxChangeCallback;
}

export default function Song({id, title, description, link, listId, editting, onCheckboxChange}:SongProps) {
  const [checked, setChecked] = useState(false);
  const [edittingTitle, setEdittingTitle] = useState(false);
  const [edittingDescription, setEdittingDescription] = useState(false);

  const inputRefTitle = useRef<HTMLInputElement>(null);
  const inputRefDescription = useRef<HTMLInputElement>(null);

  const { lists, fetchCards } = useCards();

 
  const handleCheckboxClick = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);

    // Call the callback function with the song ID and the new checked state
    onCheckboxChange(newCheckedState, id);
  };

  const handleUpdate = async () => {
    if (!inputRefTitle.current) return;
    if (!inputRefDescription.current) return;

    const newTitle = inputRefTitle.current.value;
    const newDescription = inputRefDescription.current.value;
    if (newTitle !== title) {
      try {
        await updateCard(id, {
          title: newTitle,
          description: newDescription,
          link: link,
          list_id: listId,
        });
      } catch (error) {
        alert("Error: Failed to update song name");
      }
    }

    fetchCards();

    setEdittingTitle(false);
  };

  
  
    return(
      <>
    <Paper className="flex flex-col" elevation={6}>
      
      <div className='grid grid-cols-4'>
      <Checkbox
      checked={checked}
      onClick={handleCheckboxClick}
      />

      {(edittingTitle && editting) ? (
          <ClickAwayListener onClickAway={handleUpdate}>
            <Input
              autoFocus
              defaultValue={title}
              className="grow"
              placeholder="Enter a new name for this song..."
              sx={{ fontSize: "2rem" }}
              inputRef={inputRefTitle}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingTitle(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start" variant="h4">
              {title}
            </Typography>
          </button>
        )}




        
      {(edittingDescription && editting) ? (
          <ClickAwayListener onClickAway={handleUpdate}>
            <Input
              autoFocus
              defaultValue={description}
              className="grow"
              placeholder="Enter a new singer for this song..."
              sx={{ fontSize: "2rem" }}
              inputRef={inputRefDescription}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingDescription(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start" variant="h4">
              {description}
            </Typography>
          </button>
        )}


        <div className='hover:cursor-pointer'>
          <Typography variant="h6" component="div" ml={2} onClick={() => window.open(link, '_blank')}>
            {link}
          </Typography>
        </div>
      
      
      </div>

    </Paper>
    </>
    )
}
