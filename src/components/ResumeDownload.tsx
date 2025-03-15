import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  useTheme,
  Tooltip,
  IconButton,
  Zoom,
  Alert,
  Snackbar,
} from '@mui/material';
import { Download, Description } from '@mui/icons-material';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';
import { motion } from 'framer-motion';

const ResumeDownload = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();
  const [open, setOpen] = useState(false);
  const [visitorType, setVisitorType] = useState<'hr' | 'technical' | ''>('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('info');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVisitorType('');
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleDownload = async () => {
    if (!visitorType) return;
    
    try {
      setLoading(true);
      
      // Approach 1: Use URL constructor for absolute path with origin
      const baseUrl = window.location.origin;
      const htmlPath = `${baseUrl}/assets/resumes/${visitorType}-resume.html`;
      
      console.log(`Opening resume at: ${htmlPath}`);
      
      // More direct approach - open the HTML file without checking first
      try {
        // Create a link element and click it (more reliable than window.open in some browsers)
        const link = document.createElement('a');
        link.href = htmlPath;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
        
        handleClose();
        showSnackbar('Resume opened in new tab', 'success');
      } catch (error) {
        console.error('Error opening resume:', error);
        showSnackbar('Error opening resume. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error in download process:', error);
      showSnackbar('Error processing request. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <Tooltip 
          title="Download Resume" 
          placement="left"
          TransitionComponent={Zoom}
        >
          <IconButton
            onClick={handleClickOpen}
            sx={{
              width: 56,
              height: 56,
              backgroundColor: muiTheme.palette.primary.main,
              color: '#fff',
              boxShadow: isDarkMode
                ? '0 0 20px rgba(100, 181, 246, 0.4)'
                : '0 0 20px rgba(144, 202, 249, 0.4)',
              '&:hover': {
                backgroundColor: muiTheme.palette.primary.dark,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s',
              },
              '&:hover::before': {
                opacity: 1,
              },
            }}
          >
            <Description />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: isDarkMode
              ? 'rgba(100, 181, 246, 0.2)'
              : 'rgba(144, 202, 249, 0.2)',
            boxShadow: isDarkMode
              ? '0 0 20px rgba(100, 181, 246, 0.2)'
              : '0 0 20px rgba(144, 202, 249, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 70%)',
              zIndex: 0,
            },
          },
        }}
      >
        <DialogTitle sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Download Resume
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please select your role to download the most relevant version of my resume:
          </Typography>
          <FormControl>
            <RadioGroup
              value={visitorType}
              onChange={(e) => setVisitorType(e.target.value as 'hr' | 'technical')}
            >
              <FormControlLabel 
                value="hr" 
                control={
                  <Radio 
                    sx={{
                      color: muiTheme.palette.primary.main,
                      '&.Mui-checked': {
                        color: muiTheme.palette.primary.main,
                      },
                    }}
                  />
                } 
                label={
                  <Typography variant="body1">
                    HR Professional
                    <Typography variant="caption" color="text.secondary" display="block">
                      ATS-friendly resume with focus on achievements and soft skills
                    </Typography>
                  </Typography>
                }
              />
              <FormControlLabel 
                value="technical" 
                control={
                  <Radio 
                    sx={{
                      color: muiTheme.palette.primary.main,
                      '&.Mui-checked': {
                        color: muiTheme.palette.primary.main,
                      },
                    }}
                  />
                } 
                label={
                  <Typography variant="body1">
                    Technical Manager
                    <Typography variant="caption" color="text.secondary" display="block">
                      Detailed technical resume with project specifics and tech stack
                    </Typography>
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ position: 'relative', zIndex: 1, p: 2 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: muiTheme.palette.text.primary,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!visitorType || loading}
            variant="contained"
            startIcon={loading ? null : <Download />}
            sx={{
              backgroundColor: muiTheme.palette.primary.main,
              color: '#fff',
              '&:hover': {
                backgroundColor: muiTheme.palette.primary.dark,
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            {loading ? 'Processing...' : 'View Resume'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResumeDownload; 