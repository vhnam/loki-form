import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/core-ui/components/card';
import { Skeleton } from '@repo/core-ui/components/skeleton';

const ProfileFormSkeleton = () => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* First Name Field */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[0.875rem] w-20" />
                  <Skeleton className="h-9 w-full" />
                </div>
                {/* Last Name Field */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[0.875rem] w-20" />
                  <Skeleton className="h-9 w-full" />
                </div>
                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[0.875rem] w-16" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* Interface Language Field */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[0.875rem] w-24" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-4 w-56" />
                </div>
                {/* Interface Mode Field */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[0.875rem] w-20" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormSkeleton;
