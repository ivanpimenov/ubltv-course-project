import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice"
import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId"
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema"

const comments = [
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

describe('articleDetailsCommentsSlice', () => {
    test('test fetch article details comments service pending', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: false,
            error: 'someError',
        }

        expect(
            articleDetailsCommentsReducer(state as ArticleDetailsCommentsSchema, fetchCommentsByArticleId.pending)
        ).toEqual({
            isLoading: true,
            error: undefined,
        })
    })

    test('test fetch article details comments service fulfilled', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: true,
        }

        expect(
            articleDetailsCommentsReducer(
                state as ArticleDetailsCommentsSchema,
                fetchCommentsByArticleId.fulfilled(comments, '', '1')
            )
        ).toEqual({
            isLoading: false,
            ids: ['1', '2'],
            entities: {
                '1': {
                    ...comments[0],
                },
                '2': {
                    ...comments[1],
                },
            },
        })
    })
})
