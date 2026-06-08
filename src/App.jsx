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

  const handleCreateBlog = newBlog => {
    setBlogs(prevBlogs => {
      const updatedBlogs = [...prevBlogs, newBlog];
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
  };

  return (
    <div className='container'>
      <div className='news-blogs-widget'>
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            blogs={blogs}
            onCreateBlog={handleCreateBlog}
          />
        )}
      </div>
    </div>
  );
};

export default App;
