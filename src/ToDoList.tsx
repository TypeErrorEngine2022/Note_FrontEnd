import './ToDoList.css'
import { useCallback, useState } from 'react'
import { ToDoItemBox } from './ToDoItemBox';
import { ToDoForm } from './ToDoForm'
import { ToDoFilter } from './ToDoFilter';

export interface ToDoItem{
    id: string,
    content: string,
    isCompleted: boolean
};

export enum Scope {
    All = 1,
    Complete,
    Incomplete,
}

export function ToDoList() {
    const [itemArr, setItemArr] = useState<ToDoItem[]>([]);  
    const [scope, setScope] = useState<Scope>(Scope.All);
    const wordLimit: number = 25;

    function validateText(curText: string | null) {
        if (curText === null)
          return false;
        if (curText.length > wordLimit) {
          const hint: string = `word limit is ${wordLimit}`;
          alert(hint);
          return false;
        }
    
        return true
    }  
    
    function updateItemArr(helper: (prevArr: ToDoItem[]) => ToDoItem[]) {
        setItemArr(helper(itemArr));
    }

    function updateScope(sc: Scope) {
        setScope(sc);
    }
    
    // Display mode: return items arr with corresponding status
    function scopeFilter() {
        switch(scope) {
          case Scope.All:
              return itemArr;
          case Scope.Complete:
              return itemArr.filter(item => item.isCompleted === true);
          case Scope.Incomplete:
              return itemArr.filter(item => item.isCompleted === false);
          default:
              return itemArr;
        }
    }

    const scopeFilterMemo = useCallback(scopeFilter, [itemArr, scope])

    return (
        <>
          <h1>To Do List</h1> 
    
          <ToDoForm 
            validateText={validateText}
            updateItemArr={updateItemArr}/>
    
          <br></br>
    
          <ToDoFilter 
            sc={scope}
            updateScope={updateScope}/>

          <>
              {scopeFilterMemo().map(todos =>  
                  <ul key ={todos.id}>
                    <ToDoItemBox 
                      validateText={validateText}
                      todo= {todos} 
                      updateItemArr={updateItemArr}
                    />
                  </ul>)
              }
          </>
        </>
      )
}