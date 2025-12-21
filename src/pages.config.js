import About from './pages/About';
import App from './pages/App';
import BlogPost from './pages/BlogPost';
import Blogs from './pages/Blogs';
import Classes from './pages/Classes';
import Clubs from './pages/Clubs';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Packages from './pages/Packages';
import ClassSchedule from './pages/ClassSchedule';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "App": App,
    "BlogPost": BlogPost,
    "Blogs": Blogs,
    "Classes": Classes,
    "Clubs": Clubs,
    "Contact": Contact,
    "Home": Home,
    "Packages": Packages,
    "ClassSchedule": ClassSchedule,
    "FAQs": FAQs,
    "PrivacyPolicy": PrivacyPolicy,
    "TermsOfService": TermsOfService,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};