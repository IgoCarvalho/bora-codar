import { SVGAttributes } from 'react';

type ArrowsExchangeProps = SVGAttributes<SVGElement>;

export function ArrowsExchange(props: ArrowsExchangeProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 10H21L17 6M17 14H3L7 18"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
