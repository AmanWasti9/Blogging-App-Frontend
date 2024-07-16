import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Input } from "reactstrap";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { loadAllCategories } from "../../Services/CategoryService";
import { addPost, uploadPostImage } from "../../Services/PostService";
import { getCurrentUserDetail } from "../../Auth/Auth";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function WriteBlog() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
    active: false,
  });

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

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
      active: false,
    });
    setImage(null);
    const fileInput = document.getElementById("image");
    if (fileInput) {
      fileInput.value = "";
    }
    const selectElement = document.getElementById("categorySelect");
    if (selectElement) {
      selectElement.selectedIndex = 0;
    }
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
    if (post.categoryId.trim() === "") {
      toast.error("Category is required !!");
      return;
    }

    post["userId"] = user.id;

    try {
      const postData = await addPost(post);
      setPosts([postData, ...posts]);
      await uploadPostImage(image, postData.postId);
      toast.success("New Post created Successfully");
      resetData();
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div>
      <Form onSubmit={createPost}>
        <h3 className="text-center">What is going in your mind</h3>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <div>
              <TextField
                label="Title"
                variant="outlined"
                type="text"
                id="title"
                placeholder="Title"
                className="rounded-0"
                name="title"
                onChange={fieldChange}
                value={post.title}
                style={{ width: "100%" }}
              />
              {/* Content Field */}
              <div
                className="my-3"
                style={{
                  border: "1px solid #ccc",
                }}
              >
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    color="secondary"
                    onClick={() => applyFormat("bold")}
                    style={{ margin: "10px" }}
                  >
                    Bold
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => applyFormat("italic")}
                    style={{ margin: "10px" }}
                  >
                    Italic
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => applyFormat("underline")}
                    style={{ margin: "10px" }}
                  >
                    Underline
                  </Button>
                </div>
                <div
                  id="contentField"
                  contentEditable
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    maxHeight: "35vh",
                    minHeight: "35vh",
                    overflowY: "auto",
                  }}
                  onInput={(e) =>
                    setPost({ ...post, content: e.currentTarget.innerHTML })
                  }
                  suppressContentEditableWarning={true}
                />
              </div>
            </div>
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ flexGrow: 1 }}>
              <div className="my-3">
                <label htmlFor="image">Select Post Banner</label>
                <Input id="image" type="file" onChange={handleFileChange} />
              </div>
              <div className="my-3">
                <Input
                  type="select"
                  className="rounded-0"
                  name="categoryId"
                  defaultValue={0}
                  id="categorySelect"
                  onChange={fieldChange}
                  style={{ height: "50px" }}
                >
                  <option disabled value={0}>
                    ---Select Category---
                  </option>
                  {categories.map((category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>
              <div>
                <Switch
                  {...label}
                  checked={post.active}
                  onChange={(event) =>
                    setPost({ ...post, active: event.target.checked })
                  }
                />
              </div>
            </div>
            <div
              className="all-is mine"
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="submit" color="secondary" className="rounded-0">
                Add Post
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}
