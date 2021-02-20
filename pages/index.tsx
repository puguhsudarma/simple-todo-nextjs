import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Button from '../components/Button';
import Input from '../components/Form';

const Home = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Please fill your name.'),
    }),
    onSubmit(values) {
      console.log(values);
      router.push('/main');
    },
  });

  return (
    <div className="bg-gray-100 flex w-screen h-screen">
      <form
        onSubmit={formik.handleSubmit}
        method="POST"
        className="m-4 mt-10 md:m-auto w-full md:w-1/3"
      >
        <Input
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          error={formik.errors.name}
        />

        <div className="h-4" />

        <Button label="Next" type="submit" />
      </form>
    </div>
  );
};

export default Home;
