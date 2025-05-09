import { useNavigate, useParams } from 'react-router-dom';
import styles from './Entry.module.css';
import { useEffect } from 'react';

export default function Entry() {
    const idParam = useParams().id!
    const navigate = useNavigate();

    // check if not logged in -> go to login screen
    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/login');
        }
    }, []);

    return (
        <div className={styles['main-container']}>
            <h1>Entry (ID: { idParam }):</h1>
            <p>Nothing additional here yet...</p>
            <button onClick={() => navigate('/')}>Return to List</button>
        </div>
    );
}