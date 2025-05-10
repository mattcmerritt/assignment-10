import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/api';
import { User } from '../../utils/types';
import styles from './NavBar.module.css';

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    async function loadUser() {
        const user = await getUser(localStorage.getItem('TOKEN'));
        setUser(user);
    }

    window.addEventListener('storage', () => {
        if (localStorage.getItem('TOKEN')) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    })

    function returnToLogin() {
        if (localStorage.getItem('TOKEN')) {
            localStorage.removeItem('TOKEN');
            window.dispatchEvent(new Event("storage"));
        }
        setUser(null);
        navigate('/login');
    }

    function returnToHome() {
        if (localStorage.getItem('TOKEN')) {
            navigate('/');
        }
    }

    function logout() {
        returnToLogin();
    }

    useEffect(() => {
        if (isLoggedIn) {
            loadUser()
        }
        else {
            setUser(null)
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (localStorage.getItem('TOKEN')) {
            loadUser();
        }
        else {
            returnToLogin();
        }
    }, []);

    return (
        <div className={styles['navbar']}>
            <button className={`${styles['button']} ${styles['icon']}`} onClick={returnToHome}>Task Tracker 📝</button>
            { user !== null && <button className={`${styles['button']} ${styles['text-button']}`} onClick={logout}>Logout</button> }
        </div>
    );
}