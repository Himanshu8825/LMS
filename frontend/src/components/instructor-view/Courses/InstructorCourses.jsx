import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit2, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InstructorCourses = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className=" flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-bold poppins-medium ">
          All Courses
        </CardTitle>
        <Button
          onClick={() => navigate('/instructor/create-new-course')}
          className="p-5 btn-color "
        >
          {' '}
          Add New Course
        </Button>
      </CardHeader>

      <CardContent>
        <div className=" overflow-x-auto poppins-medium ">
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">
                  React Js Full Course{' '}
                </TableCell>
                <TableCell>100</TableCell>
                <TableCell>$500</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-yellow-600"
                  >
                    <Edit2 className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-red-600"
                  >
                    <Trash className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
