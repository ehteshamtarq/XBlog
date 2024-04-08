import React from "react";
import styles from "./BlogList.module.css";

const BlogList = ({content, title}) => {
  return (
    <div className={styles.container} style={{width: "610px"}}>
      <div className={styles.item} style={{width:"610px"}}>
        <div className={styles.item_in}>
          <h4 className={styles.h4}>{title}</h4>
          <div className={styles.seperator}></div>
          <p className={styles.p}>
            {content}
          </p>
          <a className={styles.a} href="#">
            Read More
            <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
