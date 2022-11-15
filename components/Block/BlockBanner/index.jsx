import Image from "next/image";
import S from "./BlockBanner.module.sass";

const BlockBanner = () => {
  return (
    <>
      <section className={S.__section}>
        {/* <Container dataClasses="mx_auto"> */}
        <Image
          src={`/img/banner.jpg`}
          width={1920}
          height={580}
          alt="Islamer Kantho - Islamic hadith banner"
        />
        {/* </Container> */}
      </section>
    </>
  );
};

export default BlockBanner;
