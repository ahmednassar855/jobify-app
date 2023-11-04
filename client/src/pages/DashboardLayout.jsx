import Wrapper from "../assets/wrappers/Dashboard";

import { Outlet, redirect ,useLoaderData , useNavigate} from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from '../App';
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const loader = async() => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data
  } catch (error) {
    return redirect('/');
  }
}

const DashoardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
 
  const {user} = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  
  const toggleDarkTheme = () => {
    const  newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme' , newDarkTheme);
    localStorage.setItem('darkTheme' , newDarkTheme)

  };

  const toggleSidebar = () => {
    setShowSideBar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('logout success')
  };

  return (
    <DashoardContext.Provider value={{
       user, showSidebar, isDarkTheme, 
       toggleDarkTheme, toggleSidebar, logoutUser }}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page " >
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashoardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashoardContext);

export default DashboardLayout;
