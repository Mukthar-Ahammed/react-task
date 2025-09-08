import {
    Box,
    Button,
    Chip,
    IconButton,
    List, ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Stack, Toolbar,
    Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddTreatmentModal from '../components/AddTreatmentModal';
import {
    deleteTreatment,
    fetchTreatments,
    removeLocalTreatment,
    saveNewTreatments,
    selectSavingStatus,
    selectTreatments,
    selectTreatmentsStatus,
} from '../features/treatmentSlice';

export default function TreatmentListPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectTreatments);
  const status = useSelector(selectTreatmentsStatus);
  const saving = useSelector(selectSavingStatus);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTreatments());
  }, [dispatch]);

  const unsaved = useMemo(() => items.filter((t) => t.pending), [items]);

  const handleSave = async () => {
    if (unsaved.length === 0) {
      toast.info('Nothing new to save.');
      return;
    }
    const res = await dispatch(saveNewTreatments(unsaved));
    if (saveNewTreatments.fulfilled.match(res)) {
      toast.success('Treatments saved.');
    } else {
      toast.error(res.payload?.message || 'Save failed.');
    }
  };

  const handleRemove = async (t) => {
    if (t.pending) {
      dispatch(removeLocalTreatment({ tempId: t.tempId }));
      toast.info('Removed (not saved).');
      return;
    }
    const res = await dispatch(deleteTreatment({ id: t.id }));
    if (deleteTreatment.fulfilled.match(res)) {
      toast.success('Deleted.');
    } else {
      toast.error(res.payload?.message || 'Delete failed.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Toolbar disableGutters sx={{ mb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={700}>Treatment List</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<FiPlus />} onClick={() => setOpen(true)}>Add</Button>
          <Button variant="outlined" onClick={handleSave} disabled={saving === 'loading' || unsaved.length === 0}>
            {saving === 'loading' ? 'Saving...' : `Save (${unsaved.length})`}
          </Button>
        </Stack>
      </Toolbar>

      <Paper sx={{ p: 0 }}>
        <List>
          {status === 'loading' && (
            <ListItem><ListItemText primary="Loading treatments..." /></ListItem>
          )}

          {items.length === 0 && status === 'succeeded' && (
            <ListItem><ListItemText primary="No treatments yet. Click Add to get started." /></ListItem>
          )}

          {items.map((t) => (
            <ListItem key={t.id ?? t.tempId} divider>
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{t.name}</Typography>
                    {t.pending && <Chip label="Unsaved" size="small" />}
                  </Stack>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemove(t)} aria-label="delete">
                  <FiTrash2 size={18} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <AddTreatmentModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}