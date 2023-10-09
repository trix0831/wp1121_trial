import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import HeaderBar from "@/components/HeaderBar";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

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
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <HeaderBar />
        <h1>hello</h1>
      </Dialog>
    </div>
  );
}