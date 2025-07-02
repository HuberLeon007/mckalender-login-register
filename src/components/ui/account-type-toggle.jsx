"use client";
import React from "react";
import "./account-type-toggle.css";

export default function AccountTypeToggle({ value, onChange }) {
  const handleToggle = () => {
    const newValue = value === "personal" ? "commercial" : "personal";
    onChange(newValue);
  };

  return (
    <div className="account-type-toggle-container">
      <div className="toggle-header">
        <span className="toggle-title">Account Type</span>
      </div>
      <div className="toggle-switch" onClick={handleToggle}>
        <div className={`toggle-background ${value === 'commercial' ? 'active' : ''}`}>
          <div className={`toggle-slider ${value === 'commercial' ? 'commercial' : 'personal'}`}>
          </div>
          <div className="toggle-text-container">
            <span className={`toggle-text left ${value === 'personal' ? 'selected' : ''}`}>
              Personal Use
            </span>
            <span className={`toggle-text right ${value === 'commercial' ? 'selected' : ''}`}>
              Commercial Use
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
