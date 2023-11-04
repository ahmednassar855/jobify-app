import Wrappers from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrappers>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet totam
            reprehenderit maiores voluptatum! Illo debitis in ea deserunt
            suscipit labore alias tenetur eveniet atque dolorum iusto assumenda,
            magnam, laudantium amet!
          </p>
          <Link to='/register' className="btn register-link">Register</Link>
          <Link to='/login' className="btn ">Login / Demo User</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img"/>
      </div>
    </Wrappers>
  );
};

export default Landing;
