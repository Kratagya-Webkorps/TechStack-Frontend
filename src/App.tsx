import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Suspense, lazy } from "react";

const LoginForm = lazy(() => import("./components/_auth/forms/LoginForm"));
const SignupForm = lazy(() => import("./components/_auth/forms/SignupForm"));
const AddProduct = lazy(
  () => import("./components/_root/pages/admin/AddProducts")
);
const CategorisedProduct = lazy(
  () => import("./components/layout/CategorisedProduct")
);
const ProductList = lazy(
  () => import("./components/_root/pages/productFields/ProductList")
);
const SingleProductView = lazy(
  () => import("./components/_root/pages/productFields/SingleProductView")
);
const MainLayout = lazy(() => import("./components/layout/MainLayout"));
const Cart = lazy(() => import("./components/_root/pages/productFields/Cart"));
const Wishlist = lazy(
  () => import("./components/_root/pages/productFields/Wishlist")
);
const NotFound = lazy(() => import("./components/utils/NotFound"));
const UserProfile = lazy(() => import("./components/layout/UserProfile"));
const EditProfile = lazy(() => import("./components/layout/EditProfile"));
const PastOrders = lazy(
  () => import("./components/_root/pages/productFields/PastOrders")
);
const About = lazy(() => import("./components/_root/pages/static pages/About"));
const ContactUs = lazy(
  () => import("./components/_root/pages/static pages/ContactUs")
);
function App() {
  return (
    <main className="h-screen">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginForm role="user" />} />
          <Route path="/login-admin" element={<LoginForm role="admin" />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<ProductList />} />
            <Route
              path="/:category/:productId"
              element={<SingleProductView />}
            />
            <Route path="/addproducts" element={<AddProduct />} />
            <Route
              path="/laptops"
              element={<CategorisedProduct category="laptop" />}
            />
            <Route
              path="/accessories"
              element={<CategorisedProduct category="accessories" />}
            />
            <Route path="/tvs" element={<CategorisedProduct category="tv" />} />
            <Route
              path="/phones"
              element={<CategorisedProduct category="phone" />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/:username" element={<UserProfile />} />
            <Route path="/:username/editProfile" element={<EditProfile />} />
            <Route path="/:username/orders" element={<PastOrders />} />
            <Route path="/orders" element={<PastOrders />} />
            <Route path="/orders/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
