import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";
import { FaCamera, FaKeyboard, FaPaperPlane, FaTags } from "react-icons/fa";
import { loadAllCategories } from "../../Services/CategoryService";
import {
  addPost,
  uploadPostImage,
  generateKeywords,
  checkPlagiarism,
} from "../../Services/PostService";
import { getCurrentUserDetail } from "../../Auth/Auth";
import "./WriteBlog.css";
import { Camera, Send, Tag, X, Sparkles } from "lucide-react";

export default function WriteBlog() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
    keywords: [],
    active: false,
  });

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const [imagePreview, setImagePreview] = useState(null);
  const [newKeyword, setNewKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  // const [plagiarismScore, setPlagiarismScore] = useState(null);
  // const [isChecking, setIsChecking] = useState(false);
  const [plagiarismScore, setPlagiarismScore] = useState({ human: 0, ai: 0 });
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    async function fetchData() {
      try {
        const data = await loadAllCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const fieldChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const resetData = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "",
      keywords: [],
      active: false,
    });
    setImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById("image");
    if (fileInput) {
      fileInput.value = "";
    }

    setNewKeyword("");
    setPlagiarismScore({ human: 0, ai: 0 }); 
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      toast.error("Title is required !!");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("Content is required !!");
      return;
    }
    if (post.categoryId === "") {
      toast.error("Category is required !!");
      return;
    }

    const cleanedKeywords = Array.from(
      new Set(
        post.keywords
          .map((keyword) => keyword.trim())
          .filter((keyword) => keyword.length > 0) // Ensure no empty values
      )
    );

    const postToSubmit = {
      ...post,
      keywords: cleanedKeywords,
      userId: user.id,
    };

    try {
      const postData = await addPost(postToSubmit);
      setPosts([postData, ...posts]);
      if (image) {
        await uploadPostImage(image, postData.postId);
      }
      toast.success("New Post created Successfully");
      resetData();
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateKeywordsbyAI = async (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      toast.error("Title is required for generating keywords!");
      return;
    }

    setIsGenerating(true); // Set loading state

    try {
      const response = await generateKeywords(post.title);

      if (response && response.keywords) {
        const uniqueKeywords = new Set([
          ...post.keywords,
          ...response.keywords.map((kw) => kw.trim()).filter((kw) => kw !== ""),
        ]);

        setPost((prevPost) => ({
          ...prevPost,
          keywords: Array.from(uniqueKeywords),
        }));
      } else {
        toast.error("Failed to generate keywords.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error generating keywords.");
    } finally {
      setIsGenerating(false); // Reset loading state
    }
  };

  const handleDeleteChip = (deletedKeyword) => {
    setPost((prevPost) => ({
      ...prevPost,
      keywords: prevPost.keywords.filter(
        (keyword) => keyword !== deletedKeyword
      ),
    }));
  };

  const handleAddKeyword = (event) => {
    event.preventDefault();
    const trimmedKeyword = newKeyword.trim();
    if (trimmedKeyword !== "" && !post.keywords.includes(trimmedKeyword)) {
      setPost((prevPost) => ({
        ...prevPost,
        keywords: [...prevPost.keywords, trimmedKeyword],
      }));
      setNewKeyword("");
    } else if (trimmedKeyword === "") {
      toast.error("Keyword cannot be empty!");
    } else {
      toast.error("Keyword already exists!");
    }
  };

  // Prevent pressing Enter from triggering AI keyword generation
  const handleKeywordInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddKeyword(event);
    }
  };

  // const handleCheckPlagiarism = async () => {
  //   if (!post.content.trim()) {
  //     toast.error("Please enter content before checking plagiarism.");
  //     return;
  //   }

  //   setIsChecking(true);

  //   try {
  //     const response = await checkPlagiarism(post.content); // Call API function
  //     console.log(response);
  //     if (response) {
  //       setPlagiarismScore(response.score); // Assuming API returns percentage
  //     } else {
  //       toast.error("Failed to check plagiarism.");
  //     }
  //   } catch (error) {
  //     toast.error("Error checking plagiarism.");
  //   } finally {
  //     setIsChecking(false);
  //   }
  // };

  const handleCheckPlagiarism = async () => {
    if (!post.content.trim()) {
      toast.error("Please enter content before checking plagiarism.");
      return;
    }

    setIsChecking(true);

    try {
      const response = await checkPlagiarism(post.content); // API call
      console.log(response);

      if (response && response.Human && response.AI_generated) {
        setPlagiarismScore({
          human: parseInt(response.Human), // Convert string "5%" to number 5
          ai: parseInt(response.AI_generated),
        });
      } else {
        toast.error("Failed to check plagiarism.");
      }
    } catch (error) {
      toast.error("Error checking plagiarism.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{
          mb: 4,
          color: "#F05454",
          fontWeight: 500,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Create New Blog Post
      </Typography>

      <form onSubmit={createPost}>
        <Grid container spacing={3}>
          {/* Main Content Section */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <TextField
                placeholder="Enter your blog title"
                variant="outlined"
                fullWidth
                name="title"
                value={post.title}
                onChange={fieldChange}
                InputProps={{
                  sx: {
                    bgcolor: "background.paper",
                    fontFamily: "'Montserrat', sans-serif",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#F05454",
                    },
                  },
                }}
              />

              <TextField
                placeholder="Write your blog content here..."
                multiline
                rows={12}
                variant="outlined"
                fullWidth
                name="content"
                value={post.content}
                onChange={fieldChange}
                InputProps={{
                  sx: {
                    bgcolor: "background.paper",
                    fontFamily: "'Montserrat', sans-serif",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#F05454",
                    },
                  },
                }}
              />

              <Box
                sx={{
                  bgcolor: "grey.50",
                  padding: "20px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  borderColor: "grey.200",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: "semibold",
                      fontSize: "1.2rem",
                      color: "grey.900",
                      marginTop: "10px",
                    }}
                  >
                    Keywords
                  </h4>

                  <button
                    style={{
                      padding: "5px 12px",
                      background: "rgba(232, 90, 79, 0.06)",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      color: "#e85a4f",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                    onClick={generateKeywordsbyAI}
                    disabled={isGenerating}
                  >
                    <Sparkles className="h-4 w-4" />
                    {isGenerating
                      ? "Generating Keywords 🤔 ..."
                      : "Generate by AI"}
                  </button>
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    placeholder="Add keyword"
                    size="small"
                    fullWidth
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={handleKeywordInputKeyDown}
                    InputProps={{
                      sx: {
                        bgcolor: "background.paper",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E0E0E0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E0E0E0",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#F05454",
                        },
                      },
                    }}
                  />
                  <button
                    style={{
                      padding: "5px 12px",
                      background: "rgba(232, 90, 79, 0.06)",
                      borderRadius: "2px",
                      fontSize: "0.8rem",
                      color: "#e85a4f",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    onClick={handleAddKeyword}
                  >
                    <Tag style={{ height: "17px", width: "17px" }} />
                  </button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {post.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      onDelete={() => handleDeleteChip(keyword)}
                      sx={{
                        bgcolor: "#FFF0F0",
                        fontFamily: "'Montserrat', sans-serif",
                        color: "#F05454",
                        "& .MuiChip-deleteIcon": {
                          color: "#F05454",
                          "&:hover": {
                            color: "#D03434",
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Box
                sx={{
                  border: "2px dashed #F05454",
                  borderRadius: 4,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "rgba(232, 90, 79, 0.06)",
                  "&:hover": {
                    borderColor: "#F05454",
                  },
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="image" style={{ cursor: "pointer" }}>
                  {!imagePreview ? (
                    <>
                      <FaCamera
                        style={{
                          fontSize: "2rem",
                          color: "#F05454",
                          marginBottom: "8px",
                        }}
                      />
                      <Typography
                        color="#F05454"
                        sx={{
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        Upload a file
                      </Typography>
                    </>
                  ) : (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </label>
              </Box>

              <FormControl fullWidth>
                <Select
                  value={post.categoryId}
                  onChange={fieldChange}
                  name="categoryId"
                  displayEmpty
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.categoryId}
                      value={category.categoryId}
                      sx={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {category.categoryTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: "semibold",
                  }}
                >
                  Active Post
                </Typography>
                <Switch
                  checked={post.active}
                  onChange={(event) =>
                    setPost({ ...post, active: event.target.checked })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#F05454",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#F05454",
                    },
                  }}
                />
              </Box>

              {/* <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckPlagiarism}
                  disabled={isChecking}
                >
                  {isChecking ? "Checking..." : "Check Plagiarism"}
                </Button>

                {plagiarismScore !== null && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">AI GENERATED</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ flexGrow: 1, height: 8, bgcolor: "#f05454" }}>
                        <Box
                          sx={{
                            width: `${plagiarismScore}%`,
                            height: "100%",
                            bgcolor: "#e85a4f",
                          }}
                        />
                      </Box>
                      <Typography variant="body2">
                        {plagiarismScore}%
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Human
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ flexGrow: 1, height: 8, bgcolor: "#ccc" }}>
                        <Box
                          sx={{
                            width: `${100 - plagiarismScore}%`,
                            height: "100%",
                            bgcolor: "#4caf50",
                          }}
                        />
                      </Box>
                      <Typography variant="body2">
                        {100 - plagiarismScore}%
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box> */}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleCheckPlagiarism}
                  disabled={isChecking}
                  size="large"
                  fullWidth
                  sx={{
                    bgcolor: "#F05454",
                    fontFamily: "'Montserrat', sans-serif",

                    "&:hover": {
                      bgcolor: "#D03434",
                    },
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    gap: 1,
                  }}
                >
                  {isChecking ? "Checking..." : "Check Plagiarism"}
                </Button>

                {plagiarismScore.ai !== 0 && plagiarismScore.human !== 0 && (
                  <Box sx={{ mt: 2 }}>
                    {/* AI GENERATED Progress Bar */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      AI Generated
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ flexGrow: 1, height: 8 }}>
                        <Box
                          sx={{
                            width: `${plagiarismScore.ai}%`,
                            height: "100%",
                            bgcolor: "#e85a4f",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {plagiarismScore.ai}%
                      </Typography>
                    </Box>

                    {/* Human Progress Bar */}
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 1, fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Human
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ flexGrow: 1, height: 8 }}>
                        <Box
                          sx={{
                            width: `${plagiarismScore.human}%`,
                            height: "100%",
                            bgcolor: "#4caf50",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {plagiarismScore.human}%
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  bgcolor: "#F05454",
                  fontFamily: "'Montserrat', sans-serif",

                  "&:hover": {
                    bgcolor: "#D03434",
                  },
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  gap: 1,
                }}
              >
                <Send style={{ height: "17px", width: "17px" }} />
                Publish Post
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
