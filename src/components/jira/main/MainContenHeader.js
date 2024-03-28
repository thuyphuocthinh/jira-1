import { Avatar } from "antd";
import React from "react";

export default function MainContenHeader(props) {
  const { projectName, members } = props.projectDetail;
  return (
    <div className="mainContent-header py-3">
      <h4>{projectName}</h4>
      <div className="mainContent-controls">
        <div className="form-group">
          <i className="fa-solid fa-magnifying-glass search-icon" />
          <input
            type="search"
            name="search"
            id="search"
            className="form-control"
            placeholder="Search issues"
            aria-describedby="helpId"
          />
        </div>
        <div className="mainContent-members">
          <ul>
            {members?.map((member, index) => {
              return (
                <li key={index}>
                  <img src={member.avatar} alt={member.avatar} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mainContent-filters">
          <ul>
            <li>
              <button className="btn btn-light">Only my issues</button>
            </li>
            <li>
              <button className="btn btn-light">Recently Updated</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
