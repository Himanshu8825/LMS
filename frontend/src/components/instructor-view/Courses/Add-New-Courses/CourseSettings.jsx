import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CourseSettings = () => {
  return (
    <Card>

      <CardHeader>
        <CardTitle>Course Setting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label className=" text-lg font-medium" >Upload Course Image</Label>
          <Input
            type="file"
            id="course-image"
            name="course-image"
            accept = "image/*"
            className="mb-4 h-12"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseSettings
