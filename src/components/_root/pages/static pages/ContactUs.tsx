import { GrMapLocation } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";


const ContactUs = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 border">
        <div className="bg-gray-900 md:col-span-4 p-10 text-white">
          <p className="mt-4 text-sm leading-7 font-regular uppercase">
            Contact
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Get In <span className="text-indigo-600">Touch</span>
          </h3>
          <p className="mt-4 leading-7 text-gray-200 text-justify">
            Welcome to my custom-built e-commerce website, crafted with the MERN
            stack! Explore a seamless shopping experience with dynamic features,
            secure transactions, and an intuitive interface. For inquiries or
            support, feel free to reach out through our contact page. Happy
            shopping!
          </p>

          <div className="flex gap-3 items-center mt-5">
          <GrMapLocation size={30} />

            <span className=" text-sm">
              Mhow,Indore ,Madhya Pradesh,India 453441
            </span>
          </div>
          <div className="flex gap-3 items-center mt-5">
            <IoCall/>
            <span className="text-sm">+91 8982717649</span>
          </div>
          <div className="flex gap-3 items-center mt-5">
            <IoIosMail/>
            <span className="text-sm">kratagyaagrawal739@gmail.com</span>
          </div>
        </div>
        <div className="md:col-span-8 p-10">
          <p className="mt-4 text-sm leading-7 font-regular uppercase">
            Contact
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Contact <span className="text-indigo-600">Us</span>
          </h3>
          <form className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="form-control block w-full px-3 py-2 text-base leading-6 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                  id="firstName"
                />
              </div>
              <div className="form-group">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="form-control block w-full px-3 py-2 text-base leading-6 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                  id="lastName"
                />
              </div>
            </div>
            <div className="form-group mt-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="form-control block w-full px-3 py-2 text-base leading-6 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                type="email"
                id="email"
              />
            </div>
            <div className="form-group mt-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="form-control block w-full px-3 py-2 text-base leading-6 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                id="message"
              ></textarea>
            </div>
            <button className="mt-4 w-full bg-indigo-600 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700 transition-colors duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
