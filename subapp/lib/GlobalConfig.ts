class GlobalConfig {
  private _url: string = '';
  private _token: string = '';
  private _contextPathUrl: string = '';

  public get url(): string {
    return this._url;
  }

  public set url(value: string) {
    this._url = value;
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  public get contextPathUrl(): string {
    return this._contextPathUrl;
  }

  public set contextPathUrl(value: string) {
    this._contextPathUrl = value;
  }
}

export const Global = new GlobalConfig();
