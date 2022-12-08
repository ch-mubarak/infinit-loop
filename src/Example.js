import React, { useRef, useState, useCallback } from "react";
import usePosts from "./hooks/usePosts";
import Post from "./Post";
const Example = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isError, error, hasNextPage, results, isLoading } = usePosts(pageNum);
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("we are near last post");
          setPageNum((pre) => pre + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, pageNum]
  );

  const content = results.map((post, index) => {
    if (results.length === index + 1) {
      console.log("last element");
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });
  return (
    <div>
      {content}
      {isLoading && <p>Loading more posts</p>}
    </div>
  );
};

export default Example;
