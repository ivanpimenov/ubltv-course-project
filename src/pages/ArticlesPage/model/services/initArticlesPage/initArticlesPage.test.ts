import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { initArticlesPage } from './initArticlesPage'
import { articlesPageActions } from '../../slices/articlesPageSlice'

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

        const searchParams = new URLSearchParams({ order: 'asc' })

        await thunk.callThunk(searchParams)

        expect(thunk.dispatch).toHaveBeenCalledWith(articlesPageActions.setOrder('asc'))
        expect(thunk.dispatch).toBeCalledTimes(8)
        expect(fetchArticlesList).toBeCalledWith({})
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

        const searchParams = new URLSearchParams()

        await thunk.callThunk(searchParams)

        expect(fetchArticlesList).not.toBeCalled()
    })
})
