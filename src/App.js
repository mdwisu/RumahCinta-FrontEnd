import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// ! user
// profile
import ProfilePage from "./pages/ProfilePage";
// blog
import ListBlogPage from "./pages/BlogPage/ListBlogPage";
import DetailBlogPage from "./pages/BlogPage/DetailBlogPage";
// video
import ListVideo from "./pages/VideoPage/ListVideoPage";
import DetailVideoPage from "./pages/VideoPage/DetailVideoPage";
// tes
import ListTes from "./pages/TesPsikologiPage/ListTesPsikologi";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterPsikolg from "./pages/RegisterPsikolog";
import DashboardAdminPage from "./pages/Admin/DashboardAdminPage";
// import DashboardUserPage from "./pages/DashboardUserPage";
//konsul
import DetailKonsultasiPage from "./pages/KonsultasiPage/DetailKonsultasiPage";
import FormKonsultasiPage from "./components/Konsultasi/FormKonsultasi";
import ChoosePsikologPage from "./components/Konsultasi/ChoosePsikolog";
import DetailKonsultasiPasien from "./components/Konsultasi/DetailKonsultasiPasien";
import UploadPayment from "./components/Konsultasi/UploadPayment";
import DetailTesIE from "./pages/TesPsikologiPage/TesIEPage/TesIE";
import DetailKetergantunganPage from "./pages/TesPsikologiPage/Ketergantungan/DetailKetergantunganPage";

// ! Admin
// video
import ListVideoAdminPage from "./pages/Admin/videoAdminPage/ListVideoAdminPage";
import EditVideoAdminPage from "./pages/Admin/videoAdminPage/EditVideoAdminPage";
import CreateVideoAdminPage from "./pages/Admin/videoAdminPage/CreateVideoAdminPage";
// konsul
import ListKonsulAdminPage from "./pages/Admin/konsultasiAdminPage/ListKonsulAdminPage";
import DetailKonsulAdminPage from "./pages/Admin/konsultasiAdminPage/DetailKonsulAdminPage";
import EditKonsulAdminPage from "./pages/Admin/konsultasiAdminPage/EditKonsulAdminPage";
// blog
import ListBlogAdminPage from "./pages/Admin/blogAdminPage/ListBlogAdminPage";
import EditBlogAdminPage from "./pages/Admin/blogAdminPage/EditBlogAdminPage";
import CreateBlogAdminPage from "./pages/Admin/blogAdminPage/CreateBlogAdminPage";
// user
import ListUserAdminPage from "./pages/Admin/userAdminPage/ListUserAdminPage";
import EditUserAdminPage from "./pages/Admin/userAdminPage/EditUserAdminPage";
import CreateUserAdminPage from "./pages/Admin/userAdminPage/CreateUserAdminPage";
import DetailUserAdminPage from "./pages/Admin/userAdminPage/DetailUserAdminPage";
import UserDashboardGuard from "./pages/UserDashboardGuard";
import AdminDashboardGuard from "./pages/Admin/AdminDashboardGuard";
import LoginGuard from "./pages/LoginGuard";
import DashboardUser from "./components/User/DashboardUser";
import ListKonsulUser from "./components/User/ListKonsulUser";
//psikolog
import ListPsikologAdminPage from "./pages/Admin/psikologAdminPage/ListPsikologAdminPage";
import EditPsikologAdminPage from "./pages/Admin/psikologAdminPage/EditPsikologAdminPage";
//payment
import ListPaymentAdminPage from "./pages/Admin/paymentAdminPage/ListPaymentAdminPage";
import DetailPaymentAdminPage from "./pages/Admin/paymentAdminPage/DetailPaymentAdminPage";
import EditPaymentAdminPage from "./pages/Admin/paymentAdminPage/EditPaymentAdminPage";

// ! Psikolog
import DashboardPsikologPage from "./pages/Psikolog/DashboardPsikologPage";
import StatusPsikologPage from "./components/Psikolog/StatusPsikolog";
import SuccessForm from "./components/Konsultasi/SuccessForm";
import RegisterPsikolog from "./pages/RegisterPsikolog";
import ListKonsulPsikologPage from "./pages/Psikolog/ListKonsulPsikologPage";
import DetailKonsulPsikologPage from "./pages/Psikolog/DetailKonsulPsikologPage";
import StatusPenerimaan from "./components/User/StatusPenerimaan";
import DetailPsikologAdmin from "./components/Admin/psikologAdmin/DetailPsikologAdmin";
import ChatPasienPsikologPage from "./pages/Psikolog/ChatPasienPsikologPage";
import ChatPasienUser from "./components/User/ChatPasienUser";
import DetailKonsulUser from "./components/User/DetailKonsulUser";
import FaqPage from "./pages/FaqPage/FaqPage";
import ListFaqAdmin from "./components/Admin/faqAdmin/ListFaqAdmin";
import EditFaqAdmin from "./components/Admin/faqAdmin/EditFaqAdmin";
import Header2 from "./components/Header2";
import LayananDetail from "./pages/LayananPage/LayananDetail";
import RiwayatKonsultasi from "./pages/Riwayat/RiwayatKonsultasi";
import ListHistoryAdmin from "./pages/Admin/historyAdminpage/ListHistoryAdmin";
import CreateHistoryAdmin from "./pages/Admin/historyAdminpage/CreateHistoryAdmin";
import DetailHistoryAdmin from "./pages/Admin/historyAdminpage/DetailHistoryAdmin";
import EditHistoryAdmin from "./pages/Admin/historyAdminpage/EditHistoryAdmin";
import CreateUserAdminNoPassPage from "./pages/Admin/userAdminPage/CreateUserAdminNoPassPage";
import OwnerDashboardGuard from "./pages/owner/OwnerDashboardGuard";
import DashboardOwnerPage from "./pages/owner/DashboardOwnerPage";
import SummaryReport from "./pages/owner/historyOwnerPage/SummaryReport";
import PsychologistPerformance from "./pages/owner/historyOwnerPage/PsychologistPerformance";
import TrendsReport from "./pages/owner/historyOwnerPage/trendsReport";
import PatientReport from "./pages/owner/historyOwnerPage/PatientReport";
import BlogReport from "./pages/owner/blog/BlogReport";
import VideoReport from "./pages/owner/video/VideoReport";
import PatientReportPie from "./pages/owner/historyOwnerPage/PatientReportPie";

function App() {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div className="App">
      {/* {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-bgFunc ease-linear"></div>
        </div>
      ) : ()} */}
      <Routes>
        <Route path="/header2" element={<Header2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/psikolog" element={<RegisterPsikolog />} />
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FaqPage />} />
        {/* user router*/}

        <Route path="/user/dashboard" element={<DashboardUser />} />
        <Route path="/user/konsul" element={<ListKonsulUser />} />
        <Route path="/user/konsul/:id/chat" element={<ChatPasienUser />} />
        <Route
          path="/user/konsul/:id/detail"
          element={
            <UserDashboardGuard>
              <DetailKonsulUser />
            </UserDashboardGuard>
          }
        />

        <Route path="/user/status" element={<StatusPenerimaan />} />
        <Route
          path="/profile"
          element={
            <LoginGuard>
              <ProfilePage />
            </LoginGuard>
          }
        />
        <Route path="/layanan/:id" element={<LayananDetail />} />
        <Route path="/blogs" element={<ListBlogPage />} />
        <Route path="/blogs/:id" element={<DetailBlogPage />} />
        <Route path="/videos" element={<ListVideo />} />
        <Route path="/videos/:id" element={<DetailVideoPage />} />
        <Route path="/konsultasi" element={<DetailKonsultasiPage />} />
        <Route path="/konsultasi/form-konsultasi" element={<FormKonsultasiPage />} />
        <Route path="/riwayat-konsultasi" element={<RiwayatKonsultasi />} />
        <Route
          path="/konsultasi/:id/pilih-psikolog"
          element={
            <LoginGuard>
              <ChoosePsikologPage />
            </LoginGuard>
          }
        />
        <Route path="/konsultasi/:id/detail-konsul" element={<DetailKonsultasiPasien />} />
        <Route path="/konsultasi/:id/upload-payment" element={<UploadPayment />} />
        <Route path="/konsultasi/success" element={<SuccessForm />} />
        <Route path="/tes" element={<ListTes />} />
        <Route path="/tes/detail-ie" element={<DetailTesIE />} />
        <Route path="/tes/detail-gk" element={<DetailKetergantunganPage />} />
        {/* user router*/}

        {/* admin router */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminDashboardGuard>
              <DashboardAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <AdminDashboardGuard>
              <ListBlogAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/video"
          element={
            <AdminDashboardGuard>
              <ListVideoAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/konsul"
          element={
            <AdminDashboardGuard>
              <ListKonsulAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/konsul/:id/detail"
          element={
            <AdminDashboardGuard>
              <DetailKonsulAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route path="/admin/konsul/:id/edit" element={<EditKonsulAdminPage />} />
        <Route
          path="/admin/blog/create-blog"
          element={
            <AdminDashboardGuard>
              <CreateBlogAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/blog/:id/edit"
          element={
            <AdminDashboardGuard>
              <EditBlogAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/video"
          element={
            <AdminDashboardGuard>
              <ListVideoAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/video/create-video"
          element={
            <AdminDashboardGuard>
              <CreateVideoAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/video/:id/edit"
          element={
            <AdminDashboardGuard>
              <EditVideoAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route path="/admin/history" element={<ListHistoryAdmin />} />
        <Route path="/admin/history/create-history" element={<CreateHistoryAdmin />} />
        <Route path="/admin/history/:id" element={<DetailHistoryAdmin />} />
        <Route path="/admin/history/:id/edit" element={<EditHistoryAdmin />} />

        <Route
          path="/admin/user"
          element={
            <AdminDashboardGuard>
              <ListUserAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route path="/admin/user/create-user" element={<CreateUserAdminPage />} />
        <Route path="/admin/user/create-user-with-auto-pass" element={<CreateUserAdminNoPassPage />} />
        <Route path="/admin/user/:id/edit" element={<EditUserAdminPage />} />
        <Route path="/admin/user/:id/detail" element={<DetailUserAdminPage />} />
        <Route
          path="/admin/psikolog"
          element={
            <AdminDashboardGuard>
              <ListPsikologAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/psikolog/:psikolog_id/edit"
          element={
            <AdminDashboardGuard>
              <EditPsikologAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/psikolog/:psikolog_id/detail"
          element={
            <AdminDashboardGuard>
              <DetailPsikologAdmin />
            </AdminDashboardGuard>
          }
        />
        {/* pembayaran */}
        <Route
          path="/admin/payment"
          element={
            <AdminDashboardGuard>
              <ListPaymentAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/payment/:id/edit"
          element={
            <AdminDashboardGuard>
              <EditPaymentAdminPage />
            </AdminDashboardGuard>
          }
        />
        <Route
          path="/admin/payment/:id/detail"
          element={
            <AdminDashboardGuard>
              <DetailPaymentAdminPage />
            </AdminDashboardGuard>
          }
        />

        <Route path="/admin/faq" element={<ListFaqAdmin />} />
        <Route path="/admin/faq/:id/edit" element={<EditFaqAdmin />} />
        {/* admin router*/}

        {/* psikolog router */}

        <Route path="/psikolog/dashboard" element={<DashboardPsikologPage />} />
        <Route path="/psikolog/status" element={<StatusPsikologPage />} />
        <Route path="/psikolog/dashboard" element={<DashboardPsikologPage />} />
        <Route path="/psikolog/konsul/:id/chat" element={<ChatPasienPsikologPage />} />
        <Route path="/psikolog/konsul" element={<ListKonsulPsikologPage />} />
        <Route path="/psikolog/konsul/:id/detail" element={<DetailKonsulPsikologPage />} />
        {/* psikolog router */}

        {/* owner router */}
        <Route
          path="/owner/dashboard"
          element={
            <OwnerDashboardGuard>
              <DashboardOwnerPage />
            </OwnerDashboardGuard>
          }
        />
        <Route
          path="/owner/summary-report"
          element={
            <OwnerDashboardGuard>
              <SummaryReport />
            </OwnerDashboardGuard>
          }
        />
        <Route
          path="/owner/performance-psychologist"
          element={
            <OwnerDashboardGuard>
              <PsychologistPerformance />
            </OwnerDashboardGuard>
          }
        />
        <Route
          path="/owner/trends-report"
          element={
            <OwnerDashboardGuard>
              <TrendsReport />
            </OwnerDashboardGuard>
          }
        />
        <Route
          path="/owner/patient-report"
          element={
            <OwnerDashboardGuard>
              <PatientReport />
            </OwnerDashboardGuard>
          }
        />
        <Route
          path="/owner/patient-report-diagram"
          element={
            <OwnerDashboardGuard>
              <PatientReportPie />
            </OwnerDashboardGuard>
          }
        />
        <Route
          path="/owner/blog-report"
          element={
            <OwnerDashboardGuard>
              <BlogReport />
            </OwnerDashboardGuard>
          }
        />
        <Route
          path="/owner/video-report"
          element={
            <OwnerDashboardGuard>
              <VideoReport />
            </OwnerDashboardGuard>
          }
        />
        {/* owner router */}
      </Routes>
    </div>
  );
}

export default App;
