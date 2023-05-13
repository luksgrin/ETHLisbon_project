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
          <img className="Card__UserAvatar" src="avatar" alt="avatar"></img>
          <div className="Card__UserDescription"></div>
        </div>
      </div>

      {/* here i need dynamically to */}
    </>
  );
}
