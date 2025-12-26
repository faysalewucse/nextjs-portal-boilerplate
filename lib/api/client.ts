const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestConfig extends RequestInit {
  token?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    let errorMessage = "An error occurred";
    let errorData = null;

    if (isJson) {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorMessage;
      errorData = errorBody;
    } else {
      errorMessage = await response.text();
    }

    throw new ApiError(response.status, errorMessage, errorData);
  }

  if (isJson) {
    return response.json();
  }

  return response.text() as any;
}

export const apiClient = {
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (config?.token) {
      headers.Authorization = `Bearer ${config.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
      ...config,
    });

    return handleResponse<T>(response);
  },

  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (config?.token) {
      headers.Authorization = `Bearer ${config.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return handleResponse<T>(response);
  },

  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (config?.token) {
      headers.Authorization = `Bearer ${config.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return handleResponse<T>(response);
  },

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (config?.token) {
      headers.Authorization = `Bearer ${config.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (config?.token) {
      headers.Authorization = `Bearer ${config.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
      ...config,
    });

    return handleResponse<T>(response);
  },
};
