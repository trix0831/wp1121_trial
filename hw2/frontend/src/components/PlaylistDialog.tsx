import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import HeaderBar from "@/components/HeaderBar";
// import songList from "@/components/songList";
import { Button } from "@mui/material";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from "@mui/material/Typography";



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
  onClose: () => void;
};

export default function PlaylistDialog({ open, onClose }: PlaylistDialogProps) {
  const [deleteButtonText, setDeleteButtonText] = useState("DELETE");
  const [deleteButton, setDeleteButton] = useState(false);


  return (
    <div>
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
              onClick={() => {alert("clicked")}}
            >
              ADD
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              className="w-20"
              onClick={() => {                
              if(deleteButton){
                setDeleteButton(false);
                setDeleteButtonText("DELETE");
              }
              else{
                setDeleteButton(true);
                setDeleteButtonText("DONE");
              }}}
            >
              {deleteButtonText}
            </Button>
        </div>

        <h1>hello</h1>
{/* 
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
          {true && <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            <AddIcon className="mr-2" />
            Add a song
          </Button>}
        </div> */}



      </Dialog>
    </div>
  );
}