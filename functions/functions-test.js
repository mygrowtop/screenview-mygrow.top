// 仅用于测试Cloudflare Functions是否正常工作
// 访问/functions-test路径可以看到此消息
export function onRequest(context) {
  return new Response("Cloudflare Pages Functions is working! 正常工作中！", {
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    }
  });
} 