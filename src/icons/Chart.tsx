import React, { ReactElement } from 'react';
import { SVGProps, memo } from 'react';

const Chart = (props: SVGProps<any>): ReactElement<SVGAElement> => (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <path
            fill="#DE411B"
            fillRule="evenodd"
            d="M18.875 1.375a.438.438 0 100 .875.438.438 0 000-.875zm-1.313.438a1.312 1.312 0 11.84 1.224l-3.64 4.245a1.312 1.312 0 11-2.45.68l-2.901-.968a1.31 1.31 0 01-1.708.321l-3.347 2.792a1.312 1.312 0 11-.56-.673l3.348-2.791a1.313 1.313 0 112.544-.479l2.9.968a1.31 1.31 0 011.51-.42l3.64-4.244a1.306 1.306 0 01-.175-.655zM13.19 7.907a.44.44 0 00.068-.205.437.437 0 11-.068.205zM8.8 6.288a.439.439 0 00-.426-.538.438.438 0 10.401.613.443.443 0 01.025-.075zm8.324 1.65c0-.242.196-.438.438-.438h2.625c.241 0 .437.196.437.438v12.687h.438a.438.438 0 010 .875H.938a.438.438 0 010-.875h.437v-3.938c0-.241.196-.437.438-.437h2.625c.241 0 .437.196.437.438v3.937h1.75v-8.313c0-.241.196-.437.438-.437h2.625c.241 0 .437.196.437.438v8.312h1.75v-6.563c0-.241.196-.437.438-.437h2.624c.242 0 .438.196.438.438v6.562h1.75V7.937zM18 20.624h1.75V8.375H18v12.25zm-3.5 0V14.5h-1.75v6.125h1.75zm-5.25 0V12.75H7.5v7.875h1.75zm-5.25 0v-3.5H2.25v3.5H4zm-.875-10.5a.438.438 0 100 .875.438.438 0 000-.875z"
            clipRule="evenodd"
        />
    </svg>
);

export default memo(Chart)