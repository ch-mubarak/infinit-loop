import React from "react";

const Post = React.forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post Id: {post.id}</p>
    </>
  );

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );
  return <div>{content}</div>;
});

export default Post;
