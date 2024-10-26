import React from "react"

export default function PaginationMinimalBasicIcons() {
  return (
    <>
      {/*<!-- Component: Minimal basic pagination with icons --> */}
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul className="flex list-none items-center justify-center text-sm text-slate-700 md:gap-1">
          <li>
            <a
              href="javascript:void(0)"
              aria-label="Goto Page 1"
              className="inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-mx-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                role="graphics-symbol"
                aria-labelledby="title-11 desc-11"
              >
                <title id="title-11">Previous page</title>
                <desc id="desc-11">link to previous page</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="javascript:void(0)"
              aria-label="Goto Page 3"
              className="inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
            >
              <span className="sr-only">Next </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-mx-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                role="graphics-symbol"
                aria-labelledby="title-12 desc-12"
              >
                <title id="title-12">Next page</title>
                <desc id="desc-12">link to next page</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
      {/*<!-- End Minimal basic pagination with icons --> */}
    </>
  )
}
