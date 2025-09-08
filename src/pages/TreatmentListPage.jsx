import {
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddTreatmentModal from '../components/AddTreatmentModal';
import {
  removeLocalTreatment,
  saveNewTreatments,
  selectTreatments,
} from '../features/treatmentSlice';

export default function TreatmentListPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectTreatments);
  const [open, setOpen] = useState(false);

  const unsaved = useMemo(() => items.filter((t) => t.pending), [items]);

  const handleSave = () => {
    if (unsaved.length === 0) {
      toast.info('Nothing new to save.');
      return;
    }
    dispatch(saveNewTreatments());
    toast.success('Treatments saved.');
  };

  const handleRemove = (t) => {
    dispatch(removeLocalTreatment(t.id));
    toast.info(t.pending ? 'Removed (not saved).' : 'Deleted.');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Toolbar disableGutters sx={{ mb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={700}>
          Treatment List
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={unsaved.length === 0}
          >
            Save ({unsaved.length})
          </Button>
        </Stack>
      </Toolbar>

      <Paper sx={{ p: 0 }}>
        <List>
          {items.length === 0 && (
            <ListItem>
              <ListItemText primary="No treatments yet. Click Add to get started." />
            </ListItem>
          )}

          {items.map((t) => (
            <ListItem key={t.id} divider>
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{t.name}</Typography>
                    {t.pending && <Chip label="Unsaved" size="small" />}
                  </Stack>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleRemove(t)}
                  aria-label="delete"
                >
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
