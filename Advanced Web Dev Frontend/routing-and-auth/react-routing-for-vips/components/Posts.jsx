/**
 * Posts component fetches and displays a list of posts for VIP users.
 * 
 * This component:
 * - Dispatches an action to fetch posts when it mounts.
 * - Redirects non-VIP users to the login page.
 * - Displays a loading message while posts are being fetched.
 * - Displays an error message if there is an error fetching posts.
 * - Displays a list of posts if they are successfully fetched.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/store";
import { Navigate } from "react-router-dom";

export default function Posts() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);
  
    //TESTING
    useEffect(() => {
      if(posts.length === 0)
      {
        dispatch(fetchPosts());
      }
    }, [dispatch, posts]);

  if (!user) return <Navigate to="/login" />; // Redirect non-VIP users
  if (loading) return <div className="container"><h2>Loading posts...</h2></div>;
  if (error) return <div className="container"><h2>Error: {error}</h2></div>;

  return (
    <div className="container posts-container">
      <h1>VIP Posts</h1>
      <ul id="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>Title: {post.title}</h3>
            <p>Content: {post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
