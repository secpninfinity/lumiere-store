export default function Toast({ message, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <i className="ti ti-circle-check"></i>
      <span>{message}</span>
    </div>
  );
}
