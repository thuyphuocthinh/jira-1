import React from "react";
import WithHomeTemplate from "../../templates/HomeTemplate/HomeTemplate";

function About() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <img
        src={require("../../assets/jiraImage/atlassian-jira-logo-large.png")}
        alt="jira image"
        style={{ width: "150px" }}
      />
      <div className="mt-5 text-center">
        <p className="m-0 p-0">
          The #1 software development tool used by agile teams
        </p>
        <p className="m-0 p-0">
          Trusted by 100K+ teams that plan, track, release, and manage
          world-class software.
        </p>
      </div>
      <div className="mt-5" style={{ maxWidth: "600px", width: "100%", height: "auto" }}>
        <iframe
          style={{ width: "100%" }}
          height="320"
          src="https://www.youtube.com/embed/X2yYnADRYTw?si=dOhqDM8QzzVayV7J"
          title="YouTube video player"
          frameborder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div className="text-center mt-5">
        <p className="m-0 p-0">
          Created by <strong>Thuy Phuoc Thinh </strong>
        </p>
      </div>
    </div>
  );
}

export default WithHomeTemplate(About);
