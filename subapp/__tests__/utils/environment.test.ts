import { Global } from "../../lib/GlobalConfig";
import { RestUtils } from "../../src/utils/environment";

it('should make fetch request with default headers and authorization token', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;
    Global.token = 'test-token';

    const uri = 'https://api.example.com/data';
    await RestUtils.fetch(uri, {});

    expect(mockFetch).toHaveBeenCalledWith(uri, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      }
    });
  });

  it('should handle undefined options by setting default values', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;
    Global.token = 'test-token';

    const uri = 'https://api.example.com/data';
    await RestUtils.fetch(uri, undefined);

    expect(mockFetch).toHaveBeenCalledWith(uri, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer test-token'
      }
    });
  });