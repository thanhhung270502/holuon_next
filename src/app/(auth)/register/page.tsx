import clsx from 'clsx';
import styles from '@/styles/auth_session.module.css';
import Image from 'next/image';
import FormRegister from '@/app/(auth)/register/form';

const RegisterPage = () => {
  return (
    <div className={clsx(styles.session, styles.signup)}>
      <div className="container">
        <div className={clsx(styles.inner)}>
          <div className={clsx(styles.flex_left)}>
            <div className={clsx(styles.right)}>
              <div className={clsx(styles.image)}>
                <Image
                  src="/images/signup.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={clsx(styles.img)}
                />
              </div>
            </div>
          </div>
          <div className={clsx(styles.flex_right)}>
            <div className={clsx(styles.left)}>
              <div className={clsx(styles.logo)}>HoLuon</div>
              <div className={clsx(styles.title)}>Get Started Now</div>
              <div className={clsx(styles.subTitle)}>
                Enter your details below to create your account and get started.
              </div>
              <FormRegister />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
