import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import SideBar from '../../components/sidebar/SideBar';
import { Router } from 'react-router-dom';

const mockProps = {
    onCallback: jest.fn(),
    logoutLogic: false,
  };
  
  describe('SideBar Component', () => {
    test('renders without crashing', () => {
      render(<SideBar {...mockProps} />);
      expect(screen.getByText(/ARISO Technologies/i)).toBeInTheDocument();
    });
    
    test('renders navigation links', () => {
        render(<SideBar {...mockProps} />);
        expect(screen.getByText(/Task/i)).toBeInTheDocument();
        expect(screen.getByText(/Users/i)).toBeInTheDocument();
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();
      });
    
      test('calls onCallback when logout button is clicked', () => {
        render(<SideBar {...mockProps} />);
        fireEvent.click(screen.getByText(/Logout/i));
        expect(mockProps.onCallback).toHaveBeenCalledTimes(1);
        expect(mockProps.onCallback).toHaveBeenCalledWith(true);
      });
    });