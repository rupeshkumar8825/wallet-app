import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className=" border-2  rounded-2xl p-4 bg-slate-100"
    >
      <h1 className="text-xl">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}