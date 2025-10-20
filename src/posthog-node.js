import { PostHog } from 'posthog-node';

let client = null;

export default function PostHogNode() {
  if (!client) {
    client = new PostHog('phc_DEIN_API_KEY', {
      host: 'https://us.i.posthog.com',
    });
  }
  return client;
}
