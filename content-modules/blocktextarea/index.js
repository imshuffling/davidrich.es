import ReactMarkdown from 'react-markdown'

export default function BlockTextArea({ title, body, centerText }) {
  return (
    <div
      className={centerText ? "section text-area__center" : "section text-area"}
      data-aos="fade-in"
      data-aos-delay="300"
      data-aos-once="true"
    >
      <h3>{title}</h3>
      <div><ReactMarkdown>{body}</ReactMarkdown></div>
    </div>
  );
}
