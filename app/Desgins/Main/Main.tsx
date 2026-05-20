import { ReactNode } from "react";
import "./main.css";

const Main = ({ children }: { children: ReactNode }) => {
  return <div className="main">{children}</div>;
};

export default Main;
