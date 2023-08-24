import { ToDoList } from "./Components/ToDoList";
import { ItemContextProvider } from "./context/ItemContext";

function App() {
  return (
    <ItemContextProvider>
      <ToDoList />
    </ItemContextProvider>
  );
}

export default App;
