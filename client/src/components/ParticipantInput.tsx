import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ParticipantInputProps {
  participants: number;
  onParticipantsChange: (participants: number) => void;
}

export function ParticipantInput({ participants, onParticipantsChange }: ParticipantInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value > 0) {
      onParticipantsChange(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of Participants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="participants">Participants</Label>
          <Input
            id="participants"
            type="number"
            value={participants}
            onChange={handleChange}
            min="1"
            max="100"
            className="text-center text-2xl font-bold"
          />
        </div>
      </CardContent>
    </Card>
  );
}
