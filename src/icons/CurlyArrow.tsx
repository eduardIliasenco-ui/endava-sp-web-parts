import React, { ReactElement } from 'react';
import { SVGProps, memo } from 'react';

const CurlyArrow = (props: SVGProps<any>): ReactElement<SVGAElement> => (
    <svg
        className='icon'
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        {...props}
    >
        <path
            fill="#DE411B"
            d="m21.707 11.293-5-5a1 1 0 1 0-1.414 1.414L18.586 11H2V2h5a.997.997 0 0 0 .707-.293l.396-.4a.557.557 0 0 1 .397-.164c.144 0 .287.054.397.164l.396.4a1 1 0 1 0 0-1.414l-.396.4A.556.556 0 0 1 8.5.857a.557.557 0 0 1-.397-.164l-.396-.4A.997.997 0 0 0 7 0H1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h17.586l-3.293 3.293a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414Z"
        />
    </svg>
);

export default memo(CurlyArrow)