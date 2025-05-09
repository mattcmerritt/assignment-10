import { useNavigate } from 'react-router-dom';
import styles from './List.module.css';

export default function List() {
    const navigate = useNavigate();

    return (
        <div className={styles['main-container']}>
            <h1>TODO Items:</h1>
            <p>Nothing yet...</p>
            <button onClick={() => navigate('/entry/0')}>Look at entry 0</button>
        </div>
    );
}