import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from "./Layout/MainLayout/MainLayout.tsx";
import { ProjectGrid } from "./Components/ProjectGrid/ProjectGrid.tsx";
import { Profile } from "./Components/Profile/Profile.tsx";
import { Contact } from "./Components/Contact/Contact.tsx";
import { ProjectPage } from "./Pages/ProjectPage.tsx";
import { useTranslation } from "react-i18next"; // 1. Πρόσθεσε το import

function App() {
    const { t } = useTranslation(); // 2. Αρχικοποίηση του hook

    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={
                        <>
                            <section style={{ maxWidth: '900px', marginTop: '6rem' }}>
                                <span style={{ color: 'var(--accent-color)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                    {t('hero.subtitle')}
                                </span>
                                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, marginTop: '1rem', letterSpacing: '-0.02em' }}>
                                    {t('hero.title')}
                                </h1>
                            </section>
                            <ProjectGrid />
                            <Profile />
                            <Contact />
                        </>
                    } />

                    <Route path="/project/:id" element={<ProjectPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;