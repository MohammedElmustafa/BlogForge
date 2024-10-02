'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export default function EditUserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      plan: '',
    },
  });
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        return;
      }
      const user = await response.json();
      form.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        plan: user.Subscription?.planId || 'FreeLance',
      });
    };
    fetchUser();
  }, [userId, form]);
  const onSubmit = async (data: any) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push('/admin/dashboard/Users');
    } else {
      const errorResponse = await response.json();
      console.error('Failed to update user:', errorResponse.error);
    }
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="max-w-[650px]">
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>
            Update user details here. Click the button below when you&apos;re done...
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input
                  {...form.register('firstName')}
                  placeholder="First Name"
                />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  {...form.register('lastName')}
                  placeholder="Last Name"
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  {...form.register('email')}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="grid gap-2">
                <Label>Plan</Label>
                <Select
                  {...form.register('plan')}
                  defaultValue={form.getValues('plan')}
                >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">FreeLance</SelectItem>
                  <SelectItem value="dark">Startup</SelectItem>
                </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Update User</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
