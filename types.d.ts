interface Subscriber {
  id: string;
  email: string;
  confirmed: number;
  confirmation_token: string | null;
  created_at: string;
}

interface Ticket {
  id: string;
  event_id: number;
  email: string;
  name: string;
  confirmed: number;
  confirmation_token: string | null;
  subscribe: number;
  created_at: string;
}
