import React,{useEffect,useState} from 'react'
import { getblogs ,autoPurgeBlogs, setblogs} from '../utils/Storage'
import Navbar from '../component/Navbar'

import "./Dashboard.css"
import { useNavigate } from 'react-router-dom'
import { FaPencilAlt, FaSearch, FaTrashAlt } from 'react-icons/fa'
const Dashboard = () => {
   const navigate=useNavigate();
   

  //number of blogs per page
  const pagination=5;

 const [blogs,setBlogs]=useState([]);
 const [search,setSearch]=useState("");
 const [page,setPage]=useState(1);
 //load blogs and auto purge deleted blogs
 useEffect(()=>{
    setBlogs(autoPurgeBlogs().filter(b=>!b.deleted))
 },[]);

//this uses to handel case-insensetive search
  const filtere = blogs.filter(bl =>
    bl.title.toLowerCase().includes(search.toLowerCase())
  );

  //Reset page number when searche changes
  useEffect(()=>{
    setPage(1);
  },[search]);

 //pagination calculation
  const total_Pages=Math.ceil(filtere.length/pagination);
  const startindex=(page-1)*pagination;
  const endindex=startindex+pagination;
  const paginated_Blogs=filtere.slice(startindex,endindex);

  //soft delete blog
  const handelDelete=(id)=>{
    const confirm=window.confirm("Are you sure you want to delete this blog?");
    if(!confirm) return;
    const updatedBlogs=blogs.map(bl=>{
      if(bl.id===id){
        return({...bl,deleted:true,deletedAt:Date.now()});
        }
        else{
          return bl;
        }
    });
    setblogs(updatedBlogs);
    setBlogs(updatedBlogs.filter(b=>!b.deleted));

  }


//this function formate date from iso to dd/mm/yyyy
  const formatDate = (isoDate) => {
  const publishdate = new Date(isoDate);

  const date = String(publishdate.getDate()).padStart(2, "0");
  const month = String(publishdate.getMonth() + 1).padStart(2, "0");
  const year = publishdate.getFullYear();

  return `${date}/${month}/${year}`;
};



  return<>
  <div id='dashboard'>
    <Navbar/>
    
    

     <main id='dashblogs'>
        <h2>Blogs</h2>

        {/* Search */}
        <div id='find'><i><FaSearch/></i><input type="text" placeholder="Search Using Title..." value={search} onChange={(e) => setSearch(e.target.value)}/></div>

        {/* Blog List */}
        <div id='dashbl'>
        {paginated_Blogs.length === 0 ? (<p id="default">No blogs found...</p>) 
        : (paginated_Blogs.map(blog => (
            <div key={blog.id} id='dashcon'>
              <img id='dashimg' src={blog.image} alt={blog.title}/>
              <h3>Title:{blog.title}</h3>
              <p>Ctegory:{blog.category}</p>
              <p>Author:{blog.author}</p>
              <p>Status: {blog.status}</p>
              <p>Published Date:{formatDate(blog.publishedDate)}</p>
              <p>Description:{blog.description}</p>
              <p></p>
              <button onClick={()=>navigate(`/edit/${blog.id}`)}><i id='pencil'><FaPencilAlt/></i>Edit</button>
              <button onClick={() => handelDelete(blog.id)}><i id="trash"><FaTrashAlt/></i>Delete</button>
            </div>
          ))
        )}
        </div>

        {/* Pagination Controls */}
        {total_Pages > 1 && (
          <div id='prev'>
            {/*this button to go previous page*/}
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Preview</button>
            {/*this shows current page and total pages*/}
            <span>{page} / {total_Pages}</span>
            {/*this button to go to next page*/}
            <button disabled={page === total_Pages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        )}
      </main>
  </div>
  
  </> 

}

export default Dashboard