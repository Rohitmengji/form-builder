import { useState } from "react";
import "./App.css";
import DisplayForm from "./pages/DisplayForm";
import Sidebar from "./pages/Sidebar";
import SubmittedForms from "./pages/SubmittedData";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [adminMode, setAdminMode] = useState(false);

  const handleAdminClick = (userType: string) => {
    console.log(`this is ${userType}`);
    setAdminMode(userType === "admin");
  };

  return (
    <BrowserRouter>
      <div className='flex'>
        <Sidebar onAdminClick={handleAdminClick} />
        <div className='flex flex-grow justify-center px-4'>
          <div className='w-full max-w-4xl'>
            <Routes>
              <Route path='/' element={<DisplayForm adminMode={adminMode} />} />
              <Route path='/submitted-forms' element={<SubmittedForms />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
