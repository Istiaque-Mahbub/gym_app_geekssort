import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import App from './pages/App';
import BannerManager from './pages/BannerManager';
import BlogManager from './pages/BlogManager';
import BlogPost from './pages/BlogPost';
import Blogs from './pages/Blogs';
import BookingManager from './pages/BookingManager';
import Challenges from './pages/Challenges';
import ClassManager from './pages/ClassManager';
import ClassSchedule from './pages/ClassSchedule';
import ClassScheduleManager from './pages/ClassScheduleManager';
import Classes from './pages/Classes';
import ClubManager from './pages/ClubManager';
import Clubs from './pages/Clubs';
import Contact from './pages/Contact';
import ContentManager from './pages/ContentManager';
import FAQs from './pages/FAQs';
import Home from './pages/Home';
import InitializeSuperAdmin from './pages/InitializeSuperAdmin';
import InquiryManager from './pages/InquiryManager';
import MealPlanner from './pages/MealPlanner';
import MyBookings from './pages/MyBookings';
import NotificationSettings from './pages/NotificationSettings';
import PackageManager from './pages/PackageManager';
import Packages from './pages/Packages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProgressTracker from './pages/ProgressTracker';
import PromoBannerManager from './pages/PromoBannerManager';
import SiteSettingsManager from './pages/SiteSettingsManager';
import SuperAdminPanel from './pages/SuperAdminPanel';
import TermsOfService from './pages/TermsOfService';
import TrainerDetail from './pages/TrainerDetail';
import UserDashboard from './pages/UserDashboard';
import UserManager from './pages/UserManager';
import VisitorAnalytics from './pages/VisitorAnalytics';
import WorkoutPlanner from './pages/WorkoutPlanner';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminDashboard": AdminDashboard,
    "App": App,
    "BannerManager": BannerManager,
    "BlogManager": BlogManager,
    "BlogPost": BlogPost,
    "Blogs": Blogs,
    "BookingManager": BookingManager,
    "Challenges": Challenges,
    "ClassManager": ClassManager,
    "ClassSchedule": ClassSchedule,
    "ClassScheduleManager": ClassScheduleManager,
    "Classes": Classes,
    "ClubManager": ClubManager,
    "Clubs": Clubs,
    "Contact": Contact,
    "ContentManager": ContentManager,
    "FAQs": FAQs,
    "Home": Home,
    "InitializeSuperAdmin": InitializeSuperAdmin,
    "InquiryManager": InquiryManager,
    "MealPlanner": MealPlanner,
    "MyBookings": MyBookings,
    "NotificationSettings": NotificationSettings,
    "PackageManager": PackageManager,
    "Packages": Packages,
    "PrivacyPolicy": PrivacyPolicy,
    "ProgressTracker": ProgressTracker,
    "PromoBannerManager": PromoBannerManager,
    "SiteSettingsManager": SiteSettingsManager,
    "SuperAdminPanel": SuperAdminPanel,
    "TermsOfService": TermsOfService,
    "TrainerDetail": TrainerDetail,
    "UserDashboard": UserDashboard,
    "UserManager": UserManager,
    "VisitorAnalytics": VisitorAnalytics,
    "WorkoutPlanner": WorkoutPlanner,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};