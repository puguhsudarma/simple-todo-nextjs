import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import Button from '../components/Button';
import Input from '../components/Form';

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Please fill your name.'),
    }),
    onSubmit(values) {
      setLoading(true);
      setTimeout(() => {
        console.log(values);
        router.push('/main');
        setLoading(false);
      }, 3000);
    },
  });

  return (
    <div className="bg-gray-200 flex w-screen h-screen">
      <form onSubmit={formik.handleSubmit} method="POST" className="px-4 m-auto w-full md:w-1/3">
        <Input
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          error={formik.errors.name}
        />

        <div className="h-4" />

        <Button label="Next" type="submit" className="md:w-1/3" loading={loading} />
      </form>
    </div>
  );
};

export default Home;
