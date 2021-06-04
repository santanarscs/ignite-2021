import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts'
import { mocked } from 'ts-jest/utils'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

const posts =[
  {slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updatedAt: '10 de Abril'}
]

describe('Posts Page', () => {
  
  it('renders correctly', () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText('My New Post')).toBeInTheDocument()
  })

  xit('loads initial data', async () => {
    const getPrismicClientMoked = mocked(getPrismicClient)

    getPrismicClientMoked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post'}
              ],
              content: [
                { type: 'paragraph', text: 'Post except'}
              ]
            },
            last_publication_data: '04-01-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }]
        }
      })
    )

  })
})