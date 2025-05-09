import { useNavigate } from 'react-router-dom';
import styles from './List.module.css';
import { useEffect, useRef, useState } from 'react';
import { getEntries } from '../utils/api';
import SmallEntry from '../components/items/SmallEntry';

const WSS_URL = `ws://localhost:8080`;

export default function List() {
    const navigate = useNavigate();
    const [updateDetected, setUpdateDetected] = useState(true);
    const [items, setItems] = useState([]);
    const ws = useRef(null as WebSocket); 

    // check if not logged in -> go to login screen
    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/login');
        }
    }, []);

    // load item list on render
    useEffect(() => {
        setItems([]); // necessary, if list length stays the same a render will not be issued
        getEntries(localStorage.getItem('TOKEN')).then((entries) => setItems(entries));
        setUpdateDetected(false);
    }, [updateDetected]);

    // create websocket to listen for events
    useEffect(() => {
        // create new socket and store in ref
        const socket = new WebSocket(WSS_URL);
        ws.current = socket;
        socket.addEventListener('message', (e) => {
            const message : { updateRequired : boolean } = JSON.parse(e.data);
            setUpdateDetected(message.updateRequired);
        });
        // cleanup
        return () => {
            socket.close();
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