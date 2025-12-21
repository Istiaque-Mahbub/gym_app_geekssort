import Home from './pages/Home';
import Clubs from './pages/Clubs';
import Classes from './pages/Classes';
import App from './pages/App';
import About from './pages/About';
import Contact from './pages/Contact';
import Packages from './pages/Packages';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Clubs": Clubs,
    "Classes": Classes,
    "App": App,
    "About": About,
    "Contact": Contact,
    "Packages": Packages,
    "Blogs": Blogs,
    "BlogPost": BlogPost,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};