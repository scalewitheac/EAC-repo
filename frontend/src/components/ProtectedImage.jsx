import React from "react";

// Resolves a stored image_path:
// - If it's an http(s) URL, return as-is.
// - Otherwise treat it as a storage_path served via /api/files/{path}.
export const resolveMediaUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${process.env.REACT_APP_BACKEND_URL}/api/files/${path}`;
};

const ProtectedImage = ({ src, alt = "", className = "", style }) => {
  return (
    <img
      src={resolveMediaUrl(src)}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        // prevent middle/right click triggers
        if (e.button === 2) e.preventDefault();
      }}
    />
  );
};

export default ProtectedImage;
