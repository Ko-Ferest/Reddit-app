import "cross-fetch/polyfill";
import "web-streams-polyfill/polyfill";
import { BroadcastChannel } from "worker_threads";

Reflect.set(globalThis, "BroadcastChannel", BroadcastChannel);
