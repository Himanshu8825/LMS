import Form from '@/components/common/Form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courseLandingPageFormControls } from '@/config';
import { setCourseLandingFormData } from '@/Store/Slices/InstructorSlice';
import { useDispatch, useSelector } from 'react-redux';

const CourseLanding = () => {
  const { courseLandingFormData } = useSelector((state) => state.instructor);

  const dispatch = useDispatch()

  const handleFormChange = (updatedData) => {
    dispatch(setCourseLandingFormData(updatedData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here (like making an API call)
    console.log(courseLandingFormData); // Debugging purpose
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>

      <CardContent>
        <Form
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={handleFormChange}
          onSubmit={handleSubmit}
          buttonText="Save Course"
          isBtnDisabled={false}
        />
      </CardContent>
    </Card>
  );
};

export default CourseLanding;
