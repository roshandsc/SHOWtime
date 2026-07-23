const TOKEN_KEY = 'moviehub_token';

export class ApiClient {
  static getHeaders() {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  static async get(url) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
      return await res.json();
    } catch (err) {
      console.warn(`ApiClient.get failed for ${url}:`, err);
      throw err;
    }
  }

  static async post(url, body) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
      return await res.json();
    } catch (err) {
      console.warn(`ApiClient.post failed for ${url}:`, err);
      throw err;
    }
  }

  static async put(url, body) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(),
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
      return await res.json();
    } catch (err) {
      console.warn(`ApiClient.put failed for ${url}:`, err);
      throw err;
    }
  }

  static async delete(url) {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
      return await res.json();
    } catch (err) {
      console.warn(`ApiClient.delete failed for ${url}:`, err);
      throw err;
    }
  }
}
