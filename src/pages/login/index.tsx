import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { uploadFile } from '../../modules/Posts/api';

const LoginPage: NextPage = () => {
  const [myImg, setMyImg] = useState<string>('');
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const res = await uploadFile(e.target[0].files[0]);
      debugger;
      setMyImg(res.key);
    })();
  };
  return (
    <>
      <div className="m-auto">LoginModule</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="file" />
        <button type="submit">Submit</button>
      </form>
      <img src={myImg} />
    </>
  );
};

export default LoginPage;
