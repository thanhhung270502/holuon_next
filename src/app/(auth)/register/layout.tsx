import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HoLuonShop - Register',
  description: 'HoLuon is a platform for shopping',
};

const RegisterLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div>{children}</div>;
};

export default RegisterLayout;
