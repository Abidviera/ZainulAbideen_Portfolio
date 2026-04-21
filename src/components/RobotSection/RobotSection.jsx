import React from 'react';
import { InteractiveRobotSpline } from '../InteractiveRobot/InteractiveRobotSpline';
import './RobotSection.css';

export function RobotSection() {
  const ROBOT_SCENE_URL = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode';

  return (
    <div className="robot-section">
      <InteractiveRobotSpline
        scene={ROBOT_SCENE_URL}
        className="robot-canvas"
      />

      <div className="robot-overlay">
        <div className="robot-content">
          <span className="robot-label label-chip accent">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Interactive 3D Experience
          </span>
          <h2 className="robot-heading">
            Meet Whobee — Your AI-Powered Assistant
          </h2>
          <p className="robot-subtext">
            An interactive 3D companion built with Spline and React. Hover, click, and explore — Whobee responds in real time.
          </p>
          <div className="robot-actions">
            <button className="btn-primary robot-cta">
              Explore Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn-ghost robot-ghost">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="robot-corner-badge">
        <span className="label-chip">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
          Powered by Spline
        </span>
      </div>
    </div>
  );
}
