export const runtime = 'edge';

export async function GET() {
  const body = `Team: Fures Tech\nSite: https://fures.at\nContact: hello@fures.at\n`;
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
