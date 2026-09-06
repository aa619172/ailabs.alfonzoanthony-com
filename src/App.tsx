import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AivorShell } from './components/aivor/AivorShell'
import { UNDER_CONSTRUCTION } from './config'
import AboutPage from './pages/AboutPage'
import AiAgentsPage from './pages/AiAgentsPage'
import ContactPage from './pages/ContactPage'
import CvPage from './pages/CvPage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectCaseStudyPage from './pages/ProjectCaseStudyPage'
import UnderConstruction from './UnderConstruction'

export default function App() {
  if (UNDER_CONSTRUCTION) {
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <UnderConstruction />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AivorShell />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectCaseStudyPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cv" element={<CvPage />} />
          <Route path="ai-agents" element={<AiAgentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
