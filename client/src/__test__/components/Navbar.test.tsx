import { render, fireEvent,screen,waitFor } from '@testing-library/react';
import { MemoryRouter,Router } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';

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
    const contactLink = getByText('ContactUs');
    const welcomeMessage = getByText('Welcome Back !');

    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
  });

//   test('toggles menuLogic when clicking on IoMenu icon', () => {
//     const { getByRole } = render(
//       <MemoryRouter>
//         <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
//       </MemoryRouter>
//     );

   // const menuIcon = getByRole('button', { name: 'menu icon' });

    //fireEvent.click(menuIcon);

    //expect(onCallbackMock).toHaveBeenCalledWith(true);
//   });

//   test('toggles onCallBacklogic and menuLogic when clicking on IoMenu icon', () => {
//     const { getByRole } = render(
//       <MemoryRouter>
//         <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
//       </MemoryRouter>
//     );

//     const menuIcon = getByRole('button', { name: 'menu icon' });

//     fireEvent.click(menuIcon);

//     expect(onCallbackMock).toHaveBeenCalledWith(true);
//   });

// test("navigate to about us pages",async()=>{
//     render(
//         <MemoryRouter>
//         <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
//       </MemoryRouter>

//     )
//     const aboutUsText=screen.getByText(/About Us/i);
//     fireEvent.click(aboutUsText);
//     await waitFor(() => expect(window.location.pathname).toBe("/about"));

// })

// test("navigate to contact us page",async()=>{
//     render(
//         <MemoryRouter>
//         <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
//       </MemoryRouter>
//     )  

//     const contactUsText=screen.getByText(/Contact Us/i);
//     fireEvent.click(contactUsText);
//     await waitFor(() => expect(window.location.pathname).toBe("/contact"));
// })
test("navigates to contact us page on click", async () => {
    // Mock dependencies (optional)
    // jest.fn(onCallbackMock);
    // jest.fn(onCallBacklogicMock);
  
    render(
      <MemoryRouter>
        <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
      </MemoryRouter>
    );
  
    const contactUsLink = screen.getByRole("link", { name: /ContactUs/i });
    fireEvent.click(contactUsLink);
    await waitFor(() => expect(window.location.pathname).toBe("/contact"));
  });
  
});
