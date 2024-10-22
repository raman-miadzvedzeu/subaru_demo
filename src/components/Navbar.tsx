import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex space-x-8 text-gray-600">
        <a href="#" className="hover:underline">
          STARLINK®
        </a>
        <a href="#" className="hover:underline">
          Vehicle Service & Maintenance
        </a>
        <a href="/subscriptions" className="hover:underline">
          Manage Subscriptions
        </a>
        <a href="#" className="hover:underline">
          Owner Support & Resources
        </a>
      </div>
      <div className="text-gray-600">
        <a href="#" className="hover:underline">
          My Profile
        </a>
      </div>
    </div>
  );
};
