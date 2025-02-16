import PropTypes from "prop-types";
import classNames from "../../functions/classNames";

import "./SpinnerOverlay.scss";

// A universal loader component for displaying on a page
export const SpinnerOverlay = ({ className, size, theme }) => (
  <div className="SpinnerOverlay">
    <div
      className={classNames(
        "Spinner",
        size && `Spinner--size-${size}`,
        theme && `Spinner--${theme}`,
        className
      )}
    >
      <span />
    </div>
  </div>
);

SpinnerOverlay.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  theme: PropTypes.oneOf(["red", "dark", "primary"]),
};
