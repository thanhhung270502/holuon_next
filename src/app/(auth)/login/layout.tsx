import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HoLuonShop - Login',
  description: 'HoLuon is a platform for shopping',
};

const LoginLayout = ({ children }: Readonly<{ children: React.ReactNode; layout: String }>) => {
  return <div>{children}</div>;
};

export default LoginLayout;
