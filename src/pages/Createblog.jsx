import React, { useState, useEffect } from 'react'
import { getblogs, setblogs } from '../utils/Storage'
import { Imagevalidation } from '../utils/Imagevalidation'
import { useNavigate } from 'react-router-dom'
import "./Createblog.css"
import { FaTimesCircle } from 'react-icons/fa'
const Createblog = () => {

  //for navigate or routing
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  //Quick logic task
  const [isChanged, setIsChanged] = useState(false);


  useEffect(() => {
    if (
      title ||
      description ||
      category ||
      author ||
      status ||
      image
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [title, description, category, author, status, image]);


  //image validation
  const hndelImageValidation = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    const error = Imagevalidation(file);
    if (error) {
      setError(error);
      setImage(null);
      setPreview(null);
      // Reset file input so same file can be selected again
      e.target.value = "";
      return;
    }
    //setPreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }


  const handelSubmission = (e) => {
    e.preventDefault();
    setError("");
    if (!title || !description || !category || !author || !status || !image) {
      return setError("All fields are required");
    }

    const blogs = getblogs();
    blogs.push({
      id: crypto.randomUUID(),
      title,
      description,
      category,
      author,
      image,
      publishedDate: new Date().toISOString(),
      status,
      deleted: false,
    });

    setblogs(blogs);
    e.target.reset();
    setTitle("");
    setDescription("");
    setCategory("");
    setAuthor("");
    setStatus("");
    setImage(null);
    setPreview(null);
    setIsChanged(false);
    setPreview(null);
    alert("Blog Created Successfully");
    navigate("/");

  }
  return <>
    <div id='createblog'>
      <div id='createform'>
        <i onClick={back}><FaTimesCircle /></i>
        <form onSubmit={handelSubmission}>
          <h2>Create Blog</h2>
          <input type='text' required placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea type='text' required placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type='text' required placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type='text' required placeholder='Enter Author Name' value={author} onChange={(e) => setAuthor(e.target.value)} />
          <select required value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value=''>Select Status</option>
            <option value='Draft'>Draft</option>
            <option value='Published'>Published</option>
          </select>
          <input type='file' accept="image/png,image/jpeg" required onChange={hndelImageValidation} />
          {preview && <img id='createimg' src={preview} />}
          {error && <p>{error}</p>}
          <button type='submit' disabled={!isChanged}>Save</button>
        </form>
      </div>
    </div>
  </>
}

export default Createblog