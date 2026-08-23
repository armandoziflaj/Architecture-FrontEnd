import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "./Layout/MainLayout/MainLayout.tsx";
import { ProjectGrid } from "./Components/ProjectGrid/ProjectGrid.tsx";
import { Profile } from "./Components/Profile/Profile.tsx";
import { Contact } from "./Components/Contact/Contact.tsx";
import { ProjectPage } from "./Pages/ProjectPage/ProjectPage.tsx";
import { Login } from "./Pages/Login/Login.tsx";
import { Dashboard } from "./Pages/Admin/Dashboard/Dashboard.tsx";
import { ProjectManagement } from "./Pages/Admin/Projects/ProjectManagement.tsx";
import { Hero } from "./Components/Hero/Hero.tsx";
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <ProjectGrid />
                            <Profile />
                            <Contact />
                        </>
                    } />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/admin/projects" element={<ProjectManagement />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/project/:id" element={<ProjectPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
