import * as React from "react";
import { Box, Typography, Stack, Button, Skeleton, Grid,} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";

export default function Hero({
  siteLogoSrc,
  siteLogoLabel,
  onBack,
  backLabel,
  mode = "default",

  title,
  titleStart,
  titleHighlight,
  titleEnd,
  subtitle,

  variant = "photo",
  imageSrc,
  imageAlt,
  imageSide = "right",
  imageFit = "cover",
  loading = false,
}) {
  const { t } = useTranslation();
  const curveRight = imageSide === "right";

  // i18n fallbacks
  const resolvedSiteLogoLabel = siteLogoLabel ?? t("siteName");
  const resolvedBackLabel = backLabel ?? t("backToList");
  const resolvedImageAlt = imageAlt ?? t("hero.imageAlt");

  const finalTitleStart = titleStart ?? t("hero.titleStart");
  const finalTitleHighlight = titleHighlight ?? t("hero.titleHighlight");
  const finalTitleEnd = titleEnd ?? t("hero.titleEnd");
  const finalSubtitle = subtitle ?? t("hero.subtitle");

  const TitleNode = title ?? (
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: 34, sm: 42, md: 46 },
        fontWeight: 600,
        lineHeight: 1.2,
        marginTop: -20,
        padding: 10
      }}
    >
      {finalTitleStart}{" "}
      {finalTitleHighlight && (
        <Box component="span" sx={{ color: "primary.main" }}>
          {finalTitleHighlight}
        </Box>
      )}{" "}
      <br />
      {finalTitleEnd}
    </Typography>
  );

  return (
    <Box component="section" sx={{ width: "100%", overflow: "hidden" }}>
      {/* Top row: Back + logo */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          px: { xs: 2, sm: 4 },
          pt: 2,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        {onBack && (
          <Button
            variant="text"
            size="small"
            startIcon={<ArrowBackIosNewIcon fontSize="inherit" />}
            onClick={onBack}
          >
            {resolvedBackLabel}
          </Button>
        )}
        {siteLogoSrc && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              component="img"
              src={siteLogoSrc}
              alt={resolvedSiteLogoLabel}
              sx={{ height: 70 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: 25}}>
              {resolvedSiteLogoLabel}
            </Typography>
          </Stack>
        )}
      </Stack>

      {/* Main layout */}
      <Grid container spacing={0}
          direction={{
          xs: "column-reverse",
          md: curveRight ? "row" : "row-reverse",
        }}
        sx={{ minHeight: "100vh", width: "100%"}}
      >
        {/* Text section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "750px",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          {loading ? (
            <>
              <Skeleton variant="text" height={64} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="40%" />
            </>
          ) : (
            <>
              {TitleNode}
              {finalSubtitle  && (
                <Typography
                  sx={{
                    mt: -2,
                    ml: 12,
                    mb: 40,
                    color: "text.secondary",
                    maxWidth: 560,
                  }}
                >
                  {finalSubtitle}
                </Typography>
              )}
            </>
          )}
        </Grid>

        {/* Image section */}
        <Grid item xs={12} md={6}  sx={{ position: "relative" }}>
          {loading ? (
            <Skeleton variant="rounded" height="100%" />
          ) : (
            <Box
              sx={{
                position: "relative",
                width: "120%",
                height: { xs: 260, sm: 360, md: 800 },
                borderTopLeftRadius: curveRight ? { md: "0%" } : 0,
                borderBottomLeftRadius: curveRight ? { md: "90% 100%" } : 0,
                borderTopRightRadius: !curveRight ? { md: "0%" } : 0,
                borderBottomRightRadius: curveRight ? { md: "90% 18%" } : 0,
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: -20,
                marginLeft: 8,
              }}
            >
            {mode === "logo" ? (
            // Logo mode
            <Box
                sx={{
                width: "700px",
                height: "600px",
                background: "linear-gradient(180deg, #FF8C60, #FF5B1C)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                borderTopLeftRadius: curveRight ? { md: "0%" } : 0,
                borderBottomLeftRadius: curveRight ? { md: "390px" } : 0,
                borderTopRightRadius: !curveRight ? { md: "0%" } : 0,
                borderBottomRightRadius: curveRight ? { md: "160px" } : 0,
                marginTop: 20,
                marginLeft: -10,
                }}
            >
            <Box
                component="img"
                src={imageSrc}
                alt={resolvedImageAlt}
                sx={{
                    width: "65%",
                    height: "65%",
                    objectFit: "contain",
                    mt: 5,
                    ml: 5,
                    opacity: "40%",
                }}
            />
        </Box>
        ) : mode === "details" ? (
            // Details mode
            <Box
                sx={{
                width: "700px",
                height: "600px",
                background: "linear-gradient(180deg, #FF8C60, #FF5B1C)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: curveRight ? { md: "0%" } : 0,
                borderBottomLeftRadius: curveRight ? { md: "390px" } : 0,
                borderTopRightRadius: !curveRight ? { md: "0%" } : 0,
                borderBottomRightRadius: curveRight ? { md: "160px" } : 0,
                marginTop: 20,
                marginLeft: -10,
                }}
            >
            <Box
                component="img"
                src={imageSrc}
                alt={resolvedImageAlt}
                sx={{
                    width: "65%",
                    height: "65%",
                    objectFit: "contain",
                    transform: "rotate(-45deg)", 
                    opacity: 1, 
                    mt: -10,
                    mr:-10,
                }}
            />
        </Box>
        ) : (
        // Default mode
        <Box
            component="img"
            src={imageSrc}
            alt={resolvedImageAlt}
            sx={{
            width: "100%",
            height: "100%",
            objectFit: imageFit,
            objectPosition: "bottom",
            }}
        />
        )}
        </Box>
        )}
          {siteLogoSrc && (
            <Box
            sx={{
                position: "absolute",
                bottom: 70,
                right: "7%",
                transform: "translateX(-50%)",
                zIndex: 2,
            }}
            >
            <Box
                component="img"
                src={siteLogoSrc}
                alt={resolvedSiteLogoLabel}
                sx={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                width: 80,
                height: 80,
                p: 1.5,
                }}
            />
            </Box>
             )}
        </Grid>
      </Grid>
    </Box>
  );
}
