import React from "react";

export default function Button({ icon, label, onClick }) {
  return (
    <button className="outline outline-1 outline-slate-300 rounded py-1 px-3 mx-1 m-2 hover:bg-secondary" onClick={onClick}>
      <div className="flex flex-row justify-center align-center">
        {icon && <span className="mt-1 mr-1">{icon}</span>}
        <p>{label}</p>
      </div>
    </button>
  );
}
