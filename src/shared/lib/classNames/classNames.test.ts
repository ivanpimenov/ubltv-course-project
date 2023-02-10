import { classNames } from './classNames';

describe('classNames', () => {
    test('test', () => {
        expect(classNames('someClass')).toBe('someClass');
    });
    test('with additional class', () => {
        const exptected = 'someClass class1 class2';
        expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(exptected);
    });
    test('with mods', () => {
        const exptected = 'someClass class1 class2 hovered scrollable';
        expect(classNames('someClass', { hovered: true, scrollable: true }, ['class1', 'class2'])).toBe(exptected);
    });
    test('with mods false', () => {
        const exptected = 'someClass class1 class2 hovered';
        expect(classNames('someClass', { hovered: true, scrollable: false }, ['class1', 'class2'])).toBe(exptected);
    });
    test('with mods undefined', () => {
        const exptected = 'someClass class1 class2 hovered';
        expect(classNames('someClass', { hovered: true, scrollable: undefined }, ['class1', 'class2'])).toBe(exptected);
    });
});
