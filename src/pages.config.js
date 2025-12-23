import About from './pages/About';
import App from './pages/App';
import BlogPost from './pages/BlogPost';
import Blogs from './pages/Blogs';
import Challenges from './pages/Challenges';
import ClassSchedule from './pages/ClassSchedule';
import Classes from './pages/Classes';
import Clubs from './pages/Clubs';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import Home from './pages/Home';
import MealPlanner from './pages/MealPlanner';
import Packages from './pages/Packages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProgressTracker from './pages/ProgressTracker';
import TermsOfService from './pages/TermsOfService';
import WorkoutPlanner from './pages/WorkoutPlanner';
import AdminDashboard from './pages/AdminDashboard';
import InquiryManager from './pages/InquiryManager';
import ContentManager from './pages/ContentManager';
import BannerManager from './pages/BannerManager';
import NotificationSettings from './pages/NotificationSettings';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "App": App,
    "BlogPost": BlogPost,
    "Blogs": Blogs,
    "Challenges": Challenges,
    "ClassSchedule": ClassSchedule,
    "Classes": Classes,
    "Clubs": Clubs,
    "Contact": Contact,
    "FAQs": FAQs,
    "Home": Home,
    "MealPlanner": MealPlanner,
    "Packages": Packages,
    "PrivacyPolicy": PrivacyPolicy,
    "ProgressTracker": ProgressTracker,
    "TermsOfService": TermsOfService,
    "WorkoutPlanner": WorkoutPlanner,
    "AdminDashboard": AdminDashboard,
    "InquiryManager": InquiryManager,
    "ContentManager": ContentManager,
    "BannerManager": BannerManager,
    "NotificationSettings": NotificationSettings,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};