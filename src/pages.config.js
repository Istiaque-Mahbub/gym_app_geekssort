import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import App from './pages/App';
import BannerManager from './pages/BannerManager';
import BlogPost from './pages/BlogPost';
import Blogs from './pages/Blogs';
import Challenges from './pages/Challenges';
import ClassSchedule from './pages/ClassSchedule';
import Classes from './pages/Classes';
import Clubs from './pages/Clubs';
import Contact from './pages/Contact';
import ContentManager from './pages/ContentManager';
import FAQs from './pages/FAQs';
import Home from './pages/Home';
import InquiryManager from './pages/InquiryManager';
import MealPlanner from './pages/MealPlanner';
import NotificationSettings from './pages/NotificationSettings';
import Packages from './pages/Packages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProgressTracker from './pages/ProgressTracker';
import TermsOfService from './pages/TermsOfService';
import WorkoutPlanner from './pages/WorkoutPlanner';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminDashboard": AdminDashboard,
    "App": App,
    "BannerManager": BannerManager,
    "BlogPost": BlogPost,
    "Blogs": Blogs,
    "Challenges": Challenges,
    "ClassSchedule": ClassSchedule,
    "Classes": Classes,
    "Clubs": Clubs,
    "Contact": Contact,
    "ContentManager": ContentManager,
    "FAQs": FAQs,
    "Home": Home,
    "InquiryManager": InquiryManager,
    "MealPlanner": MealPlanner,
    "NotificationSettings": NotificationSettings,
    "Packages": Packages,
    "PrivacyPolicy": PrivacyPolicy,
    "ProgressTracker": ProgressTracker,
    "TermsOfService": TermsOfService,
    "WorkoutPlanner": WorkoutPlanner,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};