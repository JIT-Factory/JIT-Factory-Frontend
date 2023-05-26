const KAKAO_CLIENT_ID = "ca246a6ff0b18bc1f0c871e985b06eee";
const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/kakao";

const NAVER_CLIENT_ID = "LriqiAyQwy8XlD7Wgsoe";
const NAVER_STATE = "hLiDdL2uhPtsftcU";
const NAVER_REDIRECT_URI = "http://localhost:3000/oauth/naver";

// 프런트엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

// 백엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:5000/kakao/code";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
