import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@mui/material";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from "@mui/material/Typography";
import Song from "@/components/song";
import type { SongProps } from "@/components/song";

import CardDialog from "./CardDialog";
import {deleteCard , updateList  } from "@/utils/client";
import useCards from "@/hooks/useCards";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PlaylistDialogProps = {
  open: boolean;
  songs: SongProps[];
  onClose: () => void;
  listId: string;
  title: string;
  description: string;
};

export default function PlaylistDialog({ open, songs, onClose, listId, title, description}: PlaylistDialogProps) {
  const [deleteButtonText, setDeleteButtonText] = useState("DELETE");
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [edittingTitle, setEdittingTitle] = useState(false);
  const [edittingDescription, setEdittingDescription] = useState(false);

  const { fetchLists } = useCards();
  const { lists, fetchCards } = useCards();

  const inputRefTitle = useRef<HTMLInputElement>(null);
  const inputRefDescription = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (songId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, songId]);
    } else {
      setSelectedSongs((prevSelectedSongs) =>
        prevSelectedSongs.filter((id) => id !== songId)
      );
    }
  };

  const handleUpdateName = async () => {
    if (!inputRefTitle.current) return;

    const newTitle = inputRefTitle.current.value;
    if (newTitle !== title) {
      try {
        await updateList(listId, { name: newTitle });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingTitle(false);
  };

  const handleUpdateDescription = async () => {
    if (!inputRefDescription.current) return;

    const newDescription = inputRefDescription.current.value;
    if (newDescription !== description) {
      try {
        await updateList(listId, { description: newDescription });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list Description");
      }
    }
    setEdittingDescription(false);
  };

  const handleDelete = async () => {
    if (selectedSongs.length === 0) {
      alert("No song is selected.");
    }

    else try {
      await selectedSongs.map((selected) => {
        deleteCard(selected);
        fetchCards();
      })
    } catch (error) {
      alert("Error: Failed to delete card");
    }

    // You can use a function or API call to delete the songs here
    console.log("Deleting songs:", selectedSongs);
    // After deleting, you may want to update the songs list or state
    // to remove the deleted songs.
    setSelectedSongs([]);
  };


  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <HeaderBar />
        <div className='grid lg:grid-cols-3 md:grid-cols-2'>
          <img className='p-6' src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljcm9waG9uZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"></img>
          <div className='lg:col-span-2 '>
            <div className='grid grid-rows-2'>
              {edittingTitle ? (
                <ClickAwayListener onClickAway={handleUpdateName}>
                  <Input
                    autoFocus
                    defaultValue={title}
                    className="grow"
                    placeholder="Enter a new name for this list..."
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


              {edittingDescription ? (
                <ClickAwayListener onClickAway={handleUpdateDescription}>
                  <Input
                    autoFocus
                    defaultValue={description}
                    className="grow"
                    placeholder="Enter a new description for this list..."
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
            </div>
          </div>
        </div>

        <div className='flex justify-end p-6'>
          <Button
            variant="contained"
            className="w-20 mr-2"
            onClick={onClose}
          >
            BACK
          </Button>

          &nbsp;&nbsp;

          <Button
            variant="contained"
            className="w-20 mr-2"
            onClick={() => setOpenNewCardDialog(true)}
          >
            ADD
          </Button>

          &nbsp;&nbsp;

          <Button
            variant="contained"
            className="w-20"
            onClick={() => handleDelete()}
          >
            {deleteButtonText}
          </Button>
        </div>

        <div className='grid grid-cols-4'>
          <Typography variant="h6" component="div" ml={2}>
            checkbox
          </Typography>
          <Typography variant="h6" component="div" ml={2} col-span={2}>
            song
          </Typography>
          <Typography variant="h6" component="div" ml={2} col-span={2}>
            singer
          </Typography>
          <Typography variant="h6" component="div" ml={2} col-span={2}>
            link (click to open link)
                    </Typography>
        </div>

        {songs.map((song) => (
          <Song
            key={song.id}
            {...song}
            onCheckboxChange={(isChecked:boolean) => handleCheckboxChange(song.id, isChecked)}
          />
        ))}
      </Dialog>

      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={listId}
      />
    </>
  );
}