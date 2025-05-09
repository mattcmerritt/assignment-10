import { useEffect, useState } from 'react';
import styles from './SmallEntry.module.css';
import { updateEntryCompletion } from '../../utils/api';

export interface SmallEntryProps {
    id: number
    completed: boolean,
    content: string
}

export default function SmallEntry(props: SmallEntryProps) {
    const [firstLoad, setFirstLoad] = useState(true);
    const [checked, setChecked] = useState(props.completed);

    function updateCheckbox(e : any) {
        if (checked) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }
    }

    useEffect(() => {
        // necessary to prevent overwhelming backend JSON parser with requests when page loads
        if (firstLoad) {
            setFirstLoad(false);
        }
        else {
            updateEntryCompletion(localStorage.getItem('TOKEN'), props.id, checked);
        }
    }, [checked])

    return (
        <div className={styles['entry']}>
            { checked && <input type="checkbox" checked onChange={updateCheckbox}/> }
            { !checked && <input type="checkbox" onChange={updateCheckbox}/> }
            <p>{props.content}</p>
        </div>
    );
}