import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const NotesPage = lazy(() => import("../features/Notes/Pages/NotesPage"));
const NotePage = lazy(() => import("../features/Notes/Pages/NotePage"));
const NewNotePage = lazy(() => import("../features/Notes/Pages/NewNotePage"));
const EditNotePage = lazy(() => import("../features/Notes/Pages/EditNotePage"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/new-note" element={<NewNotePage />} />
      <Route path="/notes/:id" element={<NotePage />} />
      <Route path="/notes/:id/edit" element={<EditNotePage />} />
      <Route path="*" element={<Navigate to="/notes" />} />
    </Routes>
  );
};

export default Routing;
