'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import styles from '@/styles/auth_session.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '@/api/auth';
import { useRouter } from 'next/navigation';

const FormLogin = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const res = await login({
      phone_number: phoneNumber,
      password,
    });
    if (res.statusCode === 401) {
      setError('Incorrect password or User is not existed');
    } else if (res.statusCode === 200) {
      var session = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user,
      };
      console.log(session);
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
      <div className={clsx(styles.divider)}>----------or continue with email----------</div>
      <form>
        <div className={clsx(styles.form)}>
          <div className={clsx(styles.label)}>Phone Number</div>
          <input
            type="text"
            className={clsx(styles.input)}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
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
        <div className={clsx(styles.formCheckbox)}>
          <input
            type="checkbox"
            className={clsx(styles.input)}
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <div className={clsx(styles.label)}>Remember me</div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Back
          </button>
          <div className={clsx(styles.btnSubmit)} onClick={handleSubmit}>
            Log In
          </div>
        </div>
        <div className={clsx('pt-5 text-center')}>
          Don't have an account?{' '}
          <Link href="/register" className={clsx(styles.link, 'text-indigo-600 font-bold')}>
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
