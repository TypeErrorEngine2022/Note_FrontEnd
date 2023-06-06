import { ChangeEvent, FormEvent, useState} from 'react';
import { ToDoItem } from "./ToDoList"

interface ToDoItemBoxProps {
    todo: ToDoItem;
    updateItemArr: (helper: (prevArr: ToDoItem[]) => ToDoItem[]) => void;
}

export function ToDoItemBox (
    {todo, updateItemArr}: ToDoItemBoxProps){
    
    const [editText, setEditText] = useState<string>(''); // edit mode
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editID, setEditID] = useState<string>('');
    
    // Display mode: to update status of item in list
    function handleToggle(id: string, isChecked: boolean) {
        updateItemArr(prevItemArr => {
            return prevItemArr.map(todo => {
                if (todo.id === id)
                    return {id: todo.id, content: todo.content, isCompleted: isChecked};
                else
                    return todo;
                })
            }
        )
    }

      // Display mode: delete item
    function handleDelete(id: string) {
        updateItemArr(prevItemArr => {
                return prevItemArr.filter(todo => todo.id != id);
            }
        )
    }

    function toggleDisplayMode(id:string, content: string) {
        setEditText(content);
        setIsEditing(!isEditing);
        setEditID(id);
    }

    // Edit mode: submit final edit to update content in item
    function handleEdit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editText != '') {
        updateItemArr((prevItemArr: ToDoItem[]) => {
                return prevItemArr.map(todo => {
                if (todo.id === editID)
                    return {id: todo.id, content: editText, 
                    isCompleted: todo.isCompleted};
                else
                    return todo;
                })
            })
        }

        setIsEditing(false);
    }

    // Edit mode: change text in editing
    function handleEditTextChange(e: ChangeEvent<HTMLInputElement>) {
        setEditText(e.target.value);
    }

    if (isEditing && todo.id === editID) { // Edit mode
        return ( 
            <div className='itemBox'>
                <form onSubmit={e => handleEdit(e)}>
                    <input 
                        className='itemInput'
                        type="text" 
                        value = {editText}
                        onChange = {e => handleEditTextChange(e)}
                    />
                    <button
                        className='btn'
                        type='submit'>
                        Done
                    </button>
                    <button 
                        className='btn dangerous'
                        onClick={() => toggleDisplayMode(todo.id, todo.content)}>
                        Cancel
                    </button>
                </form>
            </div>
            
            )
    }
    else { // Display mode
        return (
            <div className='itemBox'>
                <input 
                    className='checkBox'
                    type='checkbox'
                    checked={todo.isCompleted}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    handleToggle(todo.id, e.target.checked)}
                />
                <span className='text'>{todo.content}</span>
                <button
                    className='btn'
                    onClick={() => 
                        toggleDisplayMode(todo.id, todo.content)}>
                    Edit
                </button>
                <button 
                    className='btn dangerous' 
                    onClick={() => handleDelete(todo.id)}>
                    Delete
                </button>
            </div>
        )
    }
}