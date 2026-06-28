import styles from './Profile.module.css';

export const Profile = () => {
    const expertise = ['Residential Architecture', 'Commercial Concepts', 'Interior Design', 'Sustainable Systems'];
    const recognition = ['A+ Awards 2025 — Winner', 'Mies van der Rohe Nominee', 'Architectural Digest — Featured'];

    return (
        <section className={styles.section} id="profile">
            {/* 1. Manifesto / Core Statement */}
            <div className={styles.manifestoBlock}>
                <span className={styles.subtitle}>Our Philosophy</span>
                <h2 className={styles.manifestoText}>
                    We believe that architecture is the silent backdrop to human life. Our practice strips away the unnecessary to reveal raw material honesty, natural light integration, and spatial clarity.
                </h2>
            </div>

            {/* 2. Two-Column Detail Layout */}
            <div className={styles.detailsGrid}>
                {/* Left Column: Expertise */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Expertise</h3>
                    <ul className={styles.list}>
                        {expertise.map((item, index) => (
                            <li key={index} className={styles.listItem}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Right Column: Awards/Recognition */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Recognition</h3>
                    <ul className={styles.list}>
                        {recognition.map((item, index) => (
                            <li key={index} className={styles.listItem}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};