import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

type RatingComponentProps = {
  value: number | null;
  onChange: (newValue: number | null) => void;
};

export function RatingComponent({ value, onChange }: RatingComponentProps) {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={value ?? undefined} // Fallback to undefined if value is null
        onChange={(event, newValue) => {
          onChange(newValue ?? null); // Convert undefined back to null for the parent
        }}
      />
    </Box>
  );
}
