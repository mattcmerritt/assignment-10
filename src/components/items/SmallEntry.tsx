import styles from './SmallEntry.module.css';

export interface SmallEntryProps {
    id: number
    completed: boolean,
    content: string
}

export default function SmallEntry(props: SmallEntryProps) {
    return (
        <div className={styles['entry']}>
            <p>{props.content}</p>
            <p>{props.completed}</p>
        </div>
    );
}