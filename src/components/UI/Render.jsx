const Render = ({
  children,
  condition = true,
  fallback = null,

  elseIf = null,
}) => {
  return condition ? children : fallback;
};

export { Render };
