import Link from "next/link";
import "./footer.css";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
const Footer = () => {
  return (
    <footer>
      <div className="quickLinks">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Communities</Link>
          </li>
        </ul>
      </div>
      <div className="quickResources">
        <h3>Resources</h3>
        <ul>
          <li>
            <Link href="#">Blog</Link>
          </li>
          <li>
            <Link href="#">Help Center</Link>
          </li>
          <li>
            <Link href="#">Feedback</Link>
          </li>
        </ul>
      </div>
      <div className="quickFollowus">
        <h3>Follow Us</h3>
        <ul>
          <li>
            {" "}
            <CiFacebook />
          </li>
          <li>
            {" "}
            <CiInstagram />
          </li>
          <li>
            {" "}
            <CiTwitter />
          </li>
        </ul>
      </div>
      <div className="quickCopyright">
        <p>&copy; 2026 SDEDIT. All rights resevered</p>
        <p>Terms of services.</p>
      </div>
    </footer>
  );
};

export default Footer;
