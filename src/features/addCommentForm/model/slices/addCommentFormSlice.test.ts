import { AddCommentFormSchema } from '../types/addCommentForm'
import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice'

describe('addCommentFormSlice.test', () => {
    test('test set text', () => {
        const state: DeepPartial<AddCommentFormSchema> = { text: 'some text' }

        expect(addCommentFormReducer(state as AddCommentFormSchema, addCommentFormActions.setText('new text'))).toEqual(
            { text: 'new text' }
        )
    })
})
