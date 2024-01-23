import React from "react";
import { motion } from "framer-motion";

function Logo({ size = "small" }) {
    const smallSettings = {
        viewBox: "0 0 390 358",
        width: 40,
    };
    const fullSettings = {
        viewBox: "0 0 1981 358",
        width: 185,
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
    };

    const settings = size === "small" ? smallSettings : fullSettings;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={settings.width}
            height="100%"
            viewBox={settings.viewBox}
        >
            <defs>
                <linearGradient
                    id="companyLogo-a"
                    x1="1"
                    x2="0"
                    y1="0.5"
                    y2="0.5"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#3cc1e3"></stop>
                    <stop offset="1" stopColor="#5bf7a7"></stop>
                </linearGradient>
                <linearGradient
                    id="companyLogo-b"
                    x1="0.9"
                    x2="0.4"
                    y1="0.8"
                    y2="0.1"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#067fec"></stop>
                    <stop offset="1" stopColor="#0ab8e7"></stop>
                </linearGradient>
                <linearGradient
                    id="companyLogo-c"
                    x1="0.5"
                    x2="0.5"
                    y1="0.9"
                    y2="0"
                    xlinkHref="#companyLogo-a"
                ></linearGradient>
                <linearGradient
                    id="companyLogo-d"
                    x1="0.7"
                    x2="0.1"
                    y1="0.9"
                    y2="0.3"
                    xlinkHref="#companyLogo-b"
                ></linearGradient>
                <linearGradient
                    id="companyLogo-e"
                    x1="1"
                    x2="0"
                    y1="1"
                    y2="0.1"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#0160eb"></stop>
                    <stop offset="1" stopColor="#0ab8e7"></stop>
                </linearGradient>
                <linearGradient
                    id="companyLogo-f"
                    x1="0.9"
                    x2="0.1"
                    y1="1"
                    y2="0.1"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#0160eb"></stop>
                    <stop offset="1" stopColor="#5efca1"></stop>
                </linearGradient>
            </defs>
            <path
                fill="url(#companyLogo-a)"
                fillRule="evenodd"
                d="M1046 663c13-38-7-57-40-60H875a10 10 0 00-10 10v40a10 10 0 0010 10h171z"
                data-name="Path 1"
                transform="translate(-724 -550)"
            ></path>
            <path
                fill="url(#companyLogo-b)"
                fillRule="evenodd"
                d="M1310 658a55 55 0 00-56-55h-45q41 6 40 60c34 7 56 14 61 40z"
                data-name="Path 2"
                transform="translate(-927 -550)"
            ></path>
            <path
                fill="#5bf7a7"
                fillRule="evenodd"
                d="M98 0h40a10 10 0 0110 10v40a10 10 0 01-10 10H98a10 10 0 01-11-10V10A10 10 0 0198 0z"
                data-name="Path 3"
            ></path>
            <path
                fill="#0050ca"
                fillRule="evenodd"
                d="M383 154q-7-41-61-41v13c23 4 49 15 61 28z"
                data-name="Path 4"
            ></path>
            <path
                fill="#005eeb"
                fillRule="evenodd"
                d="M383 154c-9-22-36-31-61-31v172H148c-1 31 13 53 33 60h202V154z"
                data-name="Path 5"
            ></path>
            <path
                fill="url(#companyLogo-c)"
                fillRule="evenodd"
                d="M778 793v-33a10 10 0 00-11-10h-40a10 10 0 00-10 10v131c4 34 23 52 61 40z"
                data-name="Path 6"
                transform="translate(-636 -637)"
            ></path>
            <path
                fill="url(#companyLogo-d)"
                fillRule="evenodd"
                d="M818 1195c-26-5-36-27-40-60q-54 0-61-41v46a55 55 0 0055 55h46z"
                data-name="Path 7"
                transform="translate(-636 -840)"
            ></path>
            <path
                fill="#0050ca"
                fillRule="evenodd"
                d="M181 355c-20-7-30-29-29-60h-11q-1 54 40 60z"
                data-name="Path 8"
            ></path>
            <path
                fill="url(#companyLogo-e)"
                fillRule="evenodd"
                d="M1022 958h40a10 10 0 0010-10v-41a10 10 0 00-10-10h-40a10 10 0 00-10 10v41a10 10 0 0010 10z"
                data-name="Path 9"
                transform="translate(-810 -723)"
            ></path>
            <path
                fill="#5bf7a7"
                fillRule="evenodd"
                d="M10 93h28a10 10 0 0110 10v28a10 10 0 01-10 10H10a10 10 0 01-10-10v-28a10 10 0 0110-10z"
                data-name="Path 10"
            ></path>
            <path
                fill="#5bf7a7"
                fillRule="evenodd"
                d="M22 11h17a10 10 0 0110 10v17a10 10 0 01-10 10H22a10 10 0 01-10-10V21a10 10 0 0110-10z"
                data-name="Path 11"
            ></path>

            {size !== "small" ? (
                <motion.g initial="hidden" animate="visible" variants={fadeIn}>
                    <path
                        fill="#1a2530"
                        d="M727 222c0-73-54-133-131-133s-130 60-130 133c0 74 54 133 122 133 17 0 34-4 49-11v-65a61 61 0 01-41 16c-36 0-65-32-65-72 0-42 29-73 65-73s66 33 66 73l-1 7v119h66z"
                        data-name="Path 12"
                    ></path>
                    <path
                        fill="#1a2530"
                        d="M1011 0h-65v223c0 39-29 72-65 72s-65-32-65-72c0-42 29-73 65-73a61 61 0 0141 16v-65c-15-8-32-11-51-11-66 0-121 59-121 132 0 74 54 133 131 133 76 0 130-59 130-133z"
                        data-name="Path 13"
                    ></path>
                    <path
                        fill="#1a2530"
                        d="M1294 95h-67l-64 190-63-190h-68l96 254h70z"
                        data-name="Path 14"
                    ></path>
                    <path
                        fill="#1a2530"
                        d="M1318 95h65v254h-65z"
                        data-name="Rectangle 1"
                    ></path>
                    <path
                        fill="#1a2530"
                        d="M1418 281q4 37 36 56t77 18q50 0 80-21t30-63c0-17-6-32-17-45s-28-21-49-26l-60-13q-23-5-23-21c0-7 3-13 8-18s15-7 27-7c13 0 24 3 33 10s13 14 14 25l64-13q-7-33-36-54-30-20-73-20-47 0-75 23t-28 60q0 27 18 46c13 12 30 21 53 25l51 11c19 4 28 12 28 23 0 7-4 13-11 18s-16 7-28 7q-48 0-52-34z"
                        data-name="Path 15"
                    ></path>
                    <path
                        fill="#1a2530"
                        fillRule="evenodd"
                        d="M1787 355c63 0 108-35 123-87h-70a60 60 0 01-54 30c-22 0-41-10-54-27a91 91 0 01-15-52c2-43 32-73 69-73 21 0 39 8 51 23l-101 42c-1 17 4 38 15 52l161-68c-13-68-64-106-125-106-72 0-130 60-130 134s58 132 130 132z"
                        data-name="Path 16"
                    ></path>
                    <path
                        fill="url(#companyLogo-f)"
                        fillRule="evenodd"
                        d="M4360 1032h35a9 9 0 009-9v-35a9 9 0 00-9-9h-35a9 9 0 00-9 9v35a9 9 0 009 9z"
                        data-name="Path 17"
                        transform="translate(-2423 -674)"
                    ></path>
                </motion.g>
            ) : null}
        </svg>
    );
}

export default Logo;
