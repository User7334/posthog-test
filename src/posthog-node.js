import { PostHog } from 'posthog-node';

let client = null;

export default function PostHogNode() {
  if (!client) {
    client = new PostHog('phc_LWkJmAO7mxFzH6dXQxgZHsK7wJ7qn1RD6AAwvr7Okgm', {
      host: 'https://eu.i.posthog.com',
    });
  }
  return client;
}
