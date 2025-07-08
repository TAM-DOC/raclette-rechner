import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddIngredientFormProps {
  onSubmit: (ingredient: { name: string; amount: number; unit: string }) => void;
  isLoading?: boolean;
}

const units = ['g', 'kg', 'ml', 'l', 'cups', 'tbsp', 'tsp', 'pieces', 'oz', 'lb'];

export function AddIngredientForm({ onSubmit, isLoading = false }: AddIngredientFormProps) {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [unit, setUnit] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !unit) {
      return;
    }

    onSubmit({
      name,
      amount: parseFloat(amount),
      unit,
    });

    // Reset form
    setName('');
    setAmount('');
    setUnit('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Ingredient</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Flour"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 500"
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Adding...' : 'Add Ingredient'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
