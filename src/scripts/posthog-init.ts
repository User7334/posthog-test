import { initPosthog } from "./posthog";
import "./abtest";

const key = import.meta.env.PUBLIC_POSTHOG_KEY || "phc_KOcWjzbh56k1BfKTHlPJD0PGavdy7gMd7qVME4syB40";
const host = import.meta.env.PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

initPosthog(key, host);
