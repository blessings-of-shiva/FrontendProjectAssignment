import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getblogs, setblogs } from "../utils/Storage";
import { Imagevalidation } from "../utils/Imagevalidation";
import { FaTimesCircle } from "react-icons/fa";
import "./Editblog.css"
const Editblog = () => {
    //this helps to navigate
  const navigate = useNavigate();

  const Return=()=>{
    navigate("/");
  }
   //this helps to get id from url
   const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  //This helps to load blogs data
  useEffect(() => {
    //this gets all blogs
    const blogs = getblogs();
     //this finds blog by using id
    const blog = blogs.find((bl) => bl.id === id);
    //check if blog not found
    if (!blog) {
      alert("Blog not found");
      navigate("/");
      return;
    }
    //prefill the form fileds
    setTitle(blog.title);
    setDescription(blog.description);
    setCategory(blog.category);
    setAuthor(blog.author);
    setStatus(blog.status);
    setImage(blog.image);
    setPreview(blog.image);
  }, [id, navigate]);

  //for image edit
  const handleImageupdate = (e) => {
    // Reset the error state
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    const error = Imagevalidation(file);
    if (error) {
      setError(error);
      return;
    }
    //this previews the image
    setPreview(URL.createObjectURL(file));
    //this converts image to base64
    const reader = new FileReader();
    //this loads the image
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  //update the blog data
  const handleUpdatedata = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !category || !author || !status || !image) {
      setError("All fields are required");
      return;
    }
    //this gets all blogs
    const blogs = getblogs();
   //this updates the blog data
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? 
       {
            ...blog,
            title,
            description,
            category,
            author,
            image,
            status,
        }
        : blog
    );
    //set the updated blogs
    setblogs(updatedBlogs);
    alert("Blog Updated Successfully");
    navigate("/");
  };

  return <>
  <div id="editblog">
    <div id="editform">
    <i onClick={Return}><FaTimesCircle/></i>
    <form onSubmit={handleUpdatedata}>
      <h2>Edit Blogs</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <input value={category} onChange={(e) => setCategory(e.target.value)} />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>

      <input type="file" accept="image/jpeg,image/png" onChange={handleImageupdate}/>

      {preview && <img id="editimg" src={preview} alt="preview"/>}

      {error && <p>{error}</p>}

      <button type="submit">Update Blog</button>
    </form>
    </div>
    </div>
  </>;
};

export default Editblog;
