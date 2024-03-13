import { render, fireEvent,screen,waitFor } from '@testing-library/react';
import { MemoryRouter,Router, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';
import userEvent from '@testing-library/user-event';
import Layout from '../../Layout/Layout';
import Task from '../../pages/Task';
import AboutUs from '../../pages/AboutUs';
import ContactUs from '../../pages/ContactUs';
import User from '../../pages/User';

describe('NavBar Component', () => {
  const onCallbackMock = jest.fn();
  const onCallBacklogicMock = false;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('userName', 'Ashani');
  });

  test('renders NavBar component', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
      </MemoryRouter>
    );

    const aboutLink = getByText('About Us');
    const contactLink = getByText('Contact Us');
    const welcomeMessage = getByText(`Welcome Back!`);

    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("navigate to /about and /contact url",async()=>{
    const user=userEvent.setup();
    const routes=[
      {
        path:"/task",
        element:<Layout><Task/></Layout>,
      },
      {
        path:"/about",
        element:<Layout><AboutUs/></Layout>,
      },
      {
        path:"/contact",
        element:<Layout><ContactUs/></Layout>,
      },
      {
        path:"/user",
        element:<Layout><User></User></Layout>
      }     
    ];
    const router=createMemoryRouter(routes,{
      initialEntries:["/user","/task","/about","/contact"],
      initialIndex:0,
    });

    render(
      <RouterProvider router={router}/>
    );
    //checks if we are on user page
    const userHeader = screen.getByRole("heading", { name: /User Profile/i })
    expect(userHeader).toBeVisible();
  
    //check for "about us" on navbar
    const aboutUsLink = screen.getByRole("link", { name: /About Us/i })
    expect(aboutUsLink).toBeVisible();
    await user.click(aboutUsLink)

      //check about us page
    await waitFor(() => {
      const aboutUsText = screen.getByText(/# About Us/i);
      expect(aboutUsText).toBeVisible();
    });

    //check for "contact us" on navbar
    const contactUsLink = screen.getByRole("link", { name: /Contact Us/i })
    expect(contactUsLink).toBeVisible();
    await user.click(contactUsLink);

     //check contact us page
    await waitFor(() => {
      const contactUsText = screen.getByText(/Send your message to us/i);
      expect(contactUsText).toBeVisible(); 
    });
})
});
