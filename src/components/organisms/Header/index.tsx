import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full m-0 flex p-8 bg-yellow-500 rounded-t-lg">
      <ul className="flex gap-10 w-full justify-center">
        <li className="cursor-pointer hover:font-[700] text-black">
          <NavLink to={'/home'}>Home</NavLink>
        </li>
        <li className="cursor-pointer hover:font-[700] text-black">
          <NavLink to={'/livros-marvel'}>Livros Marvel</NavLink>
        </li>
        <li className="cursor-pointer hover:font-[700] text-black">
          <NavLink to={''}>Opção</NavLink>
        </li>
        <li className="cursor-pointer hover:font-[700] text-black">
          <NavLink to={''}>Opção</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
