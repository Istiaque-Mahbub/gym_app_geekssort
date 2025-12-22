import About from './pages/About';
import App from './pages/App';
import BlogPost from './pages/BlogPost';
import Blogs from './pages/Blogs';
import ClassSchedule from './pages/ClassSchedule';
import Classes from './pages/Classes';
import Clubs from './pages/Clubs';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import WorkoutPlanner from './pages/WorkoutPlanner';
import MealPlanner from './pages/MealPlanner';
import ProgressTracker from './pages/ProgressTracker';
import Challenges from './pages/Challenges';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "App": App,
    "BlogPost": BlogPost,
    "Blogs": Blogs,
    "ClassSchedule": ClassSchedule,
    "Classes": Classes,
    "Clubs": Clubs,
    "Contact": Contact,
    "FAQs": FAQs,
    "Home": Home,
    "Packages": Packages,
    "PrivacyPolicy": PrivacyPolicy,
    "TermsOfService": TermsOfService,
    "WorkoutPlanner": WorkoutPlanner,
    "MealPlanner": MealPlanner,
    "ProgressTracker": ProgressTracker,
    "Challenges": Challenges,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};