import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useState } from 'react';
import { login } from '../utils/api';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // check if already logged in -> go to main screen
    if (localStorage.getItem('TOKEN')) {
        navigate('/');
    }

    async function submitForm(e : any) {
        e.preventDefault();
        setErrorMessage('');
        if (!username) {
            setErrorMessage('Please enter a username!');
            return;
        }
        if (!password) {
            setErrorMessage('Please enter a password!');
            return;
        }
        try {
            const token = await login(username, password);
            localStorage.setItem('TOKEN', token);
            window.dispatchEvent(new Event("storage"));
            navigate('/');
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setErrorMessage('Incorrect login credentials.');
                    return;
                }
            }
            setErrorMessage('Unable to login at this time. Please try again later.');
        }
    }

    return (
        <div className={styles['main-container']}>
            <h1>Login:</h1>
            <form onSubmit={submitForm}>
                <div className={styles['field-container']}>
                    <p className={styles['field-label']}>Username:</p>
                    <input type="text" value={username} className={styles['field-input']} onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className={styles['field-container']}>
                    <p className={styles['field-label']}>Password:</p>
                    <input type="password" value={password} className={styles['field-input']} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button className={styles['button']} type='submit'>Submit</button>
                <p className={styles['error-message']}>{errorMessage}</p>
            </form>
        </div>
    );
}