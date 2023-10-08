import { useEffect, useState } from "react";
// import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
import Typography from "@mui/material/Typography";
// import { Visibility } from "@mui/icons-material";


function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteVisibility, setDeleteVisibility] = useState(
    new Array(lists.length).fill(0)
  ); // Array of boolean values, one for each CardList
  const [deleteButtonText, setDeleteButtonText] = useState("DELETE"); // Initial button text


  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  const toggleDeleteVisibility = () => {
    
    setDeleteVisibility((prevVisibility) =>
      prevVisibility.map((deleteVisibility) => !deleteVisibility)
    );

    console.log(deleteVisibility);

    setDeleteButtonText(deleteButtonText === "DELETE" ? "DONE" : "DELETE");
  };

  return (
    <>
      <HeaderBar />
      <main className="flex mb-4 mt-4 grid grid-row-2">

    <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Playlists
          </Typography>
          <Button
            variant="contained"
            className="w-12 mr-2"
            onClick={() => setNewListDialogOpen(true)}
          >
            ADD
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            className="w-12"
            onClick={() => toggleDeleteVisibility()}
          >
            {deleteButtonText}
          </Button>
        </div>
        
        {/* grid grid-cols-3 gap-8 */}
        <div className="m-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {lists.map((list, index) => (
            <CardList key={list.id} {...list} visibility={deleteVisibility[index]} />
          ))}
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
