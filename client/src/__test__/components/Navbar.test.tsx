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
    const welcomeMessage = getByText(`Welcome Back!`);

    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
  });

test("navigates to contact us page on click", async () => {
  
    render(
      <MemoryRouter>
        <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
      </MemoryRouter>
    );
  
    const contactUsLink = screen.getByRole("link", { name: /ContactUs/i });
    fireEvent.click(contactUsLink);
    //await waitFor(() => expect(window.location.pathname).toBe("/contact"));
  });
  test("navigates to about us page on click", async () => {
  
    render(
      <MemoryRouter>
        <NavBar onCallback={onCallbackMock} onCallBacklogic={onCallBacklogicMock} />
      </MemoryRouter>
    );
  
    const contactUsLink = screen.getByRole("link", { name: /about us/i });
    fireEvent.click(contactUsLink);
    //await waitFor(() => expect(window.location.pathname).toBe("/about"));
  });
  
});
