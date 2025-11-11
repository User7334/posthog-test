// Provide a runtime `Astro` global value for the TypeScript language server
// so expressions like `{Astro.generator}` in .astro templates don't error
// with "Cannot use namespace 'Astro' as a value".

declare global {
  const Astro: {
    readonly generator?: string;
    readonly site?: string | undefined;
    readonly env?: Record<string, any>;
    readonly params?: Record<string, any>;
    readonly request?: Request;
    readonly props?: Record<string, any>;
    readonly slots?: Record<string, any>;
  };

  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: Record<string, any>) => void;
      [key: string]: any;
    };
  }
}

export {};
