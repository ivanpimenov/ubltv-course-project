import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId'
import { addCommentForArticle } from './addCommentForArticle'

const data = {
    id: '1',
    text: 'some comment',
    articleId: '1',
    userId: '1',
    user: {
        id: '1',
        username: 'admin',
    },
}

const authData = {
    id: '1',
    username: 'admin',
}

const commentsData = [
    {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' },
    },
    {
        id: '2',
        text: 'new comment',
        user: { id: '1', username: 'Vasya' },
    },
]

describe('addCommentForArticle', () => {
    test('success add comment for article', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: { authData },
            articleDetails: { data: { id: '1' } },
        })
        const fetchCommentTHunk = new TestAsyncThunk(fetchCommentsByArticleId)

        thunk.api.post.mockReturnValue(Promise.resolve({ data }))
        fetchCommentTHunk.api.get.mockReturnValue(Promise.resolve({ data: { ...commentsData } }))

        const result = await thunk.callThunk('some comment')
        const fetchCommentsResult = await fetchCommentTHunk.callThunk('1')

        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(fetchCommentTHunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(fetchCommentsResult.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('error add comment for article no user data', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            articleDetails: { data: { id: '1' } },
        })
        thunk.api.post.mockReturnValue(Promise.resolve({ data }))
        const result = await thunk.callThunk('some comment')
        expect(result.meta.requestStatus).toBe('rejected')
    })

    test('error add comment for article no article data', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: { authData },
        })
        thunk.api.post.mockReturnValue(Promise.resolve({ data }))
        const result = await thunk.callThunk('some comment')

        expect(result.meta.requestStatus).toBe('rejected')
    })

    test('error add comment', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: { authData },
            articleDetails: { data: { id: '1' } },
        })
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk('some comment')

        expect(result.meta.requestStatus).toBe('rejected')
    })
})
