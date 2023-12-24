import { cva } from "class-variance-authority";

export const textLead = "text-4xl uppercase bg-gray-700 text-white";

export const buttonStyle = cva(
  "p-2 bg-gray-800 text-white rounded-md pointer-events-auto hover:pointer"
);
