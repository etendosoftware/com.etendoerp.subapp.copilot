import { renderHook, act } from '@testing-library/react-native';
import { useAssistants } from '../../src/hooks/useAssistants.tsx';
import { RestUtils } from '../../src/utils/environment.ts';

jest.mock('../../src/utils/environment', () => ({
  RestUtils: {
    fetch: jest.fn()
  }
}));

jest.mock('../../lib/GlobalConfig', () => ({
  Global: {
    url: 'https://test.com',
    contextPathUrl: '/context',
  }
}));

jest.mock('../../src/utils/references', () => ({
  References: {
    url: {
      SWS: 'sws',
      COPILOT: 'copilot',
      GET_ASSISTANTS: 'getAssistants'
    }
  }
}));

describe('useAssistants Hook', () => {
  const mockAssistants = [
    { id: '1', name: 'Assistant 1' },
    { id: '2', name: 'Assistant 2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default states', () => {
    const { result } = renderHook(() => useAssistants());

    expect(result.current.selectedOption).toBeNull();
    expect(result.current.assistants).toEqual([]);
    expect(result.current.showInitialMessage).toBe(true);
  });

  it('fetches assistants and sets initial selection', async () => {
    (RestUtils.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockAssistants)
    });

    const { result } = renderHook(() => useAssistants());

    await act(async () => {
      await result.current.getAssistants();
    });

    expect(RestUtils.fetch).toHaveBeenCalledWith(
      `https://test.com/context/sws/copilot/getAssistants`,
      { method: 'GET' }
    );
    expect(result.current.assistants).toEqual(mockAssistants);
    expect(result.current.selectedOption).toEqual(mockAssistants[0]);
  });

  it('handles option selection', () => {
    const { result } = renderHook(() => useAssistants());

    const testAssistant = { id: '2', name: 'Test Assistant' };

    act(() => {
      result.current.handleOptionSelected(testAssistant);
    });

    expect(result.current.selectedOption).toEqual(testAssistant);
    expect(result.current.showInitialMessage).toBe(true);
  });

  it('hides initial message correctly', () => {
    const { result } = renderHook(() => useAssistants());

    
    act(() => {
      result.current.hideInitialMessage();
    });

    expect(result.current.showInitialMessage).toBe(false);
  });

  it('resets messages', () => {
    const { result } = renderHook(() => useAssistants());

    
    act(() => {
      result.current.hideInitialMessage();
    });

    
    act(() => {
      result.current.resetMessages();
    });

    
    expect(result.current.showInitialMessage).toBe(true);
  });

  it('handles empty assistants response', async () => {
    (RestUtils.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve([])
    });

    const { result } = renderHook(() => useAssistants());

    await act(async () => {
      await result.current.getAssistants();
    });

    expect(result.current.assistants).toEqual([]);
    expect(result.current.selectedOption).toBeNull();
  });
});