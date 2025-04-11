// src/utils/http.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

interface CustomRequestConfig extends AxiosRequestConfig {
  _retryCount?: number; // 当前重试次数
  _needRetry?: boolean; // 是否需要重试
}

interface HttpResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

class HttpRequest {
  private static instance: HttpRequest;
  private readonly service: AxiosInstance;
  private readonly maxRetries: number = 3; // 最大重试次数
  private readonly retryDelay: number = 1000; // 重试延迟(ms)

  private constructor() {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_APP_API_BASE,
      timeout: 15000,
      withCredentials: true,
    });

    // 请求拦截器
    this.service.interceptors.request.use(
      (config) => {
        // 注入token
        const token = localStorage.getItem("token");
        if (token) {
          config.headers!["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse<HttpResponse>) => {
        // 统一处理数据结构
        const { code, message, data } = response.data;
        if (code !== 200) {
          return Promise.reject(new Error(message));
        }
        return data;
      },
      async (error: AxiosError) => {
        const originalConfig = error.config as CustomRequestConfig;

        // 特殊处理401 token过期
        if (error.response?.status === 401) {
          return this.handleTokenExpired(originalConfig);
        }

        // 网络错误或超时自动重试
        if (
          !originalConfig?._retryCount &&
          (error.code === "ECONNABORTED" || !error.response)
        ) {
          return this.retryRequest(originalConfig);
        }

        // 统一错误处理
        return this.handleError(error);
      }
    );
  }

  // 获取单例实例
  public static getInstance(): HttpRequest {
    if (!HttpRequest.instance) {
      HttpRequest.instance = new HttpRequest();
    }
    return HttpRequest.instance;
  }

  // 核心请求方法
  public async request<T = any>(config: CustomRequestConfig): Promise<T> {
    return this.service.request(config);
  }

  // 处理token过期
  private async handleTokenExpired(
    originalConfig: CustomRequestConfig
  ): Promise<any> {
    try {
      // const newToken = await this.refreshToken();
      // localStorage.setItem("token", newToken);
      // originalConfig.headers!["Authorization"] = `Bearer ${newToken}`;
      return this.service(originalConfig);
    } catch (e) {
      // 跳转登录页
      window.location.href = "/login";
      return Promise.reject(e);
    }
  }

  // 请求重试（支持指数退避）
  private async retryRequest(config: CustomRequestConfig): Promise<any> {
    config._retryCount = config._retryCount || 0;

    if (config._retryCount >= this.maxRetries) {
      return Promise.reject(new Error("Max retries exceeded"));
    }

    config._retryCount += 1;
    const delay = config._retryCount * this.retryDelay;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.service(config));
      }, delay);
    });
  }

  // 统一错误处理
  private handleError(error: AxiosError): Promise<never> {
    const status = error.response?.status;
    const messageMap: { [key: number]: string } = {
      400: "请求参数错误",
      403: "没有操作权限",
      404: "资源不存在",
      500: "服务器错误",
    };

    const message = messageMap[status!] || error.message || "未知错误";

    // 可在此处触发全局错误提示
    window.$message?.error(message);
    return Promise.reject(new Error(message));
  }

  // 更新全局配置
  public updateConfig(config: AxiosRequestConfig): void {
    this.service.defaults = Object.assign(this.service.defaults, config);
  }

  // 封装快捷方法
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: "GET", url, ...config });
  }

  public post<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: "POST", url, ...config });
  }

  public put<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: "PUT", url, ...config });
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: "DELETE", url, ...config });
  }
}

const http = HttpRequest.getInstance();

export default http;
