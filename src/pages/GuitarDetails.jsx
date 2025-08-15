import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FIND_UNIQUE_MODEL } from "../graphql/queries";
import Hero from "../components/Hero";
import siteLogo from "../assets/logo.jpg";
import MusicianCard from "../components/MusicianCard";
import {Box,Typography,Stack,Grid,Divider,} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export default function GuitarDetails() {
  const { brandId, modelId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const { data, loading, error } = useQuery(FIND_UNIQUE_MODEL, {
    variables: { brandId, modelId },
  });

  const model = data?.findUniqueModel;

  const [selectedTab, setSelectedTab] = useState("specs");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading model details.</div>;

  const nameParts = model?.name?.split(" ") || [];
  const titleStart = nameParts[0] || "";
  const titleHighlight = nameParts[1] || "";
  const titleEnd = nameParts.slice(2).join(" ") || "";

  const tabStyles = (active) => ({
    borderBottom: active ? "3px solid #FF5B1C" : "3px solid transparent",
    color: active ? "#FF5B1C" : "#999",
    cursor: "pointer",
    paddingBottom: 8,
    fontWeight: 500,
    fontSize: 18,
    flex: 1,
    textAlign: "center",
  });

  return (
    <>
      <Hero
        titleStart={titleStart}
        titleHighlight={titleHighlight}
        titleEnd={titleEnd}
        imageSrc={model?.image}
        imageAlt={model?.name}
        siteLogoSrc={siteLogo}
        siteLogoLabel="VibeStrings"
        mode="details"
        onBack={() => navigate(-1)}
        loading={loading}
      />

      {/* Tab Section */}
      <Box sx={{ mt: 6, px: { xs: 2, md: 10 } }}>
        <Stack direction="row" justifyContent="center" spacing={4}>
          <Box
            sx={tabStyles(selectedTab === "specs")}
            onClick={() => setSelectedTab("specs")}
          >
            {t("detailsPage.tabs.specs")}
          </Box>
          <Box
            sx={tabStyles(selectedTab === "musicians")}
            onClick={() => setSelectedTab("musicians")}
          >
            {t("detailsPage.tabs.musicians")}
          </Box>
        </Stack>

        <Divider sx={{ mt: 1, mb: 4 }} />

        {selectedTab === "specs" ? (
          <Box>
            <Typography variant="body1" sx={{ mb: 3, maxWidth: "100%", color: theme.palette.text.secondary }}>
              {model?.description}
            </Typography>
            <ul style={{ fontSize: "1rem", lineHeight: "1.6", color: theme.palette.text.secondary }}>
              {model?.specs?.bodyWood && <li>{t("detailsPage.specs.bodyWood")}: "{model.specs.bodyWood}"</li>}
              {model?.specs?.neckWood && <li>{t("detailsPage.specs.neckWood")}: "{model.specs.neckWood}"</li>}
              {model?.specs?.fingerboardWood && <li>{t("detailsPage.specs.fingerboardWood")}: "{model.specs.fingerboardWood}"</li>}
              {model?.specs?.pickups && <li>{t("detailsPage.specs.pickups")}: "{model.specs.pickups}"</li>}
              {model?.specs?.tuners && <li>{t("detailsPage.specs.tuners")}: "{model.specs.tuners}"</li>}
              {model?.specs?.scaleLength && <li>{t("detailsPage.specs.scaleLength")}: "{model.specs.scaleLength}"</li>}
              {model?.specs?.bridge && <li>{t("detailsPage.specs.bridge")}: "{model.specs.bridge}"</li>}
            </ul>
          </Box>
        ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            {model?.musicians?.length ? (
              model.musicians.map((musician, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <MusicianCard musician={musician} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography color="text.secondary">
                  {t("detailsPage.noMusicians")}
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
      <Footer
          siteLogoSrc={siteLogo}
          siteLogoLabel="VibeStrings"
          />   
    </>
  );
}
