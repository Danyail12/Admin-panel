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
import OnsiteInspection from "./components/datatable/OnsiteInspection";
import Online from "./components/datatable/Online"; 
import Pocket from "./components/datatable/Pocket";
import Product from "./components/datatable/Product";
import CreateToProduct from "./pages/new/CreateToProduct";

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
      element={<Protected>

        <New inputs={userInputs} title="Add New User" />
      </Protected> 
        }
    />
  </Route>
  <Route path="product">
    <Route index element={<Protected><Product /></Protected >} />
    <Route
      path="new"
      element={<Protected>

        <CreateToProduct inputs={productInputs} title="Add New Product" />
      </Protected> 
        }
    />
  </Route>
  <Route path="expert">
    <Route index element={<Protected><ExpertData /></Protected>} />
    <Route path="new" element={ <Protected>

    <New inputs={ExpertInputs} title="Add New Expert" />
    </Protected>
    } />
    <Route path="Edit" element={ 
    
    <Protected>

    <Edit inputs={ExpertInputs} title="Edit Expert" />
    </Protected>
    
    } />
    <Route
      path=":expertId/booking-sessions"
      element={
        <Protected>  
      <BookingSessionData />
      </Protected>
    }
    />
    <Route
      path=":expertId/online-inspections"
      element={
        <Protected>  
      <OnlineInspectionData />
      </Protected>
    }
    />
    <Route
      path=":expertId/onsite-inspections"
      element={
        <Protected>  
      <OnsiteInspectionData />
      </Protected>
    }
    />
    <Route
      path=":expertId/pocket-garages"
      element={
        <Protected>  
      <PocketGarageData />
      </Protected>
    }
    />
  </Route>
  <Route path="Booking">
    <Route index element={<Protected><Booking /></Protected>} />
    <Route path ="new" element={
    <Protected>

    <CreateToEbook inputs={CreateInputs} title="Add New Booking" />
    </Protected>
    
    
    } />
    {/* <Route path=":id" element={<NewEbook inputs={addToLectureInputs} title="Add New Booking />} /> */}
    <Route
      path=":id"
      element={
        <Protected>  
      <NewEbook inputs={addToLectureInputs} title="Add New Ebook" />
      </Protected>
    }
    />
  </Route>
  <Route path="course">
              <Route index element={<Protected><Course /></Protected>}/>
              <Route path="createcourse" element={<Protected>
                <CreateToCourses inputs={CreateInputs} title="Create New Course " />
                </Protected>
                } />
              <Route path=":id" element={
              <Protected>

              <NewCourse inputs={addToLectureInputs} title="Add New Courses" />
              </Protected>
              
              } />

            </Route>
            <Route path="onlineInspection">
              <Route index element={<Protected><Online/></Protected>}/>
             

            </Route>
            <Route path="onsiteInspection">
              <Route index element={<Protected><OnsiteInspection /></Protected>}/>
             

            </Route>

            <Route path="pocket">
              <Route index element={<Protected><Pocket /></Protected>}/>
             

            </Route>

  </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
