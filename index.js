import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function BlogPost({ title, content }) {
  return (
    <div className="blog-post">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch blog posts from API
    // Example fetch code:
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const createdPost = await response.json();
      setPosts([...posts, createdPost]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <div>
      <div id="blogPosts">
        {posts.map((post, index) => (
          <BlogPost key={index} title={post.title} content={post.content} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        ></textarea>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('blogPosts'));
