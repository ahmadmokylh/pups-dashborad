import getServer from '@/lib/getServer';
import { clients } from '@/lib/sse';

export async function GET(req: Request) {
  const session = await getServer();

  if (!session?.user || session.user.role !== 'admin') {
    return new Response('Unauthorized', { status: 401 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // حفظ client
      clients.push({ controller, encoder });

      // إزالة العميل عند قطع الاتصال
      req.signal.addEventListener('abort', () => {
        const index = clients.findIndex((c) => c.controller === controller);
        if (index !== -1) clients.splice(index, 1);
        controller.close();
      });

      // رسالة ترحيب
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ connected: true })}\n\n`)
      );
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
