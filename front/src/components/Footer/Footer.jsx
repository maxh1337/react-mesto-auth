import {memo} from "react";

const Footer = memo(() => (
        <footer className="footer">
            <a target="_blank" rel="noreferrer" href='' className="footer__copyright">
                &copy; {2022} Кавыршин Даниил
            </a>
        </footer>
    )
);

export default Footer;