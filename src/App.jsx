import { useState } from 'react';
import Blogs from './components/Blogs';
import News from './components/News';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);

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
        {showNews && <News onShowBlogs={handleShowBlogs} />}
        {showBlogs && <Blogs onBack={handleBackToNews} />}
      </div>
    </div>
  );
};

export default App;
