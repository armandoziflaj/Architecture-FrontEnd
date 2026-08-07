import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from "./Layout/MainLayout/MainLayout.tsx";
import { ProjectGrid } from "./Components/ProjectGrid/ProjectGrid.tsx";
import { Profile } from "./Components/Profile/Profile.tsx";
import { Contact } from "./Components/Contact/Contact.tsx";
import { ProjectPage } from "./Pages/ProjectPage/ProjectPage.tsx";
import { Login } from "./Pages/Login/Login.tsx";
import { Dashboard } from "./Pages/Admin/Dashboard/Dashboard.tsx";
import { ProjectManagement } from "./Pages/Admin/Projects/ProjectManagement.tsx";
import { Hero } from "./Components/Hero/Hero.tsx";

function App() {
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
