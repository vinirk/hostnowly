import { Link } from "react-router-dom";
import logoImg from "images/logo-app.png";

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link
      to="/"
      className={`inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <img className={`block max-h-12`} src={logoImg} alt="Logo" />
    </Link>
  );
};

export default Logo;
