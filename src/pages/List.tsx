import { useNavigate } from 'react-router-dom';
import styles from './List.module.css';
import { useEffect, useState } from 'react';
import { getEntries } from '../utils/api';
import SmallEntry from '../components/items/SmallEntry';

export default function List() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    // load item list on render
    useEffect(() => {
        getEntries(localStorage.getItem('TOKEN')).then((entries) => setItems(entries));
    }, []);

    // check if not logged in -> go to login screen
    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/login');
        }
    }, []);

    function generateTodoEntryItems() {
        return items.map(entry => {
            return (
                <SmallEntry 
                    id={entry.id}
                    completed={entry.completed}
                    content={entry.content}
                    key={`entry-${entry.id}`}
                />
            )
        })
    }

    return (
        <div className={styles['main-container']}>
            <h1>TODO Items:</h1>
            { items.length === 0 && <p id='nothing-label'>No items to complete.</p>}
            { generateTodoEntryItems() }
            <button className={styles['add-button']} onClick={() => navigate('/add')}>+ Add New Task</button>
        </div>
    );
}