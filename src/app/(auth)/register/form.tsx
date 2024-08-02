'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import styles from '@/styles/auth_session.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { signup } from '@/api/auth';
import { useRouter } from 'next/navigation';

const FormRegister = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      // handle errors
      setError('Password does not match');
      return;
    }

    const res = await signup({ name: fullName, phone_number: phoneNumber, password });

    if (res.statusCode === 201) {
      let session = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user,
      };
      localStorage.setItem('session', JSON.stringify(session));
      router.push('/');
      router.refresh();
    }
  };

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_LOCAL_API_URL}/auth/google/callback`, '_self');
  };

  return (
    <div>
      <div className={clsx(styles.method__block)}>
        <div className={clsx(styles.method__item)} onClick={googleAuth}>
          <div className="pr-2">
            <Image
              src="/images/logo/google_logo.png"
              width={500}
              height={500}
              alt="Login with Google"
              className={clsx(styles.method__logo)}
            />
          </div>
          <div>Continue with Google</div>
        </div>
      </div>
      <div className={clsx(styles.divider)}>----------or sign up with email----------</div>
      <form>
        <div className="flex">
          <div className="flex-1 pe-3">
            <div className={clsx(styles.form)}>
              <div className={clsx(styles.label)}>Phone Number</div>
              <input
                type="text"
                className={clsx(styles.input)}
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 ps-3">
            <div className={clsx(styles.form)}>
              <div className={clsx(styles.label)}>Full Name</div>
              <input
                type="text"
                className={clsx(styles.input)}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={clsx(styles.form)}>
          <div className={clsx(styles.label)}>Password</div>
          <input
            type="password"
            className={clsx(styles.input)}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={clsx(styles.form)}>
          <div className={clsx(styles.label)}>Confirm Password</div>
          <input
            type="password"
            className={clsx(styles.input)}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className={clsx(styles.error)}>{error}</div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Back
          </button>
          <div className={clsx(styles.btnSubmit)} onClick={handleSubmit}>
            Sign Up
          </div>
        </div>
        <div className={clsx('pt-5 text-center text-sm')}>
          Already have an account?{' '}
          <Link href="/login" className={clsx(styles.link, 'text-indigo-600 font-bold')}>
            Login Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
