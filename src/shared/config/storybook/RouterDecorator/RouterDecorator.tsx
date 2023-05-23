// import { Story } from '@storybook/react'
// import { BrowserRouter } from 'react-router-dom'

// export const RouterDecorator = (story: () => Story) => (
//     <BrowserRouter>{story()}</BrowserRouter>
// )

import { Story, StoryContext } from '@storybook/react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'

export const RouterDecorator = (
    StoryComponent: Story,
    { parameters: { router } }: StoryContext
) => {
    if (!router) {
        return (
            <BrowserRouter>
                <StoryComponent />
            </BrowserRouter>
        )
    }
    const { path, route } = router

    return (
        <MemoryRouter initialEntries={[encodeURI(route)]}>
            <Routes>
                <Route path={path} element={<StoryComponent />} />
            </Routes>
        </MemoryRouter>
    )
}
