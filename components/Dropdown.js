import React from "react";

export default function Dropdown() {
  return (
    <>
      <label className="font-medium mb-2">Genres</label>
      <select className="outline outline-slate-300 rounded p-4">
        {genres.length &&
          genres.map(({ name }, index) => (
            <Fragment key={index}>
              <option value={name.toLowerCase()}>{name}</option>
            </Fragment>
          ))}
      </select>
    </>
  );
}
