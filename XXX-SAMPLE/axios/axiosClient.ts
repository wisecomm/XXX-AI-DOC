// src/api/axiosClient.ts
import axios from 'axios';

// 1. Axios 인스턴스 생성 (기본 설정)
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api', // 환경변수 사용 권장
    timeout: 10000, // 10초 타임아웃
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. 요청 인터셉터 (토큰 자동 주입)
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // 토큰 저장소 확인
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. 응답 인터셉터 (에러 공통 처리)
axiosClient.interceptors.response.use(
    (response) => response.data, // data만 바로 반환 (response.data.data 아님)
    (error) => {
        // 공통 에러 처리 로직 (예: 401 로그아웃)
        if (error.response && error.response.status === 401) {
            // 로그아웃 처리 또는 토큰 갱신 로직
            console.error('인증 실패: 로그인이 필요합니다.');
        }
        return Promise.reject(error);
    }
);

// 4. CRUD 공통 함수 (API 서비스)
export const api = {
    // GET: 데이터 조회
    get: (url, params) => axiosClient.get(url, { params }),

    // POST: 데이터 생성
    post: (url, data) => axiosClient.post(url, data),

    // PUT: 데이터 전체 수정
    put: (url, data) => axiosClient.put(url, data),

    // PATCH: 데이터 일부 수정
    patch: (url, data) => axiosClient.patch(url, data),

    // DELETE: 데이터 삭제
    delete: (url) => axiosClient.delete(url),
};

export default axiosClient;