import { useAppSelector } from './hooks/redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getAnimeTheme } from './theme/animeThemes'
import { ThemeState } from './redux/slices/themeSlice'

// Import components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState
  const theme = getAnimeTheme(isDarkMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
