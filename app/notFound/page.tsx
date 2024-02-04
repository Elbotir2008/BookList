import Link from "next/link";
import "./notfound.scss";
const page = () => {
  return (
    <div className="notFunded">
      <img src="./404.svg" alt="Eror" />
      <Link href="/bookList" className="btn1">
        <button>Go Home Page</button>
      </Link>
      <Link href="/" className="btn2">
        <button>Reload Page</button>
      </Link>
    </div>
  );
};

export default page;
