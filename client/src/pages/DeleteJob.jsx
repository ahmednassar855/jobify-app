import customFetch from './../utils/customFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`jobs/${params.id}`)
    toast.success('Delete successfully')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};

const DeleteJob = () => {
  return (
    <h1>DeleteJob page </h1>
  )
}

export default DeleteJob