import { NextPage } from 'next';
import { FormEvent } from 'react';
import { uploadFile } from '../../modules/Posts/api';

const LoginPage: NextPage = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      await uploadFile(e.target[0].files[0]);
    })();
  };
  return (
    <>
      <div className="m-auto">LoginModule</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="file" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginPage;
