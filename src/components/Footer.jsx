import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Stack } from "@mui/material";
import { Facebook, Twitter, Instagram, LocationOn, Email } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

export default function Footer({ siteLogoSrc, siteLogoLabel }) {
  const { t, i18n } = useTranslation();
  return (
    <Box
      sx={{ backgroundColor: "#f5f5f5", py: 4, borderTop: "1px solid #ddd", mt: 8 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={20}>
          {/* Left Column - Logo & Info */}
          <Grid item xs={12} md={3}>
           {siteLogoSrc && (
            <Stack direction="row" spacing={2} alignItems="center" mb={4} mt={6} mx={2}>
                <Box
                component="img"
                src={siteLogoSrc}
                alt={siteLogoLabel}
                sx={{ height: 60,  borderRadius: 4}}
                />
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                {siteLogoLabel}
                </Typography>
            </Stack>
            )}
            <Stack direction="row" spacing={2} alignItems="center" mb={3} mx={4} color={"gray"}>
              <Email fontSize="medium" />
              <Typography variant="body3">{t('contactEmail')}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mb={3} mx={4} color={"gray"}>
              <LocationOn fontSize="medium" />
              <Typography variant="body3">{t('location')}</Typography>
            </Stack>
          </Grid>

          {/* Pages */}
          <Grid item xs={12} md={3} mb={4} mt={3} mr={-4} ml={-6}>
            <Typography variant="h5" fontWeight={500} mb={4} gutterBottom>
              {t('pages')}
            </Typography>
            <Stack spacing={3}  color={"gray"}>
              <Link href="#" underline="hover" color="inherit">{t('store')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('collections')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('support')}</Link>
            </Stack>
          </Grid>
          {/* Product */}
          <Grid item  xs={12} md={3} mb={4} mt={3}>
            <Typography variant="h5" fontWeight={500} mb={4} gutterBottom>
              {t('product')}
            </Typography>
            <Stack spacing={3}  color={"gray"}>
              <Link href="#" underline="hover" color="inherit">{t('terms')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('privacyPolicy')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('copyright')}</Link>
            </Stack>
          </Grid>

          {/* Social */}
          <Grid item xs={12} md={3}  mb={4} mt={3}>
            <Typography variant="h5" fontWeight={500} mb={4} gutterBottom>
              {t('followUs')}
            </Typography>
            <Stack direction="row" spacing={1} color={"gray"} >
              <IconButton ><Facebook fontSize="large" /></IconButton>
              <IconButton><Twitter fontSize="large" /></IconButton>
              <IconButton><Instagram fontSize="large" /></IconButton>
            </Stack>
          </Grid>
        </Grid>
            <Box textAlign="center" pt={3}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t('language')}:
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
              <Button onClick={() => i18n.changeLanguage('sq')}>Shqip</Button>
            </Stack>
          </Box>

        {/* Bottom Copyright */}
        <Box textAlign="center" pt={5}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Copyright.VibeStrings
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
