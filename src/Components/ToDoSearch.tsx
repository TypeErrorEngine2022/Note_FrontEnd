import { FormEvent, useRef } from "react"

interface ToDoSearchProps {
    isSearching: boolean;
    updateSarchTarget: (helper: () => string) => void;
    updateIsSearching: (helper: () => boolean) => void
} 

export function ToDoSearch({isSearching, updateSarchTarget, updateIsSearching}: ToDoSearchProps) {
    const searchRef = useRef<HTMLInputElement>(null);
    
    function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = searchRef.current?.value;
        if (target) {
            updateSarchTarget(() => target);
            updateIsSearching(() => true);
        }
    }

    return (
        <div>
            <form onSubmit={e => handleSearchSubmit(e)}>
                <input
                    type='text'
                    placeholder="Search"
                    ref={searchRef}/>
                {!isSearching &&
                    <button
                        className="btn"
                        type='submit'>
                        Search
                    </button>
                }   
                {isSearching &&
                    <button
                        className="btn"
                        onClick={() => {
                                updateIsSearching(() => false); 
                                updateSarchTarget(() => '')
                            }}>
                        Finish
                    </button>
                }
            </form>
        </div>
    )
}