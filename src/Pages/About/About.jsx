import "./About.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import aboutlabel from "../../assets/aboutlabel.svg";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";

function About() {
  // translation
  const { language, setLanguage } = useLanguage();
  return (
    <div className="about-detials">
      <div className="about position-relative ">
        <div className="bg-orange">
          <Header />
        </div>
        <div className="container">
          <div>
            <h1
              className="text-center "
              style={{
                fontSize: "95px",
                marginBottom: "50px",
              }}
            >
              <span
                className="bebas-neue-bold "
                style={{
                  color: "#42A7C3",
                  textTransform: "uppercase",
                }}
              >
                Infinity
                <span
                  className="grey"
                  style={{
                    color: "#F77A40",
                  }}
                >
                  palc
                  <span
                    style={{
                      color: "#42A7C3",
                    }}
                  >
                    e
                  </span>
                  s
                </span>
              </span>
            </h1>
            <div className="one1 d-flex">
              <img
                src={aboutlabel}
                className="px-1"
                alt="aboutlabel"
                style={{ marginBottom: "20px", paddingRight: "5px" }}
              />
              <p
                style={{
                  marginLeft: "10px",
                  fontSize: "20px",
                  lineHeight: "37px",
                  color: "#42A7C3",
                }}
              >
                {" "}
                {t[language].aboutUs}{" "}
              </p>
            </div>
          </div>

          <h2>{t[language].ourCompanyOverview}</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s,
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default About;
