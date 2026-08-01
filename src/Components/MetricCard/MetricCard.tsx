import styles from './MetricCard.module.css';
import type {MetricCardProps} from "../../Types/MetricCardProps.ts";

export const MetricCard = ({ id, label, value }: MetricCardProps) => {
    return (
        <div className={styles.card}>
            <span className={styles.num}>{id}</span>
            <div className={styles.content}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
            </div>
        </div>
    );
};