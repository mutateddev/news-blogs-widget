import Calendar from './Calendar';
import Weather from './Weather';
import './News.css';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsModal from './NewsModal';
import Bookmarks from './Bookmarks';
import blogImg1 from '../assets/images/blog1.jpg';
import blogImg2 from '../assets/images/blog2.jpg';
import blogImg3 from '../assets/images/blog3.jpg';
import blogImg4 from '../assets/images/blog4.jpg';
import { Edit, XCircle } from '@boxicons/react';

const categories = [
  'general',
  'world',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
  'nation',
];

const News = ({ onShowBlogs }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectCategory] = useState('sports');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    return savedBookmarks;
  });
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);

  const handleSelectArticle = article => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseArticle = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  useEffect(
    function () {
      const fetchNews = async () => {
        let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=a951525cc89e03057b19aa1985fbc608`;

        if (searchQuery) {
          url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=a951525cc89e03057b19aa1985fbc608`;
        }

        const res = await axios.get(url);
        const fetchedNews = res.data.articles;
        fetchedNews.forEach(article => {
          if (!article.image) article.image = noImg;
        });

        setHeadline(fetchedNews.at(0));
        setNews(fetchedNews.slice(1, 7));
      };

      fetchNews();
    },
    [selectedCategory, searchQuery],
  );

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectCategory(category);
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput('');
  };

  const handleBookmarkClick = article => {
    setBookmarks(prevBookmarks => {
      const updatedBookmarks = prevBookmarks.find(
        b => b.title === article.title,
      )
        ? prevBookmarks.filter(b => b.title !== article.title)
        : [...prevBookmarks, article];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  return (
    <div className='news'>
      <header className='news-header'>
        <h1 className='logo'>News & Blogs</h1>
        <div className='search-bar'>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Search News...'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type='submit'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </form>
        </div>
      </header>
      <div className='news-content'>
        <div className='navbar'>
          <div className='user' onClick={onShowBlogs}>
            <img src={userImg} alt='User Image' />
            <p>Mary's Blog</p>
          </div>
          <nav className='categories'>
            <h1 className='nav-heading'>Categories</h1>
            <div className='nav-links'>
              {categories.map(category => (
                <a
                  href='#'
                  key={category}
                  className='nav-link'
                  onClick={e => {
                    handleCategoryChange(e, category);
                  }}
                >
                  {category}
                </a>
              ))}

              <a
                href='#'
                className='nav-link'
                onClick={() => setShowBookmarksModal(true)}
              >
                Bookmarks
                <i className='fa-solid fa-bookmark'></i>
              </a>
            </div>
          </nav>
        </div>
        <div className='news-section'>
          {headline && (
            <div
              className='headline'
              onClick={() => handleSelectArticle(headline)}
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className='headline-title'>
                {headline.title}
                <i
                  className={`
                    ${bookmarks.some(b => b.title === headline.title) ? 'fa-solid' : 'fa-regular'}
                    fa-regular fa-bookmark bookmark`}
                  onClick={e => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}
          <div className='news-grid'>
            {news.map((article, i) => {
              return (
                <div
                  className='news-grid-item'
                  key={i}
                  onClick={() => handleSelectArticle(article)}
                >
                  <img src={article.image || noImg} alt={news.title} />
                  <h3>
                    {article.title}
                    <i
                      className={`
                    ${bookmarks.some(b => b.title === article.title) ? 'fa-solid' : 'fa-regular'}
                    fa-regular fa-bookmark bookmark`}
                      onClick={e => {
                        e.stopPropagation();
                        handleBookmarkClick(article);
                      }}
                    ></i>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={handleCloseArticle}
        />
        <Bookmarks
          bookmarks={bookmarks}
          show={showBookmarksModal}
          onClose={() => setShowBookmarksModal(false)}
          onSelectArticle={handleBookmarkClick}
          onDeleteBookmark={handleBookmarkClick}
        />
        <div className='my-blogs'>
          <h1 className='my-blogs-heading'>My Blogs</h1>
          <div className='blog-posts'>
            <div className='blog-post'>
              <img src={blogImg1} alt='Post Image' />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className='post-buttons'>
                <button className='edit-post'>
                  <Edit />
                </button>
                <button className='delete-post'>
                  <XCircle />
                </button>
              </div>
            </div>
            <div className='blog-post'>
              <img src={blogImg2} alt='Post Image' />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className='post-buttons'>
                <button className='edit-post'>
                  <Edit />
                </button>
                <button className='delete-post'>
                  <XCircle />
                </button>
              </div>
            </div>
            <div className='blog-post'>
              <img src={blogImg3} alt='Post Image' />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className='post-buttons'>
                <button className='edit-post'>
                  <Edit />
                </button>
                <button className='delete-post'>
                  <XCircle />
                </button>
              </div>
            </div>
            <div className='blog-post'>
              <img src={blogImg4} alt='Post Image' />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className='post-buttons'>
                <button className='edit-post'>
                  <Edit />
                </button>
                <button className='delete-post'>
                  <XCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='weather-calendar'>
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className='news-footer'>
        <p>
          <span>News & Blogs Widget</span>
        </p>
        <p>&copy; All Right Reserved. By Code And Create</p>
      </footer>
    </div>
  );
};

export default News;
