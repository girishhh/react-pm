import { match } from "react-router-dom";
import * as H from "history";

interface LocationProps {
  match: match;
  location: H.Location;
  history: H.History;
}

interface ActionType {
  type: string;
  payload: any;
}

interface Session {
  accessToken: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  token_type: string;
  session_state: string;
}

interface KeyValue {
  [key: string]: any;
}

interface APIResponse {
  status: number;
  response: {
    data?: any;
    message?: string;
  };
}

export type { LocationProps, ActionType, Session, KeyValue, APIResponse };
