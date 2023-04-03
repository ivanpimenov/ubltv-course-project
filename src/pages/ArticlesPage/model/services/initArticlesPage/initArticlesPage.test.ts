import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { initArticlesPage } from './initArticlesPage'

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('initArticlesPage', () => {
    test('should work if not inteded', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 0,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
                _inited: false,
            },
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toBeCalledTimes(4)
        expect(fetchArticlesList).toBeCalledWith({ page: 1 })
    })

    test('should not work if inteded', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 0,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
                _inited: true,
            },
        })

        await thunk.callThunk()

        expect(fetchArticlesList).not.toBeCalled()
    })
})
