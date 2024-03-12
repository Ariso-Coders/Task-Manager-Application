import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom'; 
import SideBar from '../../components/sidebar/SideBar';

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

  test('navigates to "/task" page when Task link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideBar {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Task/i));
    expect(window.location.pathname).toBe('/task');
  });

  test('navigates to "/user" page when Task link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideBar {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Users/i));
    expect(window.location.pathname).toBe('/user');
  });

  test('navigates to "/task" page when Task link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideBar {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Settings/i));
    expect(window.location.pathname).toBe('/setting');
  });
});
