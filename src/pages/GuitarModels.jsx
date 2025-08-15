import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BRAND_DETAILS, GET_BRAND_MODELS } from "../graphql/queries";
import Hero from "../components/Hero";
import siteLogo from "../assets/logo.jpg";
import brandDescriptions from "../components/brandDescriptions";
import Footer from "../components/Footer"; 
import {Box,Typography,MenuItem,Select,InputBase,IconButton,} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Card, CardMedia, CardContent } from "@mui/material";
import placeholderImg from "../assets/placeholder.jpg";

export default function GuitarModels() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  // brand info query
  const {
    data: brandData,
    loading: brandLoading,
    error: brandError,
  } = useQuery(GET_BRAND_DETAILS, {
    variables: { id },
  });
  const brand = brandData?.findUniqueBrand;
  const brandName = brand?.name;
  const description = brandDescriptions[brandName] || "Ask ChatGPT.";

  // models from brand's id query
  const {
    data: modelsData,
    loading: modelsLoading,
    error: modelsError,
  } = useQuery(GET_BRAND_MODELS, {
    variables: {
      id,
      sortBy: {
        field: "name",
        order: "ASC",
      },
    },
  });
  const models = modelsData?.findBrandModels || [];
  console.log("Model URLs:", models.map((m) => m.image));

  // filter and search states
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [allTypes, setAllTypes] = useState([]);

  // extract all model types
  useEffect(() => {
    if (models.length > 0) {
      const types = [...new Set(models.map((model) => model.type))];
      setAllTypes(types);
    }
  }, [models]);

    const filteredModels = models
    ?.filter((model) => {
        const matchType = filterType ? model.type === filterType : true;
        const matchSearch = model.name.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSearch;
    }) || [];

    const modelsPerPage = 6;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(filteredModels.length / modelsPerPage);

    const paginatedModels = filteredModels.slice(
    (page - 1) * modelsPerPage,
    page * modelsPerPage
    );
           
    const getSafeUrl = (url) => {
    try {
        const urlParts = url.split("/");
        const lastPart = urlParts.pop();
        const encodedFileName = encodeURIComponent(lastPart.trim()); // <-- trim extra spaces
        return [...urlParts, encodedFileName].join("/");
    } catch (e) {
        console.error("URL encode failed for:", url);
        return url;
    }
    };


  // Loading fallback
  if (brandLoading || modelsLoading) {
    return <div>Loading...</div>;
  }

  // Error fallback
  if (brandError || modelsError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      {/* Hero */}
      <Hero
        titleStart="Play like a"
        titleHighlight="Rock star"
        subtitle={description}
        imageSrc={brand?.image}
        imageAlt={brand?.name}
        siteLogoSrc={siteLogo}
        siteLogoLabel="VibeStrings"
        mode="logo"
        onBack={() => navigate("/")}
        loading={brandLoading}
      />

      {/* filtering and searchbar section */}
      <Box sx={{ px: 10, mt: 8, mb: 4 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
          Check out the{" "}
          <span style={{ color: theme.palette.primary.main }}>Selection</span>
        </Typography>

        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {/* dropdown filter */}
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: "white",
              px: 2,
              py: 1,
              border: "1px solid #black",
              borderRadius: "7px",
              fontWeight: 500,
              color: theme.palette.text.secondary,
              minWidth: 200,
            }}
            renderValue={(selected) => selected || "Filter by type"}
          >
            <MenuItem value="" sx={{ color: theme.palette.text.secondary }}>ALL</MenuItem> 
            {allTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ color: theme.palette.text.secondary }}>
                    {type}
                </MenuItem>
            ))}
          </Select>

          {/* search input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              border: "1px solid #ddd",
              borderRadius: "7px",
              bgcolor: "white",
              minWidth: 300,
              transition: "border 0.2s ease-in-out",
            ":focus-within": {
                border: `2px solid ${theme.palette.primary.main}`, 
            },
            }}
          >
            <IconButton disabled>
              <SearchIcon sx={{ color: theme.palette.text.secondary }} />
            </IconButton>
            <InputBase
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ ml: 1, flex: 1, color: theme.palette.text.secondary }}
            />
          </Box>
        </Box>
      </Box>

     {/* Models Grid */}
        <Box sx={{ px: 6, mt: 6 }}>
            <Box sx={{ px: 3, mt: 6 }}>
                <Box
                    sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    gap: 2, // space between cards
                    }}
                >
                    {paginatedModels.map((model) => (
                    <Card
                        key={model.id}
                        elevation={3}
                        sx={{
                        borderRadius: 1,
                        width: "400px", // consistent card width
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        p: 2,
                        mb:3,
                        }}
                    >
                        <Box
                        component="img"
                        src={getSafeUrl(model.image)}
                        alt={model.name}
                        onError={(e) => {
                           e.target.onerror = null; // Prevent infinite loop
                            e.target.src = placeholderImg;
                        }}
                        sx={{
                            width: "100%",
                            height: "150px",
                            objectFit: "contain",
                            mb: 2,
                        }}
                        />
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                        {model.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        ${model.price.toLocaleString()}
                        </Typography>
                    </Card>
                    ))}
                </Box>
            </Box>



        {/* Pagination */}
         <Box
            sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
            mx:10,
            flexWrap: "wrap",
            px: 2,
            }}
        >
            <Typography variant="body2" color="text.secondary">
            Showing <b>{paginatedModels.length}</b> results from{" "}
            <b>{filteredModels.length}</b>
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb:2 }}>
            <IconButton
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                sx={{ border: "1px solid #ccc", borderRadius: 1 }}
            >
                &lt;
            </IconButton>

            {page > 3 && (
                <>
                <IconButton onClick={() => setPage(1)}>1</IconButton>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    ...
                </Typography>
                </>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - page) <= 2)
                .map((p) => (
                <IconButton
                    key={p}
                    onClick={() => setPage(p)}
                    sx={{
                    bgcolor: p === page ? "gray" : "transparent",
                    color: p === page ? "white" : "inherit",
                    borderRadius: 1,
                    border: "1px solid #ccc",
                    width: 40,
                    height: 40,
                    fontSize: 14,
                    }}
                >
                    {p}
                </IconButton>
                ))}

            {page < totalPages - 2 && (
                <>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    ...
                </Typography>
                <IconButton onClick={() => setPage(totalPages)}>
                    {totalPages}
                </IconButton>
                </>
            )}

            <IconButton
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                sx={{ border: "1px solid #ccc", borderRadius: 1 }}
            >
                &gt;
            </IconButton>
            </Box>
        </Box>
    </Box>

    <Footer
    siteLogoSrc={siteLogo}
    siteLogoLabel="VibeStrings"
    />      
    </>
  );
}
