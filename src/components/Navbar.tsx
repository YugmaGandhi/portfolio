import { useEffect, useState } from 'react';

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
  Tooltip,
} from '@mui/material';

// Material UI icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { colors, fonts, pixelShadow } from '../theme/tokens';
import { site, navLinks, scrollToSection } from '../data/site';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavLinkClick = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

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
            background: 'rgba(8, 11, 22, 0.88)',
            color: colors.text,
            borderBottom: `3px solid ${colors.border}`,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 4px 0 ${colors.shadow}`,
            '&::after': { display: 'none' },
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 } }}>
              {/* Logo and Name */}
              <Box
                onClick={() => window.scrollTo(0, 0)}
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}
              >
                <Avatar
                  sx={{
                    bgcolor: colors.cyan,
                    color: colors.shadow,
                    mr: 1.25,
                    width: 42,
                    height: 42,
                    fontWeight: 800,
                    borderRadius: 0,
                    border: `2px solid ${colors.text}`,
                    boxShadow: pixelShadow(4),
                  }}
                >
                  {site.initials}
                </Avatar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 800, display: { xs: 'none', sm: 'block' }, letterSpacing: 0, textTransform: 'uppercase' }}
                >
                  {site.name}
                </Typography>
              </Box>

              {/* Spacer */}
              <Box sx={{ flexGrow: 1 }} />

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.id}
                    color="inherit"
                    onClick={() => handleNavLinkClick(link.id)}
                    sx={{
                      px: 1.5,
                      color: activeSection === link.id ? colors.shadow : colors.muted,
                      border: '1px solid',
                      borderColor: activeSection === link.id ? colors.yellow : 'transparent',
                      borderRadius: 0,
                      backgroundColor: activeSection === link.id ? colors.yellow : 'transparent',
                      '&:hover': {
                        color: activeSection === link.id ? colors.shadow : colors.yellow,
                        borderColor: colors.yellow,
                        backgroundColor: activeSection === link.id ? colors.yellow : 'rgba(255, 204, 0, 0.08)',
                      },
                    }}
                  >
                    {link.title}
                  </Button>
                ))}

                <Tooltip title="Arcade theme locked">
                  <Box
                    sx={{
                      ml: 1,
                      px: 1.25,
                      py: 0.75,
                      borderRadius: 0,
                      border: `1px solid ${colors.border}`,
                      backgroundColor: 'rgba(0, 229, 255, 0.08)',
                      color: colors.cyan,
                      boxShadow: pixelShadow(3),
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    ARCADE MODE
                  </Box>
                </Tooltip>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 1, display: { md: 'none' } }}
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
            width: 260,
            backgroundColor: colors.bg,
            color: colors.text,
            borderLeft: `3px solid ${colors.border}`,
            backgroundImage:
              'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography
            sx={{
              fontFamily: fonts.pixel,
              fontSize: '0.7rem',
              color: colors.yellow,
              textTransform: 'uppercase',
            }}
          >
            Pause Menu
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            aria-label="close menu"
            sx={{
              borderRadius: 0,
              border: `2px solid ${colors.border}`,
              boxShadow: pixelShadow(3),
              '&:hover': { borderColor: colors.yellow, color: colors.yellow },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: colors.border }} />
        <List sx={{ px: 2, py: 2.5, display: 'grid', gap: 1.25 }}>
          {navLinks.map((link) => (
            <ListItem key={link.id} disablePadding>
              <ListItemButton
                onClick={() => handleNavLinkClick(link.id)}
                sx={{
                  border: '2px solid',
                  borderColor: activeSection === link.id ? colors.yellow : colors.border,
                  backgroundColor: activeSection === link.id ? colors.yellow : 'rgba(16, 22, 41, 0.92)',
                  boxShadow: pixelShadow(4),
                  '&:hover': {
                    backgroundColor: activeSection === link.id ? colors.yellow : 'rgba(255, 204, 0, 0.08)',
                    borderColor: colors.yellow,
                  },
                }}
              >
                <ListItemText
                  primary={activeSection === link.id ? `▸ ${link.title}` : link.title}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: fonts.pixel,
                      fontSize: '0.65rem',
                      lineHeight: 1.8,
                      textTransform: 'uppercase',
                      color: activeSection === link.id ? colors.shadow : colors.text,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: colors.border }} />
        <Box
          sx={{
            m: 2,
            p: 1.5,
            color: colors.cyan,
            fontFamily: fonts.pixel,
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            border: `1px solid ${colors.border}`,
            backgroundColor: 'rgba(0, 229, 255, 0.08)',
            boxShadow: pixelShadow(3),
          }}
        >
          Arcade Mode
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
