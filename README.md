Project Logic Explanation:-

1)Project Overview:

BlogHub is a React-based blog management system developed as part of a CRUD assignment given.
The application performs create, read, update, and delete blogs, with additional features such as image validation, pagination, search, soft delete, and auto purge logic.
All data is stored in Local Storage, show backend behaviour without using a database.

2)Technologies Used:
React (Vite)
React Router DOM
JavaScript (ES6+)
CSS
Local Storage
React Icons

3)Goals Achived:
->CRUD(Create,Read,Update,Delete) operations
->Pagination(5 items per page)
->Filters+Search
->Brain task Working(Soft Delete + Auto purge)
->Quick logic task working(Disable Save unless form data changed)
->Image Validation(JPG,PNG and Max-size 1 MB)
->Image Preview when upload(JPG/PNG,Max 1MB)
->Responsive Admin layout (Sidebar+Navbar+contents) for both desktop as well as Androids


4)Features Implemented:

1.Create Blog:
->Add blog with:
Title
Description
Category
Author
Status (Draft / Published)
Image upload

->Image validation:
Only JPG / PNG
Maximum size 1MB

->Image preview before submission

->Save button enabled only when form is modified (Quick Logic Task)



2.Read Blogs:
->Display all blogs in dashboard
->Case-insensitive search by title
->Display:
Image
Title
Category
Author
Status
Description
Published Date (DD/MM/YYYY)

3.Update Blog:
->Edit blog using dynamic route (/edit/:id)
->Pre-filled form with existing blog data
->Optional image update with validation
->Updated data saved to Local Storage

4.Soft Delete(Brain Task):
->Blogs are not permanently removed 
->On delete deleted blogs are hidden from dashboard

5.Auto Purge Logic (Brain Task):
->Deleted blogs are automatically removed after 7 days
->Auto purge runs when dashboard loads
->Local Storage updates only if purge occurs

6.Quick Logic Task(Disabled Save unless data changed):
->Save button disabled until form is modified
->Prevents empty or accidental submissions

7.Pagination:
->Displays 5 blogs per page
->Previous / Next buttons
->In between Previous / Next button Pages/Total_pages count shown
->Previous button disabled on initial page(page1)
->Next button disabled on final page(last or final page)
->Pagination resets on search

8.Search Function:
->Case-insensitive search by using blog title
->Works with pagination

9.Responsive UI:
->Navbar for desktop view
->Sidebar (toggle menu) for mobile view
->Sidebar opens from Navbar using menu icon and closes using cross icon

5)Project Folder Structure:
src/
 component/
   Navbar.jsx
   Sidebar.jsx

 pages/
   Dashboard.jsx
   Createblog.jsx
   Editblog.jsx

 utils/
   Storage.jsx
   Imagevalidation.jsx

 App.jsx
 main.jsx
 index.css


6)How to Run the Project:
->npm create vite@latest using this command first in cmd
->Then provide project name
->Then choose react
->Then choose javascript+swc
->Install dependencies:
Using npm install
->Run the project
Using npm run dev

7)Why I Choose My Approach:
I chose this project approach because it satisfies all assignment requirements using clean React logic,
demonstrates CRUD operations, soft delete with auto purge, and focuses on practical problem-solving without unnecessary backend complexity.


Name: DRUHIN CHATTERJEE
Assignment: React CRUD Assignment











