export const getblogs=()=>{
    return JSON.parse(localStorage.getItem("blogs")) || [];
};
export const setblogs=(blogs)=>{
    localStorage.setItem("blogs",JSON.stringify(blogs));
};

//Auto purge deleted blogs after 7 days (7*24*60*60*1000 miliseconds) (brain task)
const purge_days = 7;
const purge_time = purge_days * 24 * 60 * 60 * 1000;
export const autoPurgeBlogs = () => {
  const current = Date.now();
  const blogs = getblogs();

  const cleanedBlogs = blogs.filter(bl => {
    // keeping  non-deleted blogs data
    if (!bl.deleted) return true;

    // keep the  deleted blogs only if delete done within purge time(less then 7 days)
    return current - bl.deletedAt < purge_time;
  });

  // update the storage only if purge happened due  to deleted blogs
  if (cleanedBlogs.length !== blogs.length) {
    setblogs(cleanedBlogs);
  }

  return cleanedBlogs;
};