import { Divider } from 'antd'
import Date from './date'

export default function Comments({ comments = [] }) {
  return (
    <>
      <h2>Comments:</h2>
      <ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li key={_id} className="mb-5">
            <hr className="mb-5" />
            <h4><a href={`mailto:${email}`}>{name}</a> (<Date
              dateString={_createdAt}
            />)</h4>
            <p>{comment}</p>
            <Divider />
          </li>
        ))}
      </ul>
    </>
  )
}
