import * as React from 'react';
import { SVGProps } from 'react';

const BookmarkEmptyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width={20}
    height={20}
    className="fill-purple-0"
    {...props}
  >
    <path d="M336 0H48C21.49 0 0 21.49 0 48v431.9c0 24.7 26.79 40.08 48.12 27.64L192 423.6l143.9 83.93c21.3 11.57 48.1-2.93 48.1-27.63V48c0-26.51-21.5-48-48-48zm0 452-144-84-144 84V54c0-3.37 2.63-6 5.1-6h276c4.3 0 6.9 2.63 6.9 6v398z" />
  </svg>
);

export default BookmarkEmptyIcon;
