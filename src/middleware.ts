import { NextRequest, NextResponse } from "next/server";

// 인증 실패 시 401 응답 + 브라우저 로그인 팝업 요청
function unauthorizedResponse() {
  return new NextResponse("Authentication required, 인증이 필요합니다", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Libaitian Visitor Insights"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

// Authorization 헤더에서 credentials 추출 및 파싱
function parseCredentials(
  authHeader: string | null
): { username: string; password: string } | null {
  if (!authHeader?.startsWith("Basic ")) return null;

  try {
    // "Basic xxxx" 에서 xxxx 부분 추출 후 Base64 디코딩
    const base64Credentials = authHeader.slice(6);
    const decoded = atob(base64Credentials);

    // "username:password" 형태를 분리 (password에 ":"가 포함될 수 있으므로 첫 번째만 분리)
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) return null;

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

// 유효한 계정인지 검증
function isValidCredentials(username: string, password: string): boolean {
  const validAccounts = [
    {
      user: process.env.BASIC_AUTH_USER,
      pass: process.env.BASIC_AUTH_USER_PASSWORD,
    },
    {
      user: process.env.BASIC_AUTH_DEV,
      pass: process.env.BASIC_AUTH_DEV_PASSWORD,
    },
  ];

  return validAccounts.some(
    (account) =>
      account.user &&
      account.pass &&
      account.user === username &&
      account.pass === password
  );
}

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const credentials = parseCredentials(authHeader);

  if (!credentials || !isValidCredentials(credentials.username, credentials.password)) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

// /insights 경로에만 미들웨어 적용
export const config = {
  matcher: "/insights/:path*",
};