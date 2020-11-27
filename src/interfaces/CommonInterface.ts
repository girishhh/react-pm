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

export type { LocationProps, ActionType, Session };
