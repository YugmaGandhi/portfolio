import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { colors } from '../../theme/tokens';

interface SectionFrameProps {
  /** Anchor id used by the navbar ("about", "skills", ...). */
  id: string;
  /** Two-digit section code shown in the screen header ("01"). */
  code: string;
  /** System-file style label shown in the screen header ("PLAYER.DAT"). */
  fileLabel: string;
  /** Status text after "STATUS:" in the screen header ("ONLINE"). */
  status: string;
  /** First part of the section title, rendered in the base text color. */
  title: string;
  /** Second part of the title, rendered in cyan. */
  accent: string;
  /** Optional intro paragraph under the title rule. */
  description?: string;
  children: ReactNode;
}

const SectionFrame = ({ id, code, fileLabel, status, title, accent, description, children }: SectionFrameProps) => (
  <Box
    id={id}
    component="section"
    className="retro-section"
    sx={{ py: 10, position: 'relative', overflow: 'hidden' }}
  >
    <Container maxWidth="lg">
      <Box className="screen-header">
        <Typography component="span" className="screen-header__title">
          [ {code} ] {fileLabel}
        </Typography>
        <Typography component="span" className="screen-header__status">
          STATUS: {status}
        </Typography>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography variant="h3" component="h2" align="center" className="pixel-title" sx={{ mb: 1 }}>
          {title} <Box component="span" sx={{ color: colors.cyan }}>{accent}</Box>
        </Typography>
        <Box className="section-rule" />
        {description && (
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 740, mx: 'auto' }}
          >
            {description}
          </Typography>
        )}
      </motion.div>

      {children}
    </Container>
  </Box>
);

export default SectionFrame;
