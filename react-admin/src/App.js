import Home from "./pages/home/Home";
import SignIn from "./pages/login/SignIn";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Edit from "./pages/new/Edit";
import NewCourse from "./pages/new/NewCourse";
import NewEbook from "./pages/new/NewEbook";
import CreateToCourses from "./pages/new/CreateToCourses";
import CreateToEbook from "./pages/new/CreateToEbook";
import ExpertData from "./components/datatable/ExpertData";
import BookingSessionData from "./components/datatable/BookingSession";
import OnlineInspectionData from "./components/datatable/OnlineInspectionData";
import OnsiteInspectionData from "./components/datatable/OnsiteInspectionData";
import PocketGarageData from "./components/datatable/PocketGarageData";
import Booking from "./components/datatable/booking";
import Course from "./components/datatable/Course";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { productInputs, userInputs,ExpertInputs,addToLectureInputs,CreateInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Protected from "./components/Protected";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (

    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
        <Route path="/">
  <Route path="/" element={<Protected><Home /></Protected>} />
  <Route path="login" element={<SignIn />} />
  <Route path="users">
    <Route index element={<List />} />
    <Route path=":userId" element={<Protected><Single /></Protected>} />
    <Route
      path="new"
      element={<New inputs={userInputs} title="Add New User" />}
    />
  </Route>
  <Route path="products">
    <Route index element={<List />} />
    <Route path=":productId" element={<Single />} />
    <Route
      path="new"
      element={<New inputs={productInputs} title="Add New Product" />}
    />
  </Route>
  <Route path="expert">
    <Route index element={<Protected><ExpertData /></Protected>} />
    <Route path="new" element={<New inputs={ExpertInputs} title="Add New Expert" />} />
    <Route path="Edit" element={<Edit inputs={ExpertInputs} title="Edit Expert" />} />
    <Route
      path=":expertId/booking-sessions"
      element={<BookingSessionData />}
    />
    <Route
      path=":expertId/online-inspections"
      element={<OnlineInspectionData />}
    />
    <Route
      path=":expertId/onsite-inspections"
      element={<OnsiteInspectionData />}
    />
    <Route
      path=":expertId/pocket-garages"
      element={<PocketGarageData />}
    />
  </Route>
  <Route path="Booking">
    <Route index element={<Protected><Booking /></Protected>} />
    <Route path ="new" element={<CreateToEbook inputs={CreateInputs} title="Add New Booking" />} />
    {/* <Route path=":id" element={<NewEbook inputs={addToLectureInputs} title="Add New Booking />} /> */}
    <Route
      path=":id"
      element={<NewEbook inputs={addToLectureInputs} title="Add New Ebook" />}
    />
  </Route>
  <Route path="course">
              <Route index element={<Protected><Course /></Protected>}/>
              <Route path="createcourse" element={<CreateToCourses inputs={CreateInputs} title="Create New Course " />} />
              <Route path=":id" element={<NewCourse inputs={addToLectureInputs} title="Add New Courses" />} />

            </Route>
</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
