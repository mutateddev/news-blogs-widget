import { useState } from 'react';
import Blogs from './components/Blogs';
import News from './components/News';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs'));
    return savedBlogs || [];
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs(prevBlogs => {
      const updatedBlogs = isEdit
        ? prevBlogs.map(blog => (blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = blog => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleDeleteBlog = blog => {
    setBlogs(prvBlogs => {
      const updatedBlogs = prvBlogs.filter(b => b !== blog);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
    setIsEditing(false);
    setSelectedPost(null);
  };

  return (
    <div className='container'>
      <div className='news-blogs-widget'>
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handleDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            blogs={blogs}
            onCreateBlog={handleCreateBlog}
            editPost={selectedPost}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
};

export default App;
