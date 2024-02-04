"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import "./bookList.scss";
import axios from "axios";
import md5 from "md5";
import { toast } from "react-toastify";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookCards, setBookCards] = useState<any>([]);
  const [searchCards, setSearchCards] = useState<any>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    description: Yup.string().required("Cover is required"),
    rating: Yup.string().required("Published date is required"),
    pages: Yup.string().required("Pages is required"),
    category: Yup.string().required("category is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      rating: "",
      pages: "",
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (e: any, values: any) => {
      e.preventDefault();
      try {
        console.log(values);
        let res = await axios.post(
          "https://65bf923c25a83926ab953fac.mockapi.io/api/v2/bookList",
          values
        );
        let data = await res.data;
        console.log(data);
        toast.success("Your book has been added successfully");
        closeModal();
      } catch (err) {
        console.log(err);
      }
    },
  });
  let dataBooks = { isbn: "9781118464465" };
  let replaceMd = md5(`https://0001.uz/books${dataBooks}MJoPe`);

  const fetchUsers = async () => {
    try {
      let res = await axios.get(
        "https://65bf923c25a83926ab953fac.mockapi.io/api/v2/bookList"
      );
      let data = await res.data;
      console.log(data);
      setBookCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e: any) => {
    try {
      let res = await axios.get(
        `https://65bf923c25a83926ab953fac.mockapi.io/api/v2/bookList?search=${e.target.value}`
      );
      let data = await res.data;
      console.log(data);
      setBookCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      let res = await axios.delete(
        `https://65bf923c25a83926ab953fac.mockapi.io/api/v2/bookList/${id}`
      );
      let data = await res.data;
      toast.success("Your book has been delete successfully");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <div className="bookList">
        <div className="bookList-title">
          <div className="bookList-flex flex-class">
            <h1>
              You’ve got <span id="countBook"></span>
              <span>book</span>
            </h1>
            <div className="bookList-titleBtns flex-class ">
              <input
                type="text"
                placeholder="Search a book"
                onChange={(e) => handleSearch(e)}
              />
              <button onClick={openModal}>+ Create a book</button>
            </div>
          </div>
          <p>Your task today</p>
        </div>
        <div className="bookList-cards grid-class">
          {bookCards.length > 0
            ? bookCards.map((cd: any) => (
                <div className="card flex-class" key={cd.id}>
                  <div className="card-left">
                    <h1>{cd.title}</h1>
                    <h5>{cd.author}</h5>
                    <div className="flex-class buttonFlex">
                      <p>{cd.description}</p>
                      <button onClick={() => handleDelete(cd.id)}>
                        <img src="./trash-01.svg" alt="Eror" />
                      </button>
                    </div>
                    <div className="flex-class pageFlex">
                      <h6>{cd.pages} page</h6>
                      <div className="flex-class">
                        <h6>{cd.rating}</h6>
                        <img src="./star.png" alt="Eror" />
                      </div>
                    </div>
                  </div>
                  <h2>{cd.category}</h2>
                </div>
              ))
            : null}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Create a book</h2>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h3>Title</h3>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter your title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="error">{formik.errors.title}</div>
                ) : null}
              </div>
              <div>
                <h3>Author</h3>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter your author"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.author}
                />
                {formik.touched.author && formik.errors.author ? (
                  <div className="error">{formik.errors.author}</div>
                ) : null}
              </div>
              <div>
                <h3>Description</h3>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter your description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error">{formik.errors.description}</div>
                ) : null}
              </div>
              <div>
                <h3>Rating</h3>
                <input
                  type="text"
                  name="rating"
                  placeholder="Enter your rating"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rating}
                />
                {formik.touched.rating && formik.errors.rating ? (
                  <div className="error">{formik.errors.rating}</div>
                ) : null}
              </div>
              <div>
                <h3>Pages</h3>
                <input
                  type="text"
                  name="pages"
                  placeholder="Enter your pages"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pages}
                />
                {formik.touched.pages && formik.errors.pages ? (
                  <div className="error">{formik.errors.pages}</div>
                ) : null}
              </div>
              <div className="modal-btns flex-class">
                <button onClick={closeModal} className="closeModal">
                  Close
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
