import React from "react";

export default function Breadcrumb(props) {
  const {creator, projectName} = props.projectDetail;
  return (
    <div className="breadcrumb p-0 m-0">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Project</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">{creator?.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
