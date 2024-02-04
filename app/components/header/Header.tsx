import Link from "next/link";
import "./header.scss";
const Header = () => {
  let getInfForHeader = JSON.parse(localStorage.getItem("formInf")!);
  return (
    <header>
      <div className="container">
        <div className="header-flex flex-class">
          <div className="header-left flex-class">
            <img src="./bi_cloud-check.svg" alt="Eror" />
            <h2>
              Books <span>List</span>
            </h2>
            <img
              src="./search-refraction.svg"
              className="search-img"
              alt="Eror"
            />
            <input type="text" placeholder="Search for any training you want" />
          </div>
          <div className="header-right flex-class">
            <img src="./af.svg" alt="Eror" />
            <h1>
              {getInfForHeader ? (
                getInfForHeader.name
              ) : (
                <Link href="/signIn">
                  <button className="headerSign">Sign In</button>
                </Link>
              )}
            </h1>
            {/* <img src="./user-image.svg" alt="Eror" /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
