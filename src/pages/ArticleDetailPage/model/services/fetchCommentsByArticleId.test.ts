import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'

const data = [
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

describe('fetchCommentsByArticleId', () => {
    test('success fetch data', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
        thunk.api.get.mockReturnValue(Promise.resolve({ data }))
        const result = await thunk.callThunk('1')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('error fetch data', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk('1')

        expect(result.meta.requestStatus).toBe('rejected')
    })
})
