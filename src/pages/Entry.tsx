import { useNavigate, useParams } from 'react-router-dom';
import styles from './Entry.module.css';

export default function Entry() {
    const idParam = useParams().id!
    const navigate = useNavigate();

    return (
        <div className={styles['main-container']}>
            <h1>Entry (ID: { idParam }):</h1>
            <p>Nothing additional here yet...</p>
            <button onClick={() => navigate('/')}>Return to List</button>
        </div>
    );
}