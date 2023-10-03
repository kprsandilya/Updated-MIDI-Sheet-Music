import '../App.css';
import "../input.css";

const HeroPattern = ({ pttrn, children }) =>
  <div className={pttrn}>
    {children}
</div>

export default HeroPattern;