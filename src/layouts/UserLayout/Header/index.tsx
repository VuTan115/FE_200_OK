import HtmlHeader from '../../HtmlHeader';
import { NavBar } from './components/NavBar';
export interface IHeaderProps {
  data?: 'TODO:Change me';
}

const Header: React.FC = () => {
  return (
    <div id="__header">
      <HtmlHeader />
      <NavBar />
    </div>
  );
};
export default Header;
