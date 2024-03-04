import React from "react";
import WhatsAppIcon from "../image/whatsapp.svg";
import LocationIcon from "../image/location.svg";
import StarIcon from "../image/star.svg";

export default function ContactAndLocation() {
  return (
    <div className="fixed right-1 top-1/2 z-50 transform items-center justify-end space-x-2 lg:-translate-y-1/2">
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative text-green-500"
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="512.000000pt"
          height="512.000000pt"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
          className="h-8  w-8 transform rounded-full bg-green-600 p-1 transition duration-300 hover:scale-110 dark:bg-purple-500"
        >
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
            <path
              d="M2290 4945 c-1101 -136 -1967 -1020 -2081 -2124 -17 -163 -7 -473 21
-630 43 -247 115 -465 227 -688 l56 -112 -167 -611 c-92 -337 -166 -613 -164
-614 2 -2 282 71 623 161 496 131 625 162 645 154 14 -5 79 -34 145 -64 214
-97 439 -161 676 -193 165 -22 454 -22 614 0 526 74 995 306 1365 676 194 193
323 370 445 611 110 217 188 454 232 704 25 146 25 577 0 730 -43 259 -110
466 -223 695 -323 651 -919 1115 -1632 1270 -222 48 -553 63 -782 35z m625
-414 c287 -53 525 -149 760 -306 402 -269 697 -686 814 -1148 86 -340 79 -726
-18 -1053 -158 -528 -533 -973 -1025 -1213 -286 -140 -550 -201 -871 -201
-368 0 -693 89 -1026 281 l-56 32 -368 -97 c-202 -53 -370 -95 -371 -93 -2 2
39 160 92 352 52 192 96 356 96 364 1 9 -25 59 -57 111 -472 768 -348 1780
295 2420 320 318 726 514 1180 570 123 15 429 4 555 -19z"
            />
            <path
              d="M1641 3658 c-57 -28 -163 -153 -207 -245 -87 -180 -85 -408 5 -618
110 -259 399 -627 684 -871 200 -171 367 -272 612 -368 251 -98 299 -109 465
-109 131 0 152 2 212 25 100 38 175 85 249 158 58 57 70 75 89 135 23 76 37
197 26 239 -5 22 -34 40 -176 111 -260 130 -365 175 -409 175 -37 0 -43 -4
-87 -62 -101 -133 -194 -236 -218 -242 -29 -7 -86 14 -217 80 -213 106 -386
249 -535 440 -81 104 -154 222 -154 250 0 11 38 70 84 130 90 117 116 161 116
194 0 11 -20 66 -43 123 -24 56 -72 172 -107 257 -44 106 -74 165 -96 188
l-32 32 -108 0 c-91 0 -116 -4 -153 -22z"
            />
          </g>
        </svg>
        <span className="absolute left-[-120px] top-3 hidden -translate-y-1/2 transform rounded bg-gray-800 py-1 px-2 text-white shadow-lg group-hover:inline-block">
          WhatsApp
        </span>
      </a>
      <a
        href="https://maps.google.com/maps?q=lokasi"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative text-blue-500"
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="512.000000pt"
          height="512.000000pt"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
          className="h-8 w-8 transform rounded-full  bg-red-500 p-1 filter transition duration-300 hover:scale-110 hover:brightness-125 hover:filter-none dark:bg-purple-500"
        >
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
            <path
              d="M2360 5109 c-202 -23 -396 -80 -585 -173 -376 -185 -656 -466 -835
-839 -326 -676 -210 -1403 383 -2397 169 -283 326 -517 722 -1075 132 -187
279 -396 327 -465 90 -131 124 -160 188 -160 64 0 98 29 188 160 48 69 195
278 327 465 388 546 559 801 724 1079 533 897 674 1550 470 2181 -38 117 -141
326 -218 440 -368 550 -1033 858 -1691 784z m495 -319 c681 -143 1170 -714
1202 -1405 16 -333 -84 -701 -317 -1165 -183 -365 -385 -682 -920 -1438 -140
-199 -257 -361 -260 -361 -3 0 -31 37 -62 82 -31 45 -154 219 -273 387 -236
332 -471 679 -582 860 -415 676 -601 1199 -580 1635 26 547 334 1023 827 1274
150 77 311 126 490 151 106 15 361 4 475 -20z"
            />
            <path
              d="M2380 4201 c-339 -74 -601 -323 -691 -656 -18 -65 -22 -107 -22 -225
0 -118 4 -160 22 -225 88 -324 340 -570 668 -652 103 -26 323 -23 428 6 317
85 560 329 646 646 18 65 22 107 22 225 0 118 -4 160 -22 225 -86 318 -332
564 -646 646 -116 30 -294 35 -405 10z m324 -301 c113 -29 190 -73 276 -160
87 -86 131 -163 160 -276 36 -141 17 -295 -52 -427 -44 -82 -165 -203 -245
-245 -133 -70 -286 -88 -427 -52 -111 28 -189 73 -276 160 -87 86 -131 162
-160 276 -36 141 -18 294 52 427 42 80 163 201 245 245 132 70 286 88 427 52z"
            />
          </g>
        </svg>
        <span className="absolute left-[-120px] top-9 hidden -translate-y-1/2 transform rounded bg-gray-800 py-1 px-2 text-white shadow-lg group-hover:inline-block dark:bg-purple-500">
          Location
        </span>
      </a>
      <a href="https://example.com/review" target="_blank" rel="noopener noreferrer" className="group relative">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="512.000000pt"
          height="512.000000pt"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
          className="h-8 w-8 transform rounded-full bg-yellow-500 p-1 text-white transition duration-300 hover:scale-110 hover:text-black dark:bg-purple-500"
        >
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
            <path
              d="M2485 4706 c-16 -7 -37 -22 -46 -32 -9 -11 -155 -300 -324 -644 -169
        -344 -310 -628 -314 -632 -3 -3 -321 -52 -706 -108 -499 -72 -709 -106 -730
        -119 -67 -39 -97 -140 -61 -209 8 -15 216 -224 463 -464 246 -240 474 -463
        506 -495 l57 -59 -120 -700 c-126 -736 -125 -729 -85 -790 25 -38 91 -67 141
        -61 30 3 215 95 663 331 342 179 626 326 632 326 5 0 288 -146 628 -325 340
        -179 632 -328 649 -331 50 -10 99 4 136 39 67 63 69 34 -64 812 l-120 699 47
        49 c27 27 254 250 507 495 252 246 464 459 472 474 36 69 6 170 -61 210 -22
        12 -224 45 -730 119 -385 55 -703 104 -706 108 -4 3 -145 287 -314 631 -169
        344 -315 633 -324 644 -37 43 -134 59 -196 32z"
            />
          </g>
        </svg>

        <span className="absolute left-[-120px] top-10 hidden -translate-y-1/2 transform rounded-full bg-gray-800 py-1 px-2 text-white shadow-lg group-hover:inline-block dark:bg-purple-500">
          Review
        </span>
      </a>
    </div>
  );
}
