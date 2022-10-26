import { Routes, Route } from "react-router-dom";
import FCLoginPage from "./Pages/FCLoginPage";
import FCSuperHomePage from "./Pages/FCSuperHomePage";
import FCStudentHomePage from "./Pages/FCStudentHomePage";
import FCTypeOfUser from "./Pages/FCTypeOfUser";
import FCSearchClassesPage from "./Pages/FCSearchClassesPage";
import "bootstrap/dist/css/bootstrap.min.css";
import FCStudentRequestPage from "./Pages/FCStudentRequestPage";
import FCSuperStudentRequestPage from "./Pages/FCSuperStudentRequestPage.jsx";
import FCSuperStudentRequestPage2 from "./Pages/FCSuperStudentRequestPage2.jsx";
import FCCreateNewClass from "./FuncionlComps/FCCreateNewClass";
import FCUpdateProfileSuper from "./Pages/FCUpdateProfileSuper";
import FCHistoryClassSuper from "./Pages/FCHistoryClassSuper";
import FCFutreClasses from "./Pages/FCFutreClasses";
import CCAdminHomePage from "./Pages/CCAdminHomePage";
import CCHandleRequest from "./Pages/CCHandleRequest";
import FCShowProfileSuperStudent from "./Pages/FCShowProfileSuperStudent";
import FCUpdateSuperClassPage from "./Pages/FCUpdateSuperClassPage";
import FCChangePasswordPage from "./Pages/FCChangePasswordPage";
import FCClassForStudent from "./FuncionlComps/FCClassForStudent";
import FCNewPasswordPage from "./Pages/FCNewPasswordPage";
import FCTagsInput from "./FuncionlComps/FCTagsInput";
import FCTgasRequestPage from "./Pages/FCTgasRequestPage";
import FCShowSuperFutureClasses from "./Pages/FCShowSuperFutureClasses";
import FCNotificationsTagsForStudent from "./Pages/FCNotificationsTagsForStudent";
import FCBestToTeach from "./Pages/FCBestToTeach";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FCLoginPage />} />
      <Route path="/studentHomePage" element={<FCStudentHomePage />} />
      <Route path="/superHomePage" element={<FCSuperHomePage />} />
      <Route path="/adminHomePage" element={<CCAdminHomePage />} />
      <Route path="/reqDetails" element={<CCHandleRequest />} />
      <Route path="/searchClassesPage" element={<FCSearchClassesPage />} />
      <Route path="/StudentRequestPage" element={<FCStudentRequestPage />} />
      <Route path="/SuperStudentRequestPage" element={<FCSuperStudentRequestPage />} />
      <Route path="/SuperStudentRequestPage2" element={<FCSuperStudentRequestPage2 />} />
      <Route path="/typeOfUser" element={<FCTypeOfUser />} />
      <Route path="/CreateNewClass" element={<FCCreateNewClass />} />
      <Route path="/UpdateProfileSuper" element={<FCUpdateProfileSuper />} />
      <Route path="/HistoryClassSuper" element={<FCHistoryClassSuper />} />
      <Route path="/FutreClasses" element={<FCFutreClasses />} />
      <Route path="/ShowProfileSuperStudent" element={<FCShowProfileSuperStudent />} />
      <Route path="/UpdateSuperClassPage" element={<FCUpdateSuperClassPage />} />
      <Route path="/changePasswordPage" element={<FCChangePasswordPage />} />
      <Route path="/classForStudent" element={<FCClassForStudent />} />
      <Route path="/newPasswordPage" element={<FCNewPasswordPage />} />
      <Route path="/insertTagsPage" element={<FCTagsInput />} />
      <Route path="/adminTagsPage" element={<FCTgasRequestPage />} />
      <Route path="/showSuperFutureClasses" element={<FCShowSuperFutureClasses />} />
      <Route path="/notificationsTagsForStudent" element={<FCNotificationsTagsForStudent />} />
      <Route path="/bestToTeach" element={<FCBestToTeach />} />
    </Routes>
  );
}
