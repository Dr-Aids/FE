import "./ProfileRow.css";

export default function ProfileRow({ title, content }) {
  return (
    <div className="profile-row__container">
      <span>{title}</span>
      <span>{content}</span>
    </div>
  );
}
