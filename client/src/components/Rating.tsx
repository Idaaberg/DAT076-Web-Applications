import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


type RatingComponentProps = {
  value: number | null;
  onChange: (newValue: number | null) => void;
};

/**
 * Defines the Rating component
 * @param value - the rating value
 * @param onChange - the function to set the rating value
 * @returns Rating component
 */
export function RatingComponent({ value, onChange }: RatingComponentProps) {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating
        name="pink-rating"
        value={value ?? undefined}
        onChange={(_, newValue) => {
          onChange(newValue ?? null);
        }}
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#ff69b4',
          },
          '& .MuiRating-iconEmpty': {
            color: '#ff69b4',
          },
        }}
      />
    </Box>
  );
}
