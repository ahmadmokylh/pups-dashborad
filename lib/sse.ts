export type SSEClient = {
  controller: ReadableStreamDefaultController<Uint8Array>;
  encoder: TextEncoder;
  userId?: string;
};

declare global {
  var sseClients: SSEClient[] | undefined;
}

const globalAny = globalThis as unknown as { sseClients?: SSEClient[] };

if (!globalAny.sseClients) {
  globalAny.sseClients = [];
}

export const clients: SSEClient[] = globalAny.sseClients!;

export function sendEvent(event: string, data: unknown) {
  console.log('📡 Broadcasting event:', event, 'to', clients.length, 'clients');

  const payload = `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`;

  clients.forEach((client) => {
    client.controller.enqueue(client.encoder.encode(payload));
    client.controller.enqueue(client.encoder.encode(': ping\n\n'));
  });
}
