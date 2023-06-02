import { FormEvent, useState, ChangeEvent} from 'react'
import './App.css'

interface ToDoItem{
  id: string,
  content: string,
  isCompleted: boolean
};

enum Scope {
  All = 1,
  Complete,
  Incomplete,
}

function App() {
  const [itemArr, setItemArr] = useState<ToDoItem[]>([]);
  const [text, setText] = useState<string>('');
  const [scope, setScope] = useState<Scope>(Scope.All);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value) ;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text != '') {
      setItemArr(prevItemArr => 
        [...prevItemArr,  
        {id: crypto.randomUUID(), content: text, isCompleted: false}]);
      setText('');
    }
  }

  function handleClear() {
    setItemArr([]);
    setText('');
  }

  function handleToggle(id: string, isChecked: boolean) {
    setItemArr(prevItemArr => {
      return prevItemArr.map(todo => {
        if (todo.id == id)
          return {id: todo.id, content: todo.content, isCompleted: isChecked};
        else
          return todo;
      })
    })
  }

  function handleDelete(id: string) {
    setItemArr(prevItemArr => {
      return prevItemArr.filter(todo => todo.id != id);
    })
  }

  function scopeFilter() {
    switch(scope) {
      case Scope.All:
        return itemArr;
      case Scope.Complete:
        return itemArr.filter(item => item.isCompleted == true);
      case Scope.Incomplete:
        return itemArr.filter(item => item.isCompleted == false);
      default:
        return itemArr;
    }
  }

  return (
    <>
      <h1>To Do List</h1> 
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="Add new event"
            value = {text}
            onChange = {handleChange}
        />
        <button className='btn'>Add</button>
        <button onClick={handleClear} className='btn'>
          Clear</button>
      </form>

      <br></br>

      <div>
        <button className='btn' onClick={() => setScope(Scope.All)}>All</button>
        <button className='btn' onClick={() => setScope(Scope.Complete)}>Complete</button>
        <button className='btn' onClick={() => setScope(Scope.Incomplete)}>Incomplete</button>
      </div>

      <div>
          {scopeFilter().map(todo => 
              <ul key ={todo.id}>
                <input 
                  type='checkbox'
                  checked={todo.isCompleted}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    handleToggle(todo.id, e.target.checked)}
                  />
                {todo.content}
                <button 
                  className='btn' 
                  onClick={() => handleDelete(todo.id)}>
                  Delete</button>
              </ul>)
          }
        </div>
    </>
  )
}


export default App
