import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const api = axios.create({
    baseURL: 'https://example.com/api', // 필요한 URL로 변경하세요
})

// 요청별로 디바운스 타이머를 저장하는 객체
const debounceTimers: Record<string, NodeJS.Timeout> = {}

const debouncedRequest = async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const requestKey = `${config.method}:${config.url}`

    // 기존 타이머가 있다면 초기화
    if (debounceTimers[requestKey]) {
        clearTimeout(debounceTimers[requestKey])
    }

    return new Promise((resolve, reject) => {
        debounceTimers[requestKey] = setTimeout(async () => {
            try {
                const response = await api.request<T>(config)
                resolve(response)
            } catch (error) {
                reject(error)
            } finally {
                delete debounceTimers[requestKey]
            }
        }, 200)
    })
}

export default debouncedRequest