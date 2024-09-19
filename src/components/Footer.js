// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="py-4 bg-gray-800 text-center text-white">
//       <p>© 2024 Ashutosh Gaikwad. All Rights Reserved.</p>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
// import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-3 bg-gray-800">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center">
        <p className="text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Ashutosh Gaikwad. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
