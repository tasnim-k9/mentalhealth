import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ForumPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  // Track view when component mounts
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch(`/api/forum/posts/${postId}/view`, {
          method: 'POST'
        });
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };
    
    trackView();
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}`);
      const postData = await response.json();
      setPost(postData);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const handleReply = async () => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: replyContent })
      });
      
      if (response.ok) {
        setReplyContent('');
        fetchPost(); // Refresh post to show new reply
      }
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <p>By {post.author.username} • {post.views} views • {post.replyCount} replies</p>
      <div className="post-content">{post.content}</div>
      
      <h2>Replies</h2>
      {post.replies.map(reply => (
        <div key={reply._id} className="reply">
          <p>{reply.content}</p>
          <small>By {reply.author.username}</small>
        </div>
      ))}
      
      <div className="reply-form">
        <textarea 
          value={replyContent} 
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write your reply..."
        />
        <button onClick={handleReply}>Post Reply</button>
      </div>
    </div>
  );
};

export default ForumPost;