import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@mui/material";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from "@mui/material/Typography";
import Song from "@/components/song";
import type { SongProps } from "@/components/song";

import CardDialog from "./CardDialog";
import {deleteCard, updateCard } from "@/utils/client";

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
};

export default function PlaylistDialog({ open, songs, onClose, listId }: PlaylistDialogProps) {
  const [deleteButtonText, setDeleteButtonText] = useState("DELETE");
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [deleteButton, setDeleteButton] = useState(false);
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);

  const handleCheckboxChange = (songId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, songId]);
    } else {
      setSelectedSongs((prevSelectedSongs) =>
        prevSelectedSongs.filter((id) => id !== songId)
      );
    }
  };

  const handleDelete = async () => {
    if (selectedSongs.length === 0) {
      alert("No song is selected.");
    }

    
    try {
      await selectedSongs.map((selected) => {
        deleteCard(selected);
      })
    } catch (error) {
      alert("Error: Failed to delete card 222");
    }

    // You can use a function or API call to delete the songs here
    console.log("Deleting songs:", selectedSongs);
    // After deleting, you may want to update the songs list or state
    // to remove the deleted songs.
    setSelectedSongs([]);
    setDeleteButtonText("DELETE");
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
              <Typography variant="h4" component="div" p={6}>
                Title
              </Typography>
              <Typography variant="h6" component="div" p={6}>
                this is the description of this album.
              </Typography>
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
            onClick={() => {
              if (deleteButton) {
                setDeleteButton(false);
                setDeleteButtonText("DELETE");
              } else {
                setDeleteButton(true);
                setDeleteButtonText("DONE");
                handleDelete(); // Call the delete function when the button is clicked
              }
            }}
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



// import React, {useState} from 'react';
// import Dialog from '@mui/material/Dialog';
// import HeaderBar from "@/components/HeaderBar";
// // import songList from "@/components/songList";
// import { Button } from "@mui/material";
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';
// import Typography from "@mui/material/Typography";
// import Song  from "@/components/song"
// import type {SongProps}  from "@/components/song"

// import CardDialog from "./CardDialog";

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// type PlaylistDialogProps = {
//   open: boolean;
//   songs: SongProps[];
//   onClose: () => void;
//   listId: string;
// };

// export default function PlaylistDialog({ open, songs, onClose, listId }: PlaylistDialogProps) {
//   const [deleteButtonText, setDeleteButtonText] = useState("DELETE");
//   const [deleteButton, setDeleteButton] = useState(false);
//   const [openNewCardDialog, setOpenNewCardDialog] = useState(false);


//   return (
//     <>
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={onClose}
//         TransitionComponent={Transition}
//       >
//         <HeaderBar />
//         <div className='grid lg:grid-cols-3 md:grid-cols-2'>
//           <img className='p-6' src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljcm9waG9uZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"></img>
//           <div className='lg:col-span-2 '>
//             <div className='grid grid-rows-2'>
//               <Typography variant="h4" component="div" p={6}>
//                   Title
//                 </Typography>
//               <Typography variant="h6" component="div" p={6}>
//                 this is the description of this album.
//               </Typography>
//             </div>
//           </div>
//         </div>

//         <div className='flex justify-end p-6'>
//             <Button
//               variant="contained"
//               className="w-20 mr-2"
//               onClick={onClose}
//             >
//               BACK
//             </Button>

//             &nbsp;&nbsp;
            
//             <Button
//               variant="contained"
//               className="w-20 mr-2"
//               onClick={() => setOpenNewCardDialog(true)}
//             >
//               ADD
//             </Button>
            
//             &nbsp;&nbsp;
            
//             <Button
//               variant="contained"
//               className="w-20"
//               onClick={() => {                
//               if(deleteButton){
//                 setDeleteButton(false);
//                 setDeleteButtonText("DELETE");
//               }
//               else{
//                 setDeleteButton(true);
//                 setDeleteButtonText("DONE");
//               }}}
//             >
//               {deleteButtonText}
//             </Button>
//         </div>

//         <div className='grid grid-cols-4'>
//           <Typography variant="h6" component="div" ml={2}>
//             checkbox
//           </Typography>
//           <Typography variant="h6" component="div" ml={2} col-span={2}>
//             song
//           </Typography>
//           <Typography variant="h6" component="div" ml={2} col-span={2}>
//             singer
//           </Typography>
//           <Typography variant="h6" component="div" ml={2} col-span={2}>
//             link (click to open link)
//           </Typography>

//         </div>


//         {songs.map((songs) => (
//             <Song key={songs.id} {...songs} />
//           ))}

//       </Dialog>

//       <CardDialog
//         variant="new"
//         open={openNewCardDialog}
//         onClose={() => setOpenNewCardDialog(false)}
//         listId={listId}
//       />
//     </>
//   );
// }