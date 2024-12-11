'use client';

import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { isAxiosError } from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/date-picker';
import { LoaderCircleIcon, Plus, X } from 'lucide-react';
import api from '@/lib/api';

const recipeSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  ingredients: z.string().min(1, { message: 'Ingredients are required' }),
  instructions: z.string().min(1, { message: 'Instructions are required' }),
  images: z.array(z.any()).optional(),
  schedule: z.array(
    z.object({
      startDateTime: z.date(),
      endDateTime: z.date(),
    })
  ).refine(
    (schedules) =>
      schedules.every((schedule) => schedule.startDateTime < schedule.endDateTime),
    { message: 'Start time must be before end time' }
  ),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const RecipeManagementPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      ingredients: '',
      instructions: '',
      images: [],
      schedule: [{ startDateTime: new Date(), endDateTime: new Date() }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedule',
  });

  const onSubmit = async (data: RecipeFormData) => {
    try {
      setLoading(true);
      const payload = {
        title: data?.title,
        ingredients: data?.ingredients,
        instructions: data?.instructions,
        images: data?.images,
        schedule: data?.schedule?.map((schedule: any) => ({
          startTime: schedule?.startDateTime?.toISOString(),
          endTime: schedule?.endDateTime?.toISOString(),
        })),
      };

      const response = await api.post(
        `/api/users/${session?.user?.id}/recipes`,
        payload
      );

      if (response?.data?.success) {
        toast.success('Recipe created successfully!');
        reset();
      } else {
        toast.error(response?.data?.message ?? 'Failed to create recipe');
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      } else {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Recipe</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register('title')}
                placeholder="Enter recipe title"
              />
              {errors?.title && <p className="text-red-500 text-sm">{errors?.title?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                {...register('ingredients')}
                placeholder="List the ingredients"
              />
              {errors?.ingredients && <p className="text-red-500 text-sm">{errors?.ingredients?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                {...register('instructions')}
                placeholder="Describe the cooking instructions"
              />
              {errors?.instructions && <p className="text-red-500 text-sm">{errors?.instructions?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input
                {...register('images')}
                type="file"
                multiple
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Schedule</Label>
                <Button
                  type="button"
                  onClick={() => append({ startDateTime: new Date(), endDateTime: new Date() })}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Schedule
                </Button>
              </div>

              {fields?.map((field: any, index: number) => (
                <div key={field?.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Schedule {index + 1}</h4>
                    {fields?.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date Time</Label>
                      <Controller
                        control={control}
                        name={`schedule.${index}.startDateTime`}
                        render={({ field: { value, onChange } }) => (
                          <DateTimePicker
                            date={value ?? new Date()}
                            setDate={onChange}
                          />
                        )}
                      />
                      {errors?.schedule?.[index]?.startDateTime && (
                        <p className="text-red-500 text-sm">
                          {errors?.schedule?.[index]?.startDateTime?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>End Date Time</Label>
                      <Controller
                        control={control}
                        name={`schedule.${index}.endDateTime`}
                        render={({ field: { value, onChange } }) => (
                          <DateTimePicker
                            date={value ?? new Date()}
                            setDate={onChange}
                          />
                        )}
                      />
                      {errors?.schedule?.[index]?.endDateTime && (
                        <p className="text-red-500 text-sm">
                          {errors?.schedule?.[index]?.endDateTime?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Recipe...
                </>
              ) : (
                'Create Recipe'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RecipeManagementPage;