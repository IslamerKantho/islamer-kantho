import markdownStyles from "../../styles/markdownStyles.module.sass";
import BlockContent from "@sanity/block-content-to-react";

export default function SingleArticleContent({ content }) {
  const style = {
    content: {
      marginBottom: 80,
    },
  };
  return (
    <>
      <BlockContent
        className={markdownStyles.markdown}
        style={style.content}
        blocks={content}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      />
    </>
  );
}
