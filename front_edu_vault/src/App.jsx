import Main from './page/main'; // главгая стр с дисциплинами 
import Entrance from './page/page_input'; // вход
import LabWorksPage from './page/laboratory_work'; // список лаб по определенной жисциплине 
import LabPage from './page/laba_page'; // определенная лаба ( например лаба 1)
import AdminDirectionSecretary from './page/AdminDirectionSecretary'; // страница где добавляем направления и серкетарией 
//import Admin_main_page from './page/admin_main_page';
import Secretary_Direction from './page/Secretary_Direction_Main';
import AdminMenuF from './page/AdminMenu';// добавляем факультеты
import Groups from './components/Groups'; // группы
import Courses from './components/Courses'; // курсы
import LK from './page/lk';//личный кабинет



import PersonalCabinet from './components/PersonalCabinet';
import DisciplineCard from './components/DisciplineCard';
import LabWorkCard from './components/laba';
//import LoginFormAdmin from './components/admin_entrance'; 
import AdminMenu from './components/main_admin';
import FacultyDetails from './components/adding_directions';
import FacultyBanner from './components/FacultyBanner';
import SecretaryRegistration from './components/SecretaryRegistration';
import Secretary_Direction_Main from './components/Secretary_Direction_Main';
import Footer from './components/footer ';
import Header from './components/header';
import LoginForm from './components/entrance';
import  DisciplineList from './components/main_user'
import Switcher from './components/switcher'

function App() {

  return (
    <>
     <LK/> 
    </>
  )
}

export default App
