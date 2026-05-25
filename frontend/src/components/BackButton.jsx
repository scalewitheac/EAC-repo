import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Small retro pill in the upper-right of every page that returns to /home.
 * Hidden on the password gate, disclaimer, and the home page itself.
 */
const BackButton = () => {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/disclaimer" || pathname === "/home") return null;
  return (
    <Link to="/home" className="back-pill" data-testid="back-to-menu-pill">
      ◁ menu
    </Link>
  );
};

export default BackButton;
