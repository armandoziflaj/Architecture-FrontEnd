import styles from './Contact.module.css';

export const Contact = () => {
    return (
        <section className={styles.section} id="contact">
            <div className={styles.headerBlock}>
                <span className={styles.subtitle}>Inquiries</span>
                <h2 className={styles.title}>Let's build something meaningful.</h2>
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.infoColumn}>
                    <div className={styles.infoGroup}>
                        <h4>General / Press</h4>
                        <p><a href="mailto:hello@studio.com" className={styles.link}>hello@studio.com</a></p>
                        <p>+30 210 000 0000</p>
                    </div>

                    <div className={styles.infoGroup}>
                        <h4>Address</h4>
                        <p>12 Clean Lines Ave.</p>
                        <p>Athens, 105 57</p>
                    </div>
                </div>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" required placeholder="John Doe" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required placeholder="john@example.com" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="message">Project Brief</label>
                        <textarea id="message" rows={4} required placeholder="Tell us about your space..." />
                    </div>

                    <button type="submit" className={styles.submitBtn}>Send Inquiry</button>
                </form>
            </div>
        </section>
    );
};