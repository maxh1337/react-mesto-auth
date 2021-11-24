import logo from '../images/logo.svg'
function Header() {
    return(
        <header className="header">
        <a
          target="_self"
          href="https://github.com/maxh1337/mesto"
          className="logo header__logo"
        >
          <img className="logo__img" alt="Mesto" src={logo} />
        </a>
      </header>
    )
}
export default Header;