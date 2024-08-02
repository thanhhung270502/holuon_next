'use client';

import clsx from 'clsx';
import styles from '@/styles/header.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faCartShopping,
  faGear,
  faMoneyBill,
  faRightFromBracket,
  faShop,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { AppContext } from '@/providers/app-provider';
import { ModeToggle } from '@/components/mode-toggle';

export default function Header() {
  const { user } = useContext(AppContext);
  const router = useRouter();

  const path_name = usePathname();
  const showHeader = path_name != '/login' && path_name != '/register';

  const [isLight, setIsLight] = useState(true);
  const [text, setText] = useState('');
  const [avatar, setAvatar] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  let userMenuRef = useRef();
  const [openCart, setOpenCart] = useState(true);

  const handleChangeDarkMode = () => {
    var currentTheme = localStorage.getItem('theme');
    if (currentTheme && currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    } else if (!currentTheme || currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    }
  };

  const handleChangeText = (event: any) => {
    setText(event.target.value);
  };

  const handleLogout = () => {
    localStorage.setItem('session', '');
    router.push('/');
    router.refresh();
  };

  useEffect(() => {}, []);

  return (
    <div>
      {showHeader && (
        <nav className={clsx(styles.nav)}>
          <div className={clsx(styles.topbar)}>
            <div className="container">
              <div className={clsx(styles.inner__topbar)}>
                <div className="flex items-center">
                  <div className={clsx(styles.topbar__item)}>Sell with PolkaDots</div>
                  <span className={clsx(styles.divide)}>|</span>
                  <div className={clsx(styles.topbar__item)}>
                    Connect to
                    <Link href="./" className={clsx(styles.topbar__icon)}>
                      <FontAwesomeIcon icon={faFacebook as IconProp} />
                    </Link>
                    <Link href="./" className={clsx(styles.topbar__icon)}>
                      <FontAwesomeIcon icon={faInstagram as IconProp} />
                    </Link>
                  </div>
                </div>
                {!user && (
                  <div className={clsx('d-flex', 'align-items-center')}>
                    <Link className={clsx(styles.btn, styles.btnLogin)} href="/login">
                      Login
                    </Link>
                    <Link className={clsx(styles.btn, styles.btnSignup)} href="/register">
                      Signup
                    </Link>
                  </div>
                )}
                {user && (
                  <Menu
                    as="div"
                    className={clsx('relative', 'inline-block', 'text-left', styles.dropdown)}
                  >
                    <div>
                      <MenuButton
                        className={clsx(
                          'inline-flex w-full justify-center gap-x-1.5',
                          'rounded-md bg-white px-3 py-2 text-sm font-semibold',
                          'text-gray-900',
                          styles.dropdownToggle,
                        )}
                      >
                        <FontAwesomeIcon icon={faUser as IconProp} />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className={clsx(
                        'absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y',
                        'divide-gray-100 rounded-md bg-white shadow-lg',
                        'ring-1 ring-black ring-opacity-5 transition',
                        'focus:outline-none data-[closed]:scale-95 data-[closed]:transform',
                        'data-[closed]:opacity-0 data-[enter]:duration-100',
                        'data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in',
                        styles.dropdownMenu,
                      )}
                    >
                      <div className="py-1">
                        <div className={clsx(styles.dropdownItem, 'pb-3')}>
                          <div className={clsx(styles.dropdownItem__image)}>
                            <img
                              src={
                                'https://cdn.popsww.com/blog-kids/sites/3/2022/05/thong-tin-co-ban-1024x576.jpg'
                              }
                              alt="avatar"
                              className={clsx(styles.dropdownItem__img)}
                            />
                          </div>
                          <div className={clsx(styles.dropdownItem__info)}>
                            <Link
                              className={clsx(styles.dropdownItem__name)}
                              href={`/customer/edit`}
                            >
                              Thanh Hùng
                            </Link>
                            <div className={clsx(styles.dropdownItem__email)}>
                              thanhhung@gmail.com
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <MenuItem>
                          <a
                            href="#"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            <div className={clsx(styles.dropdownItem__icon)}>
                              <FontAwesomeIcon icon={faShop as IconProp} />
                            </div>
                            <div className={clsx(styles.dropdownItem__text)}>Shop</div>
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            <div className={clsx(styles.dropdownItem__icon)}>
                              <FontAwesomeIcon icon={faMoneyBill as IconProp} />
                            </div>
                            <div className={clsx(styles.dropdownItem__text)}>Orders</div>
                          </a>
                        </MenuItem>
                      </div>
                      <div className="py-1">
                        <MenuItem>
                          <ModeToggle />
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            <div className={clsx(styles.dropdownItem__icon)}>
                              <FontAwesomeIcon icon={faShop as IconProp} />
                            </div>
                            <div className={clsx(styles.dropdownItem__text)}>Shop</div>
                          </a>
                        </MenuItem>
                      </div>
                      <div className="py-1">
                        <MenuItem>
                          <a
                            href="#"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            <div className={clsx(styles.dropdownItem__icon)}>
                              <FontAwesomeIcon icon={faShop as IconProp} />
                            </div>
                            <div className={clsx(styles.dropdownItem__text)}>Shop</div>
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            <div className={clsx(styles.dropdownItem__icon)}>
                              <FontAwesomeIcon icon={faShop as IconProp} />
                            </div>
                            <div className={clsx(styles.dropdownItem__text)}>Shop</div>
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                )}
              </div>
            </div>
          </div>
          <div className={clsx(styles.navBar)}>
            <div className="container">
              <div className={clsx(styles.inner__navbar)}>
                <Link href="/" className={clsx(styles.logo)}>
                  HoLuon
                </Link>
                <div className={clsx(styles.midBar)}>
                  <div className={clsx(styles.searchBar)}>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className={clsx(
                        'block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900',
                        'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400',
                        'focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                      )}
                    />
                  </div>
                </div>
                <div className={clsx(styles.cart)}>
                  <div className={clsx(styles.btnCart)} onClick={() => setOpenCart(true)}>
                    <FontAwesomeIcon icon={faCartShopping as IconProp} />
                  </div>
                </div>
                {/* <Dialog open={openCart} onClose={setOpenCart} className="relative z-10">
                  <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                  />

                  <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                          transition
                          className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                          <TransitionChild>
                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                              <button
                                type="button"
                                onClick={() => setOpenCart(false)}
                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                              </button>
                            </div>
                          </TransitionChild>
                          <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                            <div className="px-4 sm:px-6">
                              <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                                Panel title
                              </DialogTitle>
                            </div>
                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            </div>
                          </div>
                        </DialogPanel>
                      </div>
                    </div>
                  </div>
                </Dialog> */}
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
