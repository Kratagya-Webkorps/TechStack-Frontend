import { useSelector } from "react-redux";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const userData = useSelector((state: any) => state.loginForm);
  const { username, role, email } = userData;
  return (
    <div className="flex justify-center items-center min-h-full bg-gray-100 py-8">
      <div className="bg-white overflow-hidden w-full max-w-2xl shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {username} Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about {username}.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {username}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {role}
              </dd>
            </div>
            <div className="flex justify-end px-6 gap-4 py-4">
              <Link to={`/${username}/editProfile`}><Button  type="submit">Edit Profile</Button></Link>
              <Link to={`/${username}/orders`}><Button  type="button">Orders</Button></Link>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
