import githubIcon from "./assets/github-icon.png";
import linkedinIcon from "./assets/linkedin-icon.png";

export default function Navbar() {
  const handleClickGithub = () => {
    window.open("https://github.com/mvreddy13", "_blank");
  };

  const handleClickLinkedin = () => {
    window.open("http://www.linkedin.com/in/mvreddy13", "_blank");
  };

  return (
    <navbar className="navbar">
      <span className="navbar-title">Tenzies</span>
      <button onClick={handleClickGithub} className="github-icon">
        <img src={githubIcon} className="github-svg" />
      </button>
      <button onClick={handleClickLinkedin} className="github-icon">
        <img src={linkedinIcon} className="github-svg" />
      </button>
    </navbar>
  );
}
