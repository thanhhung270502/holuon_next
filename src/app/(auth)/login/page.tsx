import clsx from 'clsx';
import styles from '@/styles/auth_session.module.css';
import Image from 'next/image';
import FormLogin from '@/app/(auth)/login/form';

const LoginPage = () => {
  return (
    <div className={clsx(styles.session, styles.login)}>
      <div className="container">
        <div className={clsx(styles.inner)}>
          <div className="flex-1">
            <div className={clsx(styles.left)}>
              <div className={clsx(styles.logo)}>HoLuon</div>
              <div className={clsx(styles.title)}>Log in to your Account</div>
              <div className={clsx(styles.subTitle)}>Welcome back! Select method to log in:</div>
              <FormLogin />
            </div>
          </div>
          <div className="flex-1">
            <div className={clsx(styles.right)}>
              <div className={clsx(styles.image)}>
                <Image
                  src="/images/login.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={clsx(styles.img)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
