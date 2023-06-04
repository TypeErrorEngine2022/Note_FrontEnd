import { ChangeEvent, FormEvent, useState } from "react";
import { ToDoItem } from "./ToDoList";

interface ToDoFormProps {
    validateText: (curText: string | null) => boolean;
    updateItemArr: (helper: (prevArr: ToDoItem[]) => ToDoItem[]) => void;
}

export function ToDoForm (
    {updateItemArr, validateText}: ToDoFormProps){
    const [text, setText] = useState<string>(''); // display mode
    
    // handle text change in create
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (!validateText(e.target.value)) return
        setText(e.target.value);
    }

    // submit form to add new item
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (text != '') {
            updateItemArr((prevItemArr: ToDoItem[])=> 
            [...prevItemArr,  
            {id: crypto.randomUUID(), content: text, isCompleted: false}]);
        setText('');
        }
    }

    // Display mode: delete all items, regardless of status
    function handleClear() {
        updateItemArr(() => []);
        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
        <input 
            className='itemInput'
            type="text" 
            placeholder="Add new event (word limit is 25)"
            value = {text}
            onChange = {handleChange}
        />
        <button 
          className='btn'
          type='submit'>
          Add
        </button>
        <button onClick={handleClear} className='btn dangerous'>
          Clear</button>
      </form>
    )
}