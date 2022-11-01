import { appLibrary } from '@/shared/utils/loading';
import { asyncLogoutAuth, IRootState } from '@/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface IProps {
  data?: '';
}

const UserPop: React.FC = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.auth.me);
  const handleClick = (e) => {
    setIsOpen(!isOpen);
    setAnchorEl(anchorEl ? null : e.target);
  };
  const logout = () => {
    appLibrary.showloading();
    dispatch(asyncLogoutAuth());
  };
  return <div className="relative h-full "></div>;
};
export default UserPop;
