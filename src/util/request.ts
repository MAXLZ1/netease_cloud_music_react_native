export default class Request {
  static GET(url: string): Promise<Object> {
    return fetch(url)
      .then(data => data.json());
  }

  static POST(url: string, data: any): Promise<Object> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(data => data.json());
  }
}
