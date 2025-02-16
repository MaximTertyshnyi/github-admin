import PropTypes from "prop-types";
import classNames from "../../functions/classNames";

import "./Button.scss";

export function Button({
  children,
  theme,
  className,
  to,
  size,
  icon,
  ...props
}) {
  return (
    <button
      className={classNames(
        "Button",
        theme && `Button--${theme}`,
        size && `Button--${size}`,
        className
      )}
      to={to}
      {...props}
    >
      {icon && <span className="Button__icon">{icon}</span>}
      <span className="Button__text">{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(["primary", "secondary", "danger"]),
  className: PropTypes.string,
  to: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
