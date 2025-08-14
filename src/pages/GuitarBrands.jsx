// src/pages/GuitarBrands.jsx
import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_BRANDS } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import { Box, Container, Card, CardActionArea, CardContent, Typography, CircularProgress, Alert, Stack, ButtonBase} from "@mui/material";
import Grid from "@mui/material/Grid";
import Hero from "../components/Hero";
import heroImg from "../assets/hero.jpg";
import siteLogo from "../assets/logo.jpg";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import GooglePlayBadge from "../assets/google-play-badge.png";
import AppStoreBadge from "../assets/app-store-badge.png";
import AppScreen1 from "../assets/app-screen-1.png";
import AppScreen2 from "../assets/app-screen-2.png";
import Footer from "../components/Footer"; 

export default function GuitarBrands() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_BRANDS);
  const brands = data?.findAllBrands ?? [];

  // Decide what to show just for the brands area
  // eslint-disable-next-line
  let gridContent = null;
  if (loading) {
    gridContent = (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "30vh" }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    gridContent = (
      <Alert severity="error">
        Something went wrong while loading brands: {error.message}
      </Alert>
    );
  } else {
    // eslint-disable-next-line
    gridContent = (
      <Grid container spacing={3} justifyContent="center">
        {brands.map((b) => (
          <Grid key={b.id} xs={6} sm={4} md={3} lg={2}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                transition: "transform .2s, box-shadow .2s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              <CardActionArea onClick={() => navigate(`/brands/${b.id}/models`)}>
                <CardContent
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    minHeight: 120,
                    gap: 1,
                    textAlign: "center",
                  }}
                >
                  {b.image && (
                    <img
                      src={b.image}
                      alt={b.name || "Brand"}
                      style={{ maxWidth: 120, maxHeight: 60, objectFit: "contain" }}
                    />
                  )}
                  <Typography variant="subtitle1" sx={{ mt: b.image ? 1 : 0 }}>
                    {b.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <>
      {/* section 1 — hero */}
        <Hero
        siteLogoSrc={siteLogo}
        titleStart="Browse top quality"
        titleHighlight="Guitars"
        titleEnd="online"
        subtitle="Explore 50k+ latest collections of branded guitars online with VibeStrings."
        variant="photo"
        imageSrc={heroImg}       
        imageFit="cover"
        imageSide="right"
        />

      {/* section 2 — brands */}
      <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
                Featuring the{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                Best Brands
                </Box>
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                Select your preferred brand and explore our exquisite collection.
            </Typography>
            </Box>

            <Grid container spacing={8} justifyContent="center">
            {brands.map((b) => (
                <Grid key={b.id} xs={6} sm={4} md={3} lg={2}>
                <Box
                    onClick={() => navigate(`/brands/${b.id}/models`)}
                    sx={{
                    p: 3,
                    marginBottom: 7,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    transition: "transform .2s, box-shadow .2s",
                    "& img": {
                        maxWidth: 160,
                        maxHeight: 56,
                        objectFit: "contain",
                        filter: "grayscale(1) opacity(.55)",   
                        transition: "filter .2s",
                    },
                    "&:hover img": { filter: "none" }, 
                    "&:hover": { transform: "translateY(-3px)" },
                    }}
                >
                    {b.image && <Box component="img" src={b.image} alt={b.name || "Brand"} />}
                </Box>
                </Grid>
            ))}
            </Grid>
        </Container>
        </Box>
          {/* section 3 — why us */}
        <Box sx={{ backgroundColor: "#111", py: 8 }}>
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{ color: "white", fontWeight: 400, mb: 10 }}>
            Why try{" "}
            <Box component="span" sx={{ color: "#ff6a00", fontWeight: 400 }}>
                VibeStrings?
            </Box>
            </Typography>

            <Grid container justifyContent="space-between">
            {/*feature1*/}
            <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                <Box
                    sx={{
                    backgroundColor: "#1e1e1e",
                    p: 2.5,
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <GridViewRoundedIcon sx={{ fontSize: 40, color: "gray" }} />
                </Box>
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "normal", fontSize:20, pt: 2}}>
                    SMOOTH BROWSING
                </Typography>
                <Typography variant="body2" sx={{ color: "#999", maxWidth: 260, opacity: 0.5 }}>
                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit.
                </Typography>
                </Stack>
            </Grid>
            {/*feature2*/}
            <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                <Box
                    sx={{
                    backgroundColor: "#1e1e1e",
                    p: 2.5,
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <LocalShippingRoundedIcon sx={{ fontSize: 40, color: "gray" }} />
                </Box>
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "normal", fontSize:20, pt: 2 }}>
                    EASY DELIVERY
                </Typography>
                <Typography variant="body2" sx={{ color: "#999", maxWidth: 260, opacity: 0.5 }}>
                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit.
                </Typography>
                </Stack>
            </Grid>
            {/*feature3*/}
            <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2} alignItems="center" textAlign="center" mb={3}>
                <Box
                    sx={{
                    backgroundColor: "#1e1e1e",
                    p: 2.5,
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <PaymentRoundedIcon sx={{ fontSize: 40, color: "gray" }} />
                </Box>
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "normal", fontSize:20, pt: 2 }}>
                    SWIFT PAYMENTS
                </Typography>
                <Typography variant="body2" sx={{ color: "#999", maxWidth: 260, opacity: 0.5 }}>
                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit.
                </Typography>
                </Stack>
            </Grid>
            </Grid>
        </Container>
        </Box>

        {/* section 4 - browse in app */}
         <Box sx={{ py: 15, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" justifyContent="space-around">
          {/* LEFT TEXT + BUTTONS */}
          <Grid item xs={12} md={6}>
            <Box sx={{ ml: -10 }}>
                <Typography variant="h3" sx={{ fontSize: 40, mb: 1, textAlign: "center" }}>
                Browse and buy your{" "}
                </Typography>
                <Typography variant="h3" sx={{ fontSize: 40, mb: 1, textAlign: "center" }}>
                <Box component="span" sx={{ color: "#ff6a00", fontWeight: 500 }}>
                    favorite guitars
                </Box>
                {" "}with 
                </Typography>
                <Typography variant="h3" sx={{ fontSize: 40, textAlign: "center"}}>
                 VibeStrings.
                </Typography>

                <Stack direction="row" spacing={8} mt={6}>
                <ButtonBase
                    component="a"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Box
                    component="img"
                    src={GooglePlayBadge}
                    alt="Get it on Google Play"
                    sx={{ height: 70 }}
                    />
                </ButtonBase>

                <ButtonBase
                    component="a"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Box
                    component="img"
                    src={AppStoreBadge}
                    alt="Download on the App Store"
                    sx={{ height: 70 }}
                    />
                </ButtonBase>
                </Stack>
            </Box>
          </Grid>

          {/* RIGHT IMAGES */}
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                width: "100%",
                maxWidth: 700,
              }}
            >
              {/* Orange circle background */}
              <Box
                sx={{
                  width: 580,
                  height: 330,
                  borderRadius: "50%",
                  backgroundColor: "#ff6a00",
                  position: "absolute",
                  left: "-10%",
                  top: "10%",
                  zIndex: 1,
                }}
              />

              {/* Phone images */}
              <Box
                component="img"
                src={AppScreen1}
                alt="App Screenshot 1"
                sx={{
                  height: 500,
                  borderRadius: 2,
                  zIndex: 2,
                  position: "relative",
                  mr: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Box
                component="img"
                src={AppScreen2}
                alt="App Screenshot 2"
                sx={{
                  height: 500,
                  mb: -10,
                  ml:3,
                  borderRadius: 2,
                  zIndex: 2,
                  position: "relative",
                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>   
    <Footer
  siteLogoSrc={siteLogo}
  siteLogoLabel="VibeStrings"
/>      
    </>
  );
}
