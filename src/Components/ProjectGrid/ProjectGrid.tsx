import styles from './ProjectGrid.module.css';

export const ProjectGrid = () => {
    const dummyProjects = [
        { id: 1, title: 'Brutalist Monolith', location: 'Athens, GR' },
        { id: 2, title: 'Minimalist Pavillion', location: 'Milan, IT' },
        { id: 3, title: 'Raw Concrete Studio', location: 'Berlin, DE' },
        { id: 4, title: 'Glass Oasis House', location: 'Kyoto, JP' },
        { id: 5, title: 'Timber Frame Extension', location: 'Oslo, NO' },
        { id: 6, title: 'Stone Courtyard Villa', location: 'Crete, GR' },
    ];

    return (
        <section className={styles.section} id="works">
            <div className={styles.gridHeader}>
                <h2 className={styles.title}>Selected Works</h2>
                <span className={styles.count}>01 — {String(dummyProjects.length).padStart(2, '0')}</span>
            </div>

            <div className={styles.grid}>
                {dummyProjects.map((project) => (
                    <div key={project.id} className={styles.card}>
                        <div className={styles.imagePlaceholder}>
                            <div className={styles.overlay}>
                                <span>View Project ↗</span>
                            </div>
                        </div>

                        <div className={styles.meta}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectLocation}>{project.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};