import React, { useState, useEffect } from "react";
import Pagination from "./Pagination.js";

export default function JobListing() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting posts");
      })
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Jobs posted by you"
            pageLimit={1}
            dataLimit={12}
          />
        </>
      ) : (
        <h1>No Posts to display</h1>
      )}
    </div>
  );
}

function Post(props) {
  const { title, body } = props.data;
  return (
    <div className="post">
      <h1 className="card-title">{title}</h1>
      <p className="">{body}</p>
      <button className=""> View Applications </button>
    </div>
  );
}
