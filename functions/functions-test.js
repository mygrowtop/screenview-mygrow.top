// Only used to test if Cloudflare Functions are working correctly
// Visit /functions-test path to see this message
export function onRequest(context) {
  return new Response("Cloudflare Pages Functions is working!", {
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    }
  });
} 