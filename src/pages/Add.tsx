import { useNavigate } from 'react-router-dom';
import styles from './Add.module.css';
import { useEffect, useState } from 'react';
import { addNewEntry } from '../utils/api';
import axios from 'axios';

export default function Add() {
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // check if not logged in -> go to login screen
    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/login');
        }
    }, []);

    async function submitForm(e : any) {
        e.preventDefault();
        setErrorMessage('');
        if (!content) {
            setErrorMessage('Please enter a description.');
            return;
        }
        try {
            await addNewEntry(localStorage.getItem('TOKEN'), content);
            navigate('/');
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setErrorMessage('Invalid login. Try logging out and in again.');
                    return;
                }
                if (err.response?.status === 400) {
                    setErrorMessage('Invalid content. Please try a different description.');
                    return;
                }
                setErrorMessage('Unable to add item at this time. Please try again later.');
            }
        }
    }

    return (
        <div className={styles['main-container']}>
            <h1>Add New Task:</h1>
            <form className={styles['form-container']} onSubmit={submitForm}>
                <div className={styles['field-container']}>
                    <p className={styles['field-label']}>Task Description:</p>
                    <input type="text" value={content} className={styles['field-area']} onChange={(e) => { setContent(e.target.value) }} />
                </div>
                <button className={styles['button']} type='submit'>Submit</button>
                <p className={styles['error-message']}>{errorMessage}</p>
            </form>
        </div>
    );
}