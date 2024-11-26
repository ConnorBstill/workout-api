export interface Exercise {
  id: number;
  workoutId: number;
  name: string;
  weight: string;
  repsPerSet: number;
  sets: number;
  restTime: number;
  restTimeUnit: 's' | 'm';
  dateEntered: string;
}
