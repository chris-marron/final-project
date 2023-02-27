import React from 'react';

export const Navbar = ({ data }) => {
  const unique = [...new Set(data.map(item => item.category))];
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 border-b-2 border-gray fixed w-full">
      <div className="flex items-center flex-shrink-0 text-black mr-6 ">
        <ul className='w-full flex '>
          <li className="group  relative dropdown  px-4 hover:text-black-700 cursor-pointer font-bold text-base uppercase tracking-wide">
            <a href='/' className="font-semibold text-xl tracking-tight">SHOP</a>
            <div className="group-hover:block dropdown-menu fixed hidden h-auto">
              <ul className="top-0 w-100 bg-white shadow px-10 py-12 ">
                {unique.map((item, index) => (
                  <li className="py-1" key={index}><a className="block text-black-500 font-bold text-base uppercase cursor-pointer hover:bg-blue-300">{item}</a></li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center flex-shrink-0 text-black mr-10">
        <a href="/" className="font-semibold text-xl tracking-tight hover">HOME</a>
      </div>

      <div>
        <i className="fa-solid fa-cart-shopping cursor-pointer" />
      </div>
    </nav>
  );
};
