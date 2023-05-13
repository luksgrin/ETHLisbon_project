import { Providers } from "../providers";

export const metadata = {
  title: "wagmi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="Main__Content">
        <div className="Card__User Background1">
          <img src="avatar" alt="avatar"></img>
          Description user
        </div>
      </div>
    </>
  );
}
