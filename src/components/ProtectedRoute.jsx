import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthed } from '../features/authSlice';

export default function ProtectedRoute() {
  const isAuthed = useSelector(selectIsAuthed);
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}