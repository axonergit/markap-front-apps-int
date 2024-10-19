import React from "react";

export default function IndividualCard({ data }) {
  return (
    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
      {/* Image */}
      <figure className="flex justify-center">
        <img
          src={data.imagen}
          alt="card image"
          className="aspect-video w-1/4"  // Adjusted width from w-1/3 to w-1/4
        />
      </figure>
      {/* Body */}
      <div className="p-6">
        <header>
          <h3 className="text-xl font-medium text-slate-700">
            {data.nombre_categoria}
          </h3>
          <p className="text-sm text-slate-400">By George, jun 3 2023</p>
        </header>
      </div>
    </div>
  );
}
