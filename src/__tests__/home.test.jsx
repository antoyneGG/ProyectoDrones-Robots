import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Grid from '../pages/home'
import Page from '../pages/home'

describe('home', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })

  it("renders the grid correctly", () => {
    render(<Grid columns={1}/>)

    const heading = screen.getByRole("heading", { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})