import {MainLayout} from "./Layout/MainLayout/MainLayout.tsx";
import {ProjectGrid} from "./Components/ProjectGrid/ProjectGrid.tsx";
import {Profile} from "./Components/Profile/Profile.tsx";
import {Contact} from "./Components/Contact/Contact.tsx";

function App() {
  return (
      <MainLayout>
        <section style={{ maxWidth: '900px', marginTop: '6rem' }}>
        <span style={{ color: 'var(--accent-color)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Form & Space
        </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, marginTop: '1rem', letterSpacing: '-0.02em' }}>
            We design spaces that filter light, form, and raw texture.
          </h1>
        </section>
          <ProjectGrid />
          <Profile />
          <Contact />
      </MainLayout>
  );
}

export default App;