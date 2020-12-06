module.exports = {
    OK: 200, //성공
    CREATED: 201, //리소스 생성
    NO_CONTENT: 204, //리소스 삭제
    BAD_REQUEST: 400, //클라이언트 측의 잘못된 요청
    UNAUTHORIZED: 401, //인증이 필요해!
    FORBIDDEN: 403, //이 리소스 요청은 금지야!
    NOT_FOUND: 404, //리소스가 존재하지 않아
    INTERNAL_SERVER_ERROR: 500, //서버 내부 오류
    SERVICE_UNAVAILABLE: 503 //사용 안할 듯
};