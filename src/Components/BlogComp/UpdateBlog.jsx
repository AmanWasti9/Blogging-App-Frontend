// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loadAllCategories } from "../../Services/CategoryService";
// import { Button, Col, Container, Form, Input, Row } from "reactstrap";
// import UserContext from "../../Context/UserContext";
// import {
//   loadPost,
//   updatePostById,
//   uploadPostImage,
// } from "../../Services/PostService";
// import { Grid } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { BASE_URL } from "../../Services/Helper";
// import parse from "html-react-parser";
// import Switch from "@mui/material/Switch";

// const label = { inputProps: { "aria-label": "Switch demo" } };

// export default function UpdateBlog() {
//   const { blogId } = useParams();
//   const object = useContext(UserContext);
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const fetchCatData = await loadAllCategories();
//         setCategories(fetchCatData);
//       } catch (error) {
//         toast.error("Error in Loading Post");
//       }
//     }

//     fetchData();

//     async function loadSinglePost() {
//       try {
//         const data = await loadPost(blogId);
//         setPost({ ...data, categoryId: data.category.categoryId });
//       } catch (error) {
//         toast.error("Error in Loading Post");
//       }
//     }

//     loadSinglePost();
//   }, []);

//   useEffect(() => {
//     if (post) {
//       if (post.user.id !== object.user.data.id) {
//         toast.error("This is not your post!!");
//         navigate("/");
//       }
//     }
//   }, [post]);

//   const handleChange = (event, fieldName) => {
//     setPost({
//       ...post,
//       [fieldName]: event.target.value,
//     });
//   };
//   const handleImageChange = (event) => {
//     if (event.target.files.length > 0) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const updatePost = async (event) => {
//     try {
//       event.preventDefault();

//       // Check if a new image is selected
//       let updatedPost = { ...post, category: { categoryId: post.categoryId } };
//       // console.log("Original Post:", updatedPost); // Log original post data

//       if (!image) {
//         // If no new image selected, keep the old image
//         updatedPost = { ...updatedPost, imageName: post.imageName };
//         // console.log("Updated Post with old image:", updatedPost); // Log updated post data with old image
//       } else {
//         // If a new image is selected
//         // console.log("New image selected:", image); // Log the new image data
//       }

//       await updatePostById(updatedPost, post.postId);

//       if (image) {
//         // Only upload the image if a new image is selected
//         await uploadPostImage(image, post.postId);
//       }

//       navigate("/blog/" + blogId);
//       toast.success("Your Post has been Updated");
//     } catch (error) {
//       toast.error("Error in updating post");
//     }
//   };

//   const updateHtml = () => {
//     return (
//       <div>
//         <h3
//           style={{
//             textAlign: "center",
//           }}
//         >
//           Update Post
//         </h3>
//         <Form onSubmit={updatePost}>
//           <Grid container spacing={2}>
//             <Grid item lg={8} md={8} sm={12} xs={12}>
//               <div className="my-3">
//                 <TextField
//                   label="Title"
//                   variant="standard"
//                   type="text"
//                   id="title"
//                   placeholder="Title"
//                   className="rounded-0"
//                   name="title"
//                   value={post.title}
//                   onChange={(event) => handleChange(event, "title")}
//                   style={{
//                     width: "100%",
//                   }}
//                 />
//               </div>
//               <div className="my-3">
//                 <textarea
//                   id="outlined-multiline-static"
//                   label="Content"
//                   multiline
//                   rows={15}
//                   name="content"
//                   // dangerouslySetInnerHTML={{ __html: post.content }}
//                   onChange={(event) => handleChange(event, "content")}
//                   style={{
//                     width: "100%",
//                   }}
//                   value= {post.content && parse(post.content)}

//                 >
//                   </textarea>
//               </div>

//             </Grid>
//             <Grid
//               item
//               lg={4}
//               md={4}
//               sm={12}
//               xs={12}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <div className="my-3">
//                 <label htmlFor="image">Select Post Banner</label>
//                 <Input id="image" type="file" onChange={handleImageChange} />
//               </div>
//               {post && (
//                 <div className="my-3">
//                   <img
//                     src={BASE_URL + "/api/post/image/" + post.imageName}
//                     alt=""
//                     className="obj-con w-50per"
//                   />
//                 </div>
//               )}
//               <div className="my-3">
//                 <Input
//                   type="select"
//                   className="rounded-0"
//                   name="categoryId"
//                   id="category"
//                   onChange={(event) => handleChange(event, "categoryId")}
//                   value={post.categoryId}
//                 >
//                   <option disabled value={0}>
//                     ---Select Category---
//                   </option>
//                   {categories.map((category) => (
//                     <option
//                       value={category.categoryId}
//                       key={category.categoryId}
//                     >
//                       {category.categoryTitle}
//                     </option>
//                   ))}
//                 </Input>
//               </div>
//               <div>
//                 <Switch
//                   {...label}
//                   checked={post.active}
//                   onChange={
//                     (event) =>
//                       setPost({ ...post, active: event.target.checked }) // Update post.active on change
//                   }
//                 />
//               </div>

//               <Container className="text-center">
//                 <Button
//                   type="submit"
//                   color="secondary"
//                   className="rounded-0 mx-1 mt-2"
//                 >
//                   Update Post
//                 </Button>

//                 <Button color="danger" className="rounded-0 mx-1 mt-2">
//                   Reset Content
//                 </Button>
//               </Container>
//             </Grid>
//           </Grid>
//         </Form>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Row>
//         <Col>{post && updateHtml()}</Col>
//       </Row>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loadAllCategories } from "../../Services/CategoryService";
// import { Button, Col, Container, Form, Input, Row } from "reactstrap";
// import UserContext from "../../Context/UserContext";
// import {
//   loadPost,
//   updatePostById,
//   uploadPostImage,
// } from "../../Services/PostService";
// import { Grid } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { BASE_URL } from "../../Services/Helper";
// import Switch from "@mui/material/Switch";
// import parse from "html-react-parser";

// const label = { inputProps: { "aria-label": "Switch demo" } };

// export default function UpdateBlog() {
//   const { blogId } = useParams();
//   const object = useContext(UserContext);
//   const navigate = useNavigate();
//   // const [post, setPost] = useState(null);
//   const [post, setPost] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState();
//   // const contentRef = useRef(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const fetchCatData = await loadAllCategories();
//         setCategories(fetchCatData);
//       } catch (error) {
//         toast.error("Error in Loading Categories");
//       }
//     }

//     async function loadSinglePost() {
//       try {
//         const data = await loadPost(blogId);
//         setPost({ ...data, categoryId: data.category.categoryId });
//       } catch (error) {
//         toast.error("Error in Loading Post");
//       }
//     }

//     fetchData();
//     loadSinglePost();
//   }, [blogId]);

//   useEffect(() => {
//     if (post && post.user.id !== object.user.data.id) {
//       toast.error("This is not your post!!");
//       navigate("/");
//     }
//   }, [post, object.user.data.id, navigate]);

//   // useEffect(() => {
//   //   if (post && contentRef.current) {
//   //     contentRef.current.innerHTML = post.content;
//   //   }
//   // }, [post]);

//   const handleChange = (event, fieldName) => {
//     setPost({
//       ...post,
//       [fieldName]: event.target.value,
//     });
//   };

//   const handleImageChange = (event) => {
//     if (event.target.files.length > 0) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const updatePost = async (event) => {
//     event.preventDefault();
//     try {
//       let updatedPost = { ...post, category: { categoryId: post.categoryId } };

//       if (!image) {
//         updatedPost = { ...updatedPost, imageName: post.imageName };
//       }

//       await updatePostById(updatedPost, post.postId);

//       if (image) {
//         await uploadPostImage(image, post.postId);
//       }

//       navigate("/blog/" + blogId);
//       toast.success("Your Post has been Updated");
//     } catch (error) {
//       toast.error("Error in updating post");
//     }
//   };

//   const applyFormat = (format) => {
//     document.execCommand(format, false, null);
//   };

//   const updateHtml = () => {
//     if (!post) return null; // Early return if post is not defined

//     return (
//       <div>
//         <h3 style={{ textAlign: "center" }}>Update Post</h3>
//         <Form onSubmit={updatePost}>
//           <Grid container spacing={2}>
//             <Grid item lg={8} md={8} sm={12} xs={12}>
//               <div className="my-3">
//                 <TextField
//                   label="Title"
//                   variant="standard"
//                   type="text"
//                   id="title"
//                   placeholder="Title"
//                   className="rounded-0"
//                   name="title"
//                   value={post.title}
//                   onChange={(event) => handleChange(event, "title")}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//               <div
//                 className="my-3"
//                 style={{
//                   border: "1px solid #ccc",
//                 }}
//               >
//                 <div style={{ display: "flex", justifyContent: "end" }}>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("bold")}
//                     style={{ margin: "10px" }}
//                   >
//                     Bold
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("italic")}
//                     style={{ margin: "10px" }}
//                   >
//                     Italic
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("underline")}
//                     style={{ margin: "10px" }}
//                   >
//                     Underline
//                   </Button>
//                 </div>
//                 <div
//                   id="contentField"
//                   contentEditable
//                   suppressContentEditableWarning={true}
//                   style={{
//                     border: "1px solid #ccc",
//                     padding: "10px",
//                     maxHeight: "35vh",
//                     minHeight: "35vh",
//                     overflowY: "auto",
//                   }}
//                   onInput={(e) =>
//                     setPost({ ...post, content: e.currentTarget.innerHTML })
//                   }
//                 >
//                   {post.content && parse(post.content)}
//                 </div>
//               </div>
//             </Grid>
//             <Grid
//               item
//               lg={4}
//               md={4}
//               sm={12}
//               xs={12}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <div className="my-3">
//                 <label htmlFor="image">Select Post Banner</label>
//                 <Input id="image" type="file" onChange={handleImageChange} />
//               </div>
//               {post && (
//                 <div className="my-3">
//                   <img
//                     src={BASE_URL + "/api/post/image/" + post.imageName}
//                     alt=""
//                     className="obj-con w-50per"
//                   />
//                 </div>
//               )}
//               <div className="my-3">
//                 <Input
//                   type="select"
//                   className="rounded-0"
//                   name="categoryId"
//                   id="category"
//                   onChange={(event) => handleChange(event, "categoryId")}
//                   value={post.categoryId}
//                 >
//                   <option disabled value={0}>
//                     ---Select Category---
//                   </option>
//                   {categories.map((category) => (
//                     <option
//                       value={category.categoryId}
//                       key={category.categoryId}
//                     >
//                       {category.categoryTitle}
//                     </option>
//                   ))}
//                 </Input>
//               </div>
//               <div>
//                 <Switch
//                   {...label}
//                   checked={post.active}
//                   onChange={(event) =>
//                     setPost({ ...post, active: event.target.checked })
//                   }
//                 />
//               </div>
//               <Container className="text-center">
//                 <Button
//                   type="submit"
//                   color="secondary"
//                   className="rounded-0 mx-1 mt-2"
//                 >
//                   Update Post
//                 </Button>
//                 <Button color="danger" className="rounded-0 mx-1 mt-2">
//                   Reset Content
//                 </Button>
//               </Container>
//             </Grid>
//           </Grid>
//         </Form>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Row>
//           <Col>{updateHtml()}</Col>
//       </Row>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loadAllCategories } from "../../Services/CategoryService";
// import { Button, Col, Container, Form, Input, Row } from "reactstrap";
// import UserContext from "../../Context/UserContext";
// import {
//   loadPost,
//   updatePostById,
//   uploadPostImage,
// } from "../../Services/PostService";
// import { Grid } from "@mui/material";
// import { BASE_URL } from "../../Services/Helper";
// import parse from "html-react-parser";

// import Switch from "@mui/material/Switch";

// const label = { inputProps: { "aria-label": "Switch demo" } };

// export default function UpdateBlog() {
//   const { blogId } = useParams();
//   const object = useContext(UserContext);
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const fetchCatData = await loadAllCategories();
//         setCategories(fetchCatData);
//       } catch (error) {
//         toast.error("Error in Loading Categories");
//       }
//     }

//     fetchData();

//     async function loadSinglePost() {
//       try {
//         const data = await loadPost(blogId);
//         setPost({ ...data, categoryId: data.category.categoryId });
//       } catch (error) {
//         toast.error("Error in Loading Post");
//       }
//     }

//     loadSinglePost();
//   }, [blogId]);

//   useEffect(() => {
//     if (post && post.user.id !== object.user.data.id) {
//       toast.error("This is not your post!!");
//       navigate("/");
//     }
//   }, [post, object.user.data.id, navigate]);

//   const handleChange = (event, fieldName) => {
//     setPost({
//       ...post,
//       [fieldName]: event.target.value,
//     });
//   };

//   const handleImageChange = (event) => {
//     if (event.target.files.length > 0) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const applyFormat = (command) => {
//     document.execCommand(command);
//   };

//   const updatePost = async (event) => {
//     try {
//       event.preventDefault();
//       let updatedPost = { ...post, category: { categoryId: post.categoryId } };

//       if (!image) {
//         updatedPost = { ...updatedPost, imageName: post.imageName };
//       }

//       await updatePostById(updatedPost, post.postId);

//       if (image) {
//         await uploadPostImage(image, post.postId);
//       }

//       navigate("/blog/" + blogId);
//       toast.success("Your Post has been Updated");
//     } catch (error) {
//       toast.error("Error in updating post");
//     }
//   };

//   const updateHtml = () => {
//     return (
//       <div>
//         <h3 style={{ textAlign: "center" }}>Update Post</h3>
//         <Form onSubmit={updatePost}>
//           <Grid container spacing={2}>
//             <Grid item lg={8} md={8} sm={12} xs={12}>
//               <div className="my-3">
//                 <Input
//                   label="Title"
//                   variant="standard"
//                   type="text"
//                   id="title"
//                   placeholder="Title"
//                   className="rounded-0"
//                   name="title"
//                   value={post.title}
//                   onChange={(event) => handleChange(event, "title")}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//               <div className="my-3" style={{ border: "1px solid #ccc" }}>
//                 <div style={{ display: "flex", justifyContent: "end" }}>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("bold")}
//                     style={{ margin: "10px" }}
//                   >
//                     Bold
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("italic")}
//                     style={{ margin: "10px" }}
//                   >
//                     Italic
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("underline")}
//                     style={{ margin: "10px" }}
//                   >
//                     Underline
//                   </Button>
//                 </div>
//                 <div
//                   id="contentField"
//                   contentEditable
//                   style={{
//                     border: "1px solid #ccc",
//                     padding: "10px",
//                     maxHeight: "35vh",
//                     minHeight: "35vh",
//                     overflowY: "auto",
//                   }}
//                   onChange={(event) => handleChange(event, "content")}
//                   suppressContentEditableWarning={true}
//                   dangerouslySetInnerHTML={{ __html: post.content }} // Set initial HTML content here
//                 ></div>
//               </div>
//             </Grid>
//             <Grid
//               item
//               lg={4}
//               md={4}
//               sm={12}
//               xs={12}
//               style={{ display: "flex", flexDirection: "column" }}
//             >
//               <div className="my-3">
//                 <label htmlFor="image">Select Post Banner</label>
//                 <Input id="image" type="file" onChange={handleImageChange} />
//               </div>
//               {post && (
//                 <div className="my-3">
//                   <img
//                     src={BASE_URL + "/api/post/image/" + post.imageName}
//                     alt=""
//                     className="obj-con w-50per"
//                   />
//                 </div>
//               )}
//               <div className="my-3">
//                 <Input
//                   type="select"
//                   className="rounded-0"
//                   name="categoryId"
//                   id="category"
//                   onChange={(event) => handleChange(event, "categoryId")}
//                   value={post.categoryId}
//                 >
//                   <option disabled value={0}>
//                     ---Select Category---
//                   </option>
//                   {categories.map((category) => (
//                     <option
//                       value={category.categoryId}
//                       key={category.categoryId}
//                     >
//                       {category.categoryTitle}
//                     </option>
//                   ))}
//                 </Input>
//               </div>
//               <div>
//                 <Switch
//                   {...label}
//                   checked={post.active}
//                   onChange={(event) =>
//                     setPost({ ...post, active: event.target.checked })
//                   }
//                 />
//               </div>

//               <Container className="text-center">
//                 <Button
//                   type="submit"
//                   color="secondary"
//                   className="rounded-0 mx-1 mt-2"
//                 >
//                   Update Post
//                 </Button>

//                 <Button color="danger" className="rounded-0 mx-1 mt-2">
//                   Reset Content
//                 </Button>
//               </Container>
//             </Grid>
//           </Grid>
//         </Form>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Row>
//         <Col>{post && updateHtml()}</Col>
//       </Row>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loadAllCategories } from "../../Services/CategoryService";
// import { Button, Col, Container, Form, Input, Row } from "reactstrap";
// import UserContext from "../../Context/UserContext";
// import {
//   loadPost,
//   updatePostById,
//   uploadPostImage,
// } from "../../Services/PostService";
// import { Grid } from "@mui/material";
// import { BASE_URL } from "../../Services/Helper";
// import Switch from "@mui/material/Switch";

// const label = { inputProps: { "aria-label": "Switch demo" } };

// export default function UpdateBlog() {
//   const { blogId } = useParams();
//   const object = useContext(UserContext);
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState();
//   const contentEditableRef = useRef(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const fetchCatData = await loadAllCategories();
//         setCategories(fetchCatData);
//       } catch (error) {
//         toast.error("Error in Loading Categories");
//       }
//     }

//     fetchData();

//     async function loadSinglePost() {
//       try {
//         const data = await loadPost(blogId);
//         setPost({ ...data, categoryId: data.category.categoryId });
//       } catch (error) {
//         toast.error("Error in Loading Post");
//       }
//     }

//     loadSinglePost();
//   }, [blogId]);

//   useEffect(() => {
//     if (post && post.user.id !== object.user.data.id) {
//       toast.error("This is not your post!!");
//       navigate("/");
//     }
//   }, [post, object.user.data.id, navigate]);

//   const handleChange = (event, fieldName) => {
//     setPost({
//       ...post,
//       [fieldName]: event.target.value,
//     });
//   };

//   const handleImageChange = (event) => {
//     if (event.target.files.length > 0) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const handleContentChange = () => {
//     const content = contentEditableRef.current.innerHTML;
//     setPost((prevPost) => ({
//       ...prevPost,
//       content,
//     }));
//   };

//   const applyFormat = (command) => {
//     document.execCommand(command);
//   };

//   const updatePost = async (event) => {
//     try {
//       event.preventDefault();
//       let updatedPost = { ...post, category: { categoryId: post.categoryId } };

//       if (!image) {
//         updatedPost = { ...updatedPost, imageName: post.imageName };
//       }

//       await updatePostById(updatedPost, post.postId);

//       if (image) {
//         await uploadPostImage(image, post.postId);
//       }

//       navigate("/blog/" + blogId);
//       toast.success("Your Post has been Updated");
//     } catch (error) {
//       toast.error("Error in updating post");
//     }
//   };

//   const updateHtml = () => {
//     return (
//       <div>
//         <h3 style={{ textAlign: "center" }}>Update Post</h3>
//         <Form onSubmit={updatePost}>
//           <Grid container spacing={2}>
//             <Grid item lg={8} md={8} sm={12} xs={12}>
//               <div className="my-3">
//                 <Input
//                   label="Title"
//                   variant="standard"
//                   type="text"
//                   id="title"
//                   placeholder="Title"
//                   className="rounded-0"
//                   name="title"
//                   value={post.title}
//                   onChange={(event) => handleChange(event, "title")}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//               <div className="my-3" style={{ border: "1px solid #ccc" }}>
//                 <div style={{ display: "flex", justifyContent: "end" }}>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("bold")}
//                     style={{ margin: "10px" }}
//                   >
//                     Bold
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("italic")}
//                     style={{ margin: "10px" }}
//                   >
//                     Italic
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("underline")}
//                     style={{ margin: "10px" }}
//                   >
//                     Underline
//                   </Button>
//                 </div>
//                 <div
//                   ref={contentEditableRef}
//                   id="contentField"
//                   contentEditable
//                   style={{
//                     border: "1px solid #ccc",
//                     padding: "10px",
//                     maxHeight: "35vh",
//                     minHeight: "35vh",
//                     overflowY: "auto",
//                   }}
//                   onChange={handleContentChange}
//                   suppressContentEditableWarning={true}
//                   dangerouslySetInnerHTML={{ __html: post.content }}
//                 ></div>
//               </div>
//             </Grid>
//             <Grid
//               item
//               lg={4}
//               md={4}
//               sm={12}
//               xs={12}
//               style={{ display: "flex", flexDirection: "column" }}
//             >
//               <div className="my-3">
//                 <label htmlFor="image">Select Post Banner</label>
//                 <Input id="image" type="file" onChange={handleImageChange} />
//               </div>
//               {post && (
//                 <div className="my-3">
//                   <img
//                     src={BASE_URL + "/api/post/image/" + post.imageName}
//                     alt=""
//                     className="obj-con w-50per"
//                   />
//                 </div>
//               )}
//               <div className="my-3">
//                 <Input
//                   type="select"
//                   className="rounded-0"
//                   name="categoryId"
//                   id="category"
//                   onChange={(event) => handleChange(event, "categoryId")}
//                   value={post.categoryId}
//                 >
//                   <option disabled value={0}>
//                     ---Select Category---
//                   </option>
//                   {categories.map((category) => (
//                     <option
//                       value={category.categoryId}
//                       key={category.categoryId}
//                     >
//                       {category.categoryTitle}
//                     </option>
//                   ))}
//                 </Input>
//               </div>
//               <div>
//                 <Switch
//                   {...label}
//                   checked={post.active}
//                   onChange={(event) =>
//                     setPost({ ...post, active: event.target.checked })
//                   }
//                 />
//               </div>

//               <Container className="text-center">
//                 <Button
//                   type="submit"
//                   color="secondary"
//                   className="rounded-0 mx-1 mt-2"
//                 >
//                   Update Post
//                 </Button>

//                 <Button color="danger" className="rounded-0 mx-1 mt-2">
//                   Reset Content
//                 </Button>
//               </Container>
//             </Grid>
//           </Grid>
//         </Form>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Row>
//         <Col>{post && updateHtml()}</Col>
//       </Row>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loadAllCategories } from "../../Services/CategoryService";
// import { Button, Col, Container, Form, Input, Row } from "reactstrap";
// import UserContext from "../../Context/UserContext";
// import {
//   loadPost,
//   updatePostById,
//   uploadPostImage,
// } from "../../Services/PostService";
// import { Grid } from "@mui/material";
// import { BASE_URL } from "../../Services/Helper";
// import Switch from "@mui/material/Switch";

// const label = { inputProps: { "aria-label": "Switch demo" } };

// export default function UpdateBlog() {
//   const { blogId } = useParams();
//   const object = useContext(UserContext);
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState();
//   const contentEditableRef = useRef(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const fetchCatData = await loadAllCategories();
//         setCategories(fetchCatData);
//       } catch (error) {
//         toast.error("Error in Loading Categories");
//       }
//     }

//     fetchData();

//     async function loadSinglePost() {
//       try {
//         const data = await loadPost(blogId);
//         setPost({ ...data, categoryId: data.category.categoryId });
//       } catch (error) {
//         toast.error("Error in Loading Post");
//       }
//     }

//     loadSinglePost();
//   }, [blogId]);

//   useEffect(() => {
//     if (post && post.user.id !== object.user.data.id) {
//       toast.error("This is not your post!!");
//       navigate("/");
//     }
//   }, [post, object.user.data.id, navigate]);

//   const handleChange = (event, fieldName) => {
//     setPost({
//       ...post,
//       [fieldName]: event.target.value,
//     });
//   };

//   const handleImageChange = (event) => {
//     if (event.target.files.length > 0) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const handleContentInput = () => {
//     const content = contentEditableRef.current.innerHTML;
//     setPost((prevPost) => ({
//       ...prevPost,
//       content,
//     }));
//   };

//   const applyFormat = (command) => {
//     document.execCommand(command);
//     handleContentInput(); // Update state after applying format
//   };

//   const updatePost = async (event) => {
//     try {
//       event.preventDefault();
//       let updatedPost = { ...post, category: { categoryId: post.categoryId } };

//       if (!image) {
//         updatedPost = { ...updatedPost, imageName: post.imageName };
//       }

//       await updatePostById(updatedPost, post.postId);

//       if (image) {
//         await uploadPostImage(image, post.postId);
//       }

//       navigate("/blog/" + blogId);
//       toast.success("Your Post has been Updated");
//     } catch (error) {
//       toast.error("Error in updating post");
//     }
//   };

//   const updateHtml = () => {
//     return (
//       <div>
//         <h3 style={{ textAlign: "center" }}>Update Post</h3>
//         <Form onSubmit={updatePost}>
// <Grid container spacing={2}>
//   <Grid item lg={8} md={8} sm={12} xs={12}>
//               <div className="my-3">
//                 <Input
//                   label="Title"
//                   variant="standard"
//                   type="text"
//                   id="title"
//                   placeholder="Title"
//                   className="rounded-0"
//                   name="title"
//                   value={post.title}
//                   onChange={(event) => handleChange(event, "title")}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//               <div className="my-3" style={{ border: "1px solid #ccc" }}>
//                 <div style={{ display: "flex", justifyContent: "end" }}>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("bold")}
//                     style={{ margin: "10px" }}
//                   >
//                     Bold
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("italic")}
//                     style={{ margin: "10px" }}
//                   >
//                     Italic
//                   </Button>
//                   <Button
//                     color="secondary"
//                     onClick={() => applyFormat("underline")}
//                     style={{ margin: "10px" }}
//                   >
//                     Underline
//                   </Button>
//                 </div>
//                 <div
//                   ref={contentEditableRef}
//                   id="contentField"
//                   contentEditable
//                   style={{
//                     border: "1px solid #ccc",
//                     padding: "10px",
//                     maxHeight: "35vh",
//                     minHeight: "35vh",
//                     overflowY: "auto",
//                   }}
//                   onInput={handleContentInput} // Use onInput for capturing changes
//                   suppressContentEditableWarning={true}
//                   dangerouslySetInnerHTML={{ __html: post.content }}
//                 />
//               </div>
//             </Grid>
// <Grid
//   item
//   lg={4}
//   md={4}
//   sm={12}
//   xs={12}
//   style={{ display: "flex", flexDirection: "column" }}
// >
// <div className="my-3">
//   <label htmlFor="image">Select Post Banner</label>
//   <Input id="image" type="file" onChange={handleImageChange} />
// </div>
// {post && (
//   <div className="my-3">
//     <img
//       src={BASE_URL + "/api/post/image/" + post.imageName}
//       alt=""
//       className="obj-con w-50per"
//     />
//   </div>
// )}
//               <div className="my-3">
//                 <Input
//                   type="select"
//                   className="rounded-0"
//                   name="categoryId"
//                   id="category"
//                   onChange={(event) => handleChange(event, "categoryId")}
//                   value={post.categoryId}
//                 >
//                   <option disabled value={0}>
//                     ---Select Category---
//                   </option>
//                   {categories.map((category) => (
//                     <option
//                       value={category.categoryId}
//                       key={category.categoryId}
//                     >
//                       {category.categoryTitle}
//                     </option>
//                   ))}
//                 </Input>
//               </div>
              // <div>
              //   <Switch
              //     {...label}
              //     checked={post.active}
              //     onChange={(event) =>
              //       setPost({ ...post, active: event.target.checked })
              //     }
              //   />
              // </div>

//               <Container className="text-center">
//                 <Button
//                   type="submit"
//                   color="secondary"
//                   className="rounded-0 mx-1 mt-2"
//                 >
//                   Update Post
//                 </Button>

//                 <Button color="danger" className="rounded-0 mx-1 mt-2">
//                   Reset Content
//                 </Button>
//               </Container>
//             </Grid>
//           </Grid>
//         </Form>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Row>
//         <Col>{post && updateHtml()}</Col>
//       </Row>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loadAllCategories } from "../../Services/CategoryService";
// import { Button, Col, Container, Form, Input, Row } from "reactstrap";
// import UserContext from "../../Context/UserContext";
// import {
//   loadPost,
//   updatePostById,
//   uploadPostImage,
// } from "../../Services/PostService";
// import { Grid } from "@mui/material";
// import { BASE_URL } from "../../Services/Helper";

import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";
import { loadAllCategories } from "../../Services/CategoryService";
import JoditEditor from "jodit-react";
import {
  loadPost,
  updatePostById,
  uploadPostImage,
} from "../../Services/PostService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { BASE_URL } from "../../Services/Helper";
import { Grid } from "@mui/material";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const UpdateBlog = () => {
  const { blogId } = useParams();
  const editor = useRef(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
    imageName: "",
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchCatData = await loadAllCategories();
        setCategories(fetchCatData);
      } catch (error) {
        toast.error("Error loading categories");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadSinglePost = async () => {
      try {
        const data = await loadPost(blogId);
        setPost({ ...data, categoryId: data.category.categoryId });
      } catch (error) {
        toast.error("Error loading post");
      }
    };

    loadSinglePost();
  }, [blogId]);

  useEffect(() => {
    if (post.user && userContext.user.data.id !== post.user.id) {
      toast.error("This is not your post!!");
      navigate("/");
    }
  }, [post, userContext, navigate]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();

    if (!post.title.trim() || !post.content.trim() || !post.categoryId) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const updatedPost = {
        ...post,
        category: { categoryId: post.categoryId },
        imageName: image ? undefined : post.imageName, // Keep old image name if no new image
      };

      await updatePostById(updatedPost, post.postId);

      if (image) {
        await uploadPostImage(image, post.postId);
      }

      toast.success("Your post has been updated");
      navigate(`/blog/${blogId}`);
    } catch (error) {
      toast.error("Error updating post");
      console.error(error);
    }
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
  };

  return (
    <div className="wrapper">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          <h3>What’s on your mind?</h3>
          <Form onSubmit={updatePost}>
            <Grid container spacing={2}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <div className="my-3">
                  <Label for="title">Post Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Enter here"
                    className="rounded-0"
                    name="title"
                    value={post.title}
                    onChange={(e) => handleChange(e, "title")}
                  />
                </div>

                <div className="my-3">
  <Label for="content">Post Content</Label>
  <JoditEditor
    ref={editor}
    value={post.content}
    onChange={contentFieldChanged}

  />
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
                {" "}
                <div className="my-3">
                  <label htmlFor="image">Select Post Banner</label>
                  <Input id="image" type="file" onChange={handleImageChange} />
                </div>
                {post && (
                  <div className="my-3">
                    <img
                      src={BASE_URL + "/api/post/image/" + post.imageName}
                      alt=""
                      className="obj-con w-50per"
                    />
                  </div>
                )}
                <div className="my-3">
                  <Label for="category">Post Category</Label>
                  <Input
                    type="select"
                    id="category"
                    className="rounded-0"
                    name="categoryId"
                    value={post.categoryId}
                    onChange={(e) => handleChange(e, "categoryId")}
                  >
                    <option disabled value="">
                      --Select category--
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

                <Container className="text-center">
                  <Button
                    type="submit"
                    color="secondary"
                    className="rounded-0 mx-1 mt-2"
                  >
                    Update Post
                  </Button>
                  <Button
                    type="button"
                    className="rounded-0 ms-2"
                    color="danger"
                    onClick={() =>
                      setPost({ title: "", content: "", categoryId: "" })
                    }
                  >
                    Reset Content
                  </Button>
                </Container>
              </Grid>
            </Grid>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateBlog;
