import { Autocomplete, Box, Button, Modal, Stack, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addLocalTreatment, selectTreatments } from '../features/treatmentSlice';

const AVAILABLE_TREATMENTS = [
  'Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Physical Therapy',
  'Dialysis', 'Antibiotic Course', 'Surgery', 'Psychotherapy'
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 3,
};

export default function AddTreatmentModal({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectTreatments);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const names = useMemo(() => items.map((t) => t.name.toLowerCase()), [items]);

  const handleAdd = () => {
    const name = value || inputValue;
    if (!name || !name.trim()) {
      toast.warn('Please select a treatment.');
      return;
    }
    const lower = name.trim().toLowerCase();
    if (names.includes(lower)) {
      toast.error('This treatment is already in the list.');
      return;
    }
    dispatch(addLocalTreatment(name.trim()));
    toast.success('Treatment added (not saved yet).');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Stack spacing={2}>
          <Autocomplete
            options={AVAILABLE_TREATMENTS}
            value={value}
            onChange={(_, newVal) => setValue(newVal)}
            inputValue={inputValue}
            onInputChange={(_, newInput) => setInputValue(newInput)}
            renderInput={(params) => <TextField {...params} label="Select a treatment" />}
            freeSolo
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined">Cancel</Button>
            <Button onClick={handleAdd} variant="contained">Add</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}