"use client"
import React, { useState, useEffect } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      // Display the dialog
      timeoutId = setTimeout(() => {
        // Close the dialog after 3 seconds
        onClose();
      }, 3000);
    }

    // Cleanup the timeout if the component is unmounted or dialog is closed manually
    return () => clearTimeout(timeoutId);
  }, [isOpen, onClose]);

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <p>This is your dialog content!</p>
    </div>
  );
};

const App: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <h1>ERROR: please enter existed user</h1>
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};

export default App;
