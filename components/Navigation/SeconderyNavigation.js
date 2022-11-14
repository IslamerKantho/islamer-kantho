import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import { getCategoryList } from "../../pages/api/api";
import Container from "../container";

export default function SeconderyNavigation({ data, preview }) {
  console.log("All Category: ", data);
  return (
    <>
      <nav className="ik_nav_secondery" preview={preview}>
        <Container dataClasses="mx_auto">
          <div className="ik_text-center">
            <ScrollContainer className="scroll-container">
              <div className="ik_inline_menu">
                <Link href={`/`}>আমালিয়াত</Link>
                <Link href={`/`}>ইসলামি আদাব (শিষ্টাচার)</Link>
                <Link href={`/`}>ইসলামি প্রবন্ধ</Link>
                <Link href={`/`}>ইসলামি সাহিত্য</Link>
                <Link href={`/`}>ওয়াজ</Link>
                <Link href={`/`}>কবিতা</Link>
                <Link href={`/`}>কোরআন</Link>
                <Link href={`/`}>দারসুল কোরআন</Link>
                <Link href={`/`}>দারসুল হাদীস</Link>
                <Link href={`/`}>মাসয়ালা</Link>
                <Link href={`/`}>সমসাময়িক আলোচনা</Link>
                <Link href={`/`}>হাদীস</Link>
              </div>
            </ScrollContainer>
          </div>
        </Container>
      </nav>

      <style jsx>{`
        a {
          text-decoration: none;
        }

        .ik_nav_secondery {
          width: 100%;
          background: #055547;
          border-bottom: 1px solid rgb(242, 242, 247);
        }

        .ik_inline_menu {
          width: 100%;
          display: flex;
          align-items: center;
          overflow-y: auto;
        }
        .ik_inline_menu a:first-of-type {
          padding-left: 0;
        }

        .ik_inline_menu a {
          margin: 8px 15px 8px 0;
          color: #fff;
          font-size: 13px;
          display: flex;
          flex: 0 0 auto;
          position: relative;
        }
        .ik_inline_menu a:hover {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </>
  );
}
