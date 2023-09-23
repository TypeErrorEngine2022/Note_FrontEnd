import { I18nextProvider } from "react-i18next";
import { ToDoList } from "./Components/ToDoList";
import { ItemContextProvider } from "./context/ItemContext";
import i18n from "../locale/i18n";
import { Login } from "./Components/Login";
import { AuthProvider } from "./context/AuthProvider";
import { Route, Routes } from "react-router";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <ItemContextProvider>
                <ToDoList />
              </ItemContextProvider>
            </I18nextProvider>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
