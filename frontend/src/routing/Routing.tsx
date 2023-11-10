import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const NotesPage = lazy(() => import("../features/Notes/Pages/NotesPage"));
const NotePage = lazy(() => import("../features/Notes/Pages/NotePage"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:id" element={<NotePage />} />
      <Route path="*" element={<Navigate to="/notes" />} />
    </Routes>
  );
};

export default Routing;
