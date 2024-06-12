export default function FileInput({ name, required, extraClasses, onChange }) {
  return (
    <input
      type="file"
      id={name}
      name={name}
      required={required}
      onChange={onChange}
    />
  );
}
