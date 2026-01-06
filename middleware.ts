import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Vercel環境でのみBasic認証を有効化
  // VERCEL_ENVはVercel上でのみ自動設定される環境変数
  const isVercelEnvironment = process.env.VERCEL_ENV !== undefined;

  // ローカル開発環境では認証をスキップ
  if (!isVercelEnvironment) {
    return NextResponse.next();
  }

  // 環境変数から認証情報を取得
  const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
  const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

  // 認証情報が設定されていない場合は認証をスキップ（安全のため警告）
  if (!BASIC_AUTH_USER || !BASIC_AUTH_PASSWORD) {
    console.warn('Basic auth credentials not set. Skipping authentication.');
    return NextResponse.next();
  }

  // Authorizationヘッダーを取得
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    // 認証情報がない場合は401を返す
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Basic認証のデコード
  const auth = authHeader.split(' ')[1];
  const [user, password] = Buffer.from(auth, 'base64').toString().split(':');

  // 認証情報の検証
  if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
    // 認証成功
    return NextResponse.next();
  }

  // 認証失敗
  return new NextResponse('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Middlewareを適用するパスの設定
// PWAのService Worker等の静的ファイルは除外
export const config = {
  matcher: [
    /*
     * 以下のパスを除く全てのリクエストにマッチ:
     * - api (APIルート)
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico, manifest.json, sw.js等のPWA関連ファイル
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*\\.js|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)',
  ],
};
