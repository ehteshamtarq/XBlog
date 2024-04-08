import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../../graphql/queries";
import MenuAppBar from "../MenuAppBar";
import styles from "./Blog.module.css";
import BlogList from "./BlogList";

const Blog = () => {
  const { loading, data, error } = useQuery(GET_BLOGS);
  console.log(data);
  return (
    <div className={styles.mainComponent}>
      <div>
        <MenuAppBar />
        {loading && <p>Loading...</p>}
        {error && <p>Error...</p>}
      </div>
      {data && data.blogs.map(({content, id, title})=>(
        <BlogList key={id} content={content} title={title}/>

      ))}
      
    </div>
  );
};

export default Blog;
