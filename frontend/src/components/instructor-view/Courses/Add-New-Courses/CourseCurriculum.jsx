import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { courseCurriculumInitialFormData } from '@/config';
import { setCourseCurriculumFormData } from '@/Store/Slices/InstructorSlice';
import { useDispatch, useSelector } from 'react-redux';

const CourseCurriculum = () => {
  const { courseCurriculumFormData } = useSelector((state) => state.instructor);

  const dispatch = useDispatch();

  const handleNewLecture = (e) => {
    const newLecture = {
      ...courseCurriculumInitialFormData[0],
    };

    dispatch(
      setCourseCurriculumFormData([...courseCurriculumFormData, newLecture])
    );
  };

  console.log(courseCurriculumFormData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create course curriculam</CardTitle>
      </CardHeader>

      <CardContent>
        <Button onClick={handleNewLecture} className="btn-color">
          Add Lecture
        </Button>

        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((item, index) => (
            <div key={index} className=" border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className=" font-semibold"> Lecture {index + 1}</h3>

                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture Title"
                  className="max-w-96"  
                />

                <div className="flex items-center space-x-2">
                  <Switch checked={true} id={`freePreview-${index + 1}`} />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview{' '}
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                <Input type="file" accept="video/*" className="mb-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
