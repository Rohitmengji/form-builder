import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarDaysIcon,
  File,
  FolderIcon,
  HomeIcon,
  LucideArchive,
  NotebookTextIcon,
  PlayCircleIcon,
  Settings,
  User,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  onAdminClick: (userType: string) => void; // Callback function for handling admin click
}

const Sidebar: React.FC<Props> = ({ onAdminClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = () => {
    setShowDropdown(false);
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const formattedDate: string = format(date, "yyyy-MM-dd");
      console.log(formattedDate);

      const parsedDate: Date = parseISO(formattedDate);
      setSelectedDate(parsedDate);
    }
  };

  const navigateToSubmittedForms = () => {
    navigate("/submitted-forms"); // Navigate to the '/submitted-forms' route
  };
  const navigateToHome = () => {
    navigate("/"); // Navigate to the '/submitted-forms' route
  };

  return (
    <div className='w-16  h-100 bg-white shadow-lg flex flex-col items-center py-4'>
      <div className='mb-10'>
        <div className='bg-black text-white rounded-full px-4 py-4'>RM</div>
      </div>
      <div className='flex flex-col space-y-4'>
        <Button
          className='bg-pink-200 text-pink-600 rounded-full p-3'
          onClick={navigateToHome}
        >
          <HomeIcon className='text-current' />
        </Button>

        <Button
          className='bg-transparent text-gray-600 rounded-full p-3'
          onClick={navigateToSubmittedForms}
        >
          <NotebookTextIcon className='text-current' />
        </Button>
        <Button className='bg-transparent text-gray-600 rounded-full p-3'>
          <LucideArchive className='text-current' />
        </Button>

        <Button className='bg-transparent text-gray-600 rounded-full p-3'>
          <PlayCircleIcon className='text-current' />
        </Button>
        <hr style={{ border: "1px solid grey" }} />
        <Button className='bg-transparent text-gray-600 rounded-full p-3'>
          <File className='text-current' />
        </Button>
        <Button className='bg-transparent  text-gray-600 rounded-full p-3'>
          <FolderIcon className='text-current' />
        </Button>

        {/* calendar */}
        <div>
          <Dialog>
            <DialogTrigger>
              <div
                onClick={toggleModal}
                className='bg-transparent text-gray-600 rounded-full p-3 cursor-pointer hover:bg-primary/90 '
              >
                <CalendarDaysIcon className='text-current' />
              </div>
            </DialogTrigger>
            <DialogContent>
              <Calendar
                mode='single'
                onDayClick={handleDateSelect}
                className='rounded-md border'
              />

              {selectedDate && (
                <p>Selected date: {selectedDate.toDateString()}</p>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <hr style={{ border: "1px solid grey" }} />

        <div className='relative'>
          <Button
            className='bg-transparent text-red-500 rounded-full p-3'
            onClick={toggleDropdown}
          >
            <User className='text-current' />
          </Button>
          {/* Dropdown menu */}
          {showDropdown && (
            <div className='absolute  top-2 left-16  bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
              <ul className='divide-y divide-gray-200'>
                <li
                  className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                  onClick={() => {
                    onAdminClick("admin"); // Call the callback function with parameter
                    handleDropdownItemClick(); // Close the dropdown
                  }}
                >
                  <span className='block text-sm text-gray-700'>Admin</span>
                </li>
                <li
                  className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                  onClick={() => {
                    onAdminClick("user");
                    handleDropdownItemClick();
                  }}
                >
                  <span className='block text-sm text-gray-700'>User</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Button className='bg-transparent text-red-500 rounded-full p-3'>
          <Settings className='text-current' />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
