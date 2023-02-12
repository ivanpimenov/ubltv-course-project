declare module '*.module.css'
declare module '*.module.scss'

// declare module '*.scss' {
//     const css: { [key: string]: string }
//     export default css
// }

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

// SVGR
declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __IS_DEV__: boolean;

// SVG
// declare module '*.svg' {
//     const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
//     export default content
// }