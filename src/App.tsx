import { ThemeProvider, CssBaseline } from '@mui/material'
import { MotionConfig } from 'framer-motion'
import { getAnimeTheme } from './theme/animeThemes'

// Import components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const theme = getAnimeTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <div className="app-container">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
