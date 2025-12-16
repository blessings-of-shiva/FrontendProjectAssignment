export const Imagevalidation=(file)=>{
    const validTypes=["image/jpeg","image/png"];
    //maxsize defined
    const Maxsize=1*1024*1024;
    
    if(!validTypes.includes(file.type)){
        return "only JPG and PNG files are allowed";
    }
    if(file.size>Maxsize){
        return "image file must be under 1MB";
    }
    return null;
}