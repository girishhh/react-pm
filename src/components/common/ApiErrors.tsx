import React from "react";
import "./ApiErrors.scss";

interface ApiErrorProps {
  errors: string[];
}

class ApiError extends React.Component<ApiErrorProps> {
  render() {
    const { errors } = this.props;
    return (
      <div className="api-errors">
        <ul>
          {errors.map((error: string) => (
            <li className="pt-1">{error}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ApiError;
