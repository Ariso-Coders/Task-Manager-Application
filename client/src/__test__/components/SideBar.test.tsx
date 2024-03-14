import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from '../../components/sidebar/SideBar';
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useLocation, MemoryRouter } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import Task from '../../pages/Task';
import User from '../../pages/User';




const mockProps = {
  onCallback: jest.fn(),
  logoutLogic: false,
};


describe('SideBar Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <SideBar {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/ARISO Technologies/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <SideBar {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Users/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });

  test('calls onCallback when logout button is clicked', () => {
    render(
      <MemoryRouter>
        <SideBar {...mockProps} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Logout/i));
    expect(mockProps.onCallback).toHaveBeenCalledTimes(1);
    expect(mockProps.onCallback).toHaveBeenCalledWith(true);
  });

  test('navigates to "/user" page when Task link is clicked', async () => {

    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideBar {...mockProps} />
      </MemoryRouter>
    );

    // await user.click(screen.getByText(/Users/i));
    let userTitle = screen.getByRole("link", { name: /Users/i });
    // let userTitle = screen.getByText(/Users/i);
    // let userTitle = screen.getByRole('heading', {
    //   name: /user profile/i
    // });


    await user.click(userTitle);
    let userTitleAfterClick = screen.getByRole("link", { name: /Users/i });
    const computedStyle = window.getComputedStyle(userTitleAfterClick)
    console.log("user title styles after click", computedStyle)
    // expect(userTitle).toHaveStyle({color:"#1d4ed8"})
    // let userHeader = screen.getByText(/User Profile/i)
    // console.log("use hader", userHeader)
    // expect(userHeader).toBeInTheDocument();
    // expect(window.location.pathname).toBe('/user');
  });



  test("navigate correctly to /user url", async () => {
    const user = userEvent.setup();

    const routes = [
      {
        path: "/task",
        element: <Layout  > <Task />  </Layout>,

      },
      {
        path: "/user",
        element: <Layout  > <User />  </Layout>,

      },
      {
        path: "/setting",
        element: <Layout  > <div className="w-full h-full flex flex-col gap-3 items-center justify-center text-blue-600 text-xl"> <h1> SETTNG </h1>

          <p>This is setting</p>
        </div> </Layout>,

      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/task", "/user"],
      initialIndex: 2,
    });


    render(

      <RouterProvider router={router} />

    );



    const userHeader = screen.getByRole("heading", { name: /User Profile/i })
    expect(userHeader).toBeVisible();

    const setingsLink = screen.getByRole("link", { name: /Settings/i })

    expect(setingsLink).toBeVisible();

    await user.click(setingsLink);


    await waitFor(() => {
      const settingDiv = screen.getByText(/This is setting/i);
      expect(settingDiv).toBeVisible();
    });

    const userLink = screen.getByRole("link", { name: /Users/i })
    expect(userLink).toBeVisible();

    await user.click(userLink);

    await waitFor(() => {
      const userTitle = screen.getByRole("heading", {
        name: /User Profile/i
      });
      expect(userTitle).toBeVisible()
    })


  })

})