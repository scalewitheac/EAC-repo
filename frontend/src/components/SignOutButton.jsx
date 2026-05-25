import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as sfx from "../lib/sfx";

/**
 * Power off / sign out button.
 * Clears the site password gate, disclaimer flag, and any admin session,
 * then sends the user back to the boot/password screen.
 *
 * `variant`:
 *   - "device" — for the device header on the hub
 *   - "pill"   — for the upper-right corner on sub-pages
 */
const SignOutButton = ({ variant = "pill" }) => {
  const { signOut, admin } = useAuth();
  const navigate = useNavigate();

  const handle = () => {
    sfx.click();
    signOut();
    navigate("/");
  };

  if (variant === "device") {
    return (
      <button
        type="button"
        onClick={handle}
        className="pill-btn"
        data-testid="device-power-off-btn"
        title={admin ? "sign out (operator)" : "power off"}
        style={{ marginLeft: 8 }}
      >
        ⏻ power off
      </button>
    );
  }

  // pill variant — sits to the LEFT of the back-to-menu pill (top-right corner)
  return (
    <button
      type="button"
      onClick={handle}
      className="back-pill"
      data-testid="signout-pill"
      style={{ right: 110 }}
      title={admin ? "sign out (operator)" : "power off"}
    >
      ⏻ {admin ? "sign out" : "power off"}
    </button>
  );
};

export default SignOutButton;
