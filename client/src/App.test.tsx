import {render, fireEvent, screen} from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('renders Vite + React title', () => {
        render(<App />);
        const titleElement = screen.getByText(/Vite \+ React/i);
        expect(titleElement).toBeInTheDocument()
    })
})