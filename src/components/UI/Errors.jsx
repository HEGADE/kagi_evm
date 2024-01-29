export const ValidationError = ({ err }) => {
  return (
    <p
      style={{
        color: "red",
        marginTop: "2px",
        marginLeft: "5px",
      }}
    >
      {err?.message}
    </p>
  );
};
