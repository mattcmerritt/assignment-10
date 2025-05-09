import { useNavigate } from 'react-router-dom';
import styles from './List.module.css';
import { useEffect } from 'react';

export default function List() {
    const navigate = useNavigate();

    // check if not logged in -> go to login screen
    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/login');
        }
    }, []);

    return (
        <div className={styles['main-container']}>
            <h1>TODO Items:</h1>
            <p>Nothing yet...</p>
            <button onClick={() => navigate('/entry/0')}>Look at entry 0</button>
        </div>
    );
}