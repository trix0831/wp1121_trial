import { useEffect, useState } from "react";
// import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
// import { Visibility } from "@mui/icons-material";


function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteVisibility, setDeleteVisibility] = useState(
    new Array(lists.length).fill(false)
  ); // Array of boolean values, one for each CardList


  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  const toggleDeleteVisibility = () => {
    setDeleteVisibility((prevVisibility) =>
      prevVisibility.map((deleteVisibility) => !deleteVisibility)
    );
  };

  return (
    <>
      <HeaderBar />
      <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
        {lists.map((list, index) => (
          <CardList key={list.id} {...list} visibility={deleteVisibility[index]} />
        ))}
        <div>
          <Button
            variant="contained"
            className="w-40"
            onClick={() => setNewListDialogOpen(true)}
          >
            ADD
          </Button>
          
          &nbsp;&nbsp;&nbsp;

          <Button
            variant="contained"
            className="w-40"
            onClick={() => toggleDeleteVisibility()}
          >
              DELETE
          </Button>
        </div>
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        />
      </main>
    </>
  );
}

export default App;
