import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'



jest.mock('next-auth/client')

describe('SignInButton Component', () => {
  it('renders correctly when user is not auth', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    
    render(<SignInButton />)
    
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    
  })

  it('renders correctly when user is auth', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      {
          user: {name: 'Jhon Doe', email: 'jhondoe@example.com'},
          expires: 'fake-expires'
      }
    , false])

    render(<SignInButton />)
    
    expect(screen.getByText('Jhon Doe')).toBeInTheDocument()
  })
  
})

