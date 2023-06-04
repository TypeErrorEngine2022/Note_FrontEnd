import { Scope } from './ToDoList'


interface ToDoFilterProps {
    sc: Scope
    updateScope: (sc: Scope) => void
}

export function ToDoFilter ({sc, updateScope} : ToDoFilterProps){
    return (
        <div>
            <button 
            className={sc == Scope.All? "btn activefilter": "btn"} 
            onClick={() => updateScope(Scope.All)}>
            All
            </button>
            <button 
            className={sc == Scope.Complete? "btn activefilter": "btn"} 
            onClick={() => updateScope(Scope.Complete)}>
            Complete
            </button>
            <button 
            className={sc == Scope.Incomplete? "btn activefilter": "btn"} 
            onClick={() => updateScope(Scope.Incomplete)}>
            Incomplete
            </button>
      </div>
    )
}