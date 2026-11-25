import Link from "next/link";
import FormatterDate from "./FormatterDate";

export default function Comments({ comments = [] }) {
  return (
    <>
      <h2>Comments:</h2>
      <ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li key={_id} className="mb-5">
            <hr className="mb-5" />
            <h4>
              <Link href={`mailto:${email}`}>
                {name} (<FormatterDate dateString={_createdAt} />)
              </Link>
            </h4>
            <p>{comment}</p>
            <hr className="my-3" />
          </li>
        ))}
      </ul>
    </>
  );
}
