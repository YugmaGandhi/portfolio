import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/redux';
import { ThemeState, toggleDarkMode } from '../redux/slices/themeSlice';

// Material UI imports
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useScrollTrigger,
  Slide,
  Container,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  useTheme,
  Tooltip,
} from '@mui/material';

// Material UI icons
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';

const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'experience', title: 'Experience' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

// Hide AppBar on scroll down
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();
  
  // State for mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Scroll to section when clicking on nav links
  const handleNavLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };
  
  // Toggle dark/light mode
  const handleToggleTheme = () => {
    dispatch(toggleDarkMode());
  };
  
  // Toggle mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            background: isDarkMode
              ? 'rgba(15, 23, 42, 0.95)'
              : 'rgba(248, 249, 250, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(124, 58, 237, 0.1)'}`,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ py: 1.5 }}>
              {/* Logo and Name */}
              <Box 
                onClick={() => window.scrollTo(0, 0)} 
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: isDarkMode ? '#a78bfa' : '#7c3aed',
                    mr: 1,
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                  }}
                >
                  YG
                </Avatar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ 
                    fontWeight: 700, 
                    display: { xs: 'none', sm: 'block' },
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                  }}
                >
                  Yugma Gandhi
                </Typography>
              </Box>

              {/* Spacer */}
              <Box sx={{ flexGrow: 1 }} />

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.id}
                    color="inherit"
                    onClick={() => handleNavLinkClick(link.id)}
                    sx={{
                      px: 2,
                      py: 1,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: isDarkMode ? '#cbd5e1' : '#334155',
                      transition: 'all 0.3s ease',
                      borderRadius: '6px',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                        color: isDarkMode ? '#a78bfa' : '#7c3aed',
                      },
                    }}
                  >
                    {link.title}
                  </Button>
                ))}

                {/* Dark Mode Toggle */}
                <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                  <IconButton
                    color="inherit"
                    onClick={handleToggleTheme}
                    sx={{
                      ml: 2,
                      color: isDarkMode ? '#cbd5e1' : '#334155',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: isDarkMode ? '#a78bfa' : '#7c3aed',
                        transform: 'rotate(20deg) scale(1.1)',
                      },
                    }}
                  >
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  ml: 1, 
                  display: { md: 'none' },
                  color: isDarkMode ? '#cbd5e1' : '#334155',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 240,
            backgroundColor: muiTheme.palette.background.default,
            color: muiTheme.palette.text.primary,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.id} disablePadding>
              <ListItemButton onClick={() => handleNavLinkClick(link.id)}>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleToggleTheme}>
              <ListItemText primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
              {isDarkMode ? <Brightness7Icon sx={{ ml: 1 }} /> : <Brightness4Icon sx={{ ml: 1 }} />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Toolbar placeholder to push content below AppBar */}
      {/* <Toolbar /> */}
    </>
  );
};

export default Navbar; 
