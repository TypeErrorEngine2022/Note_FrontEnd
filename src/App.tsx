import { I18nextProvider } from "react-i18next";
import { ToDoList } from "./Components/ToDoList";
import { ItemContextProvider } from "./context/ItemContext";
import i18n from "../locale/i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ItemContextProvider>
        <ToDoList />
      </ItemContextProvider>
    </I18nextProvider>
  );
}

export default App;
