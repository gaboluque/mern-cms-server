import responseFormatter from '../../../../../src/complements/helpers/templates/responseFormatter';

describe('response formatter helper', () => {
  it('should correctly format message', async () => {
    const formattedResponse = responseFormatter(null, 'Test');
    expect(formattedResponse.success).toBe(true);
    expect(formattedResponse.info.message).toBe('Test');
    expect(formattedResponse.info.type).toBe('success');
    expect(formattedResponse.data).toBe(undefined);
  });
  it('should correctly format data', async () => {
    const data = { data: 'test' };
    const formattedResponse = responseFormatter(data);
    expect(formattedResponse.success).toBe(true);
    expect(formattedResponse.data).toBe(data);
    expect(formattedResponse.info).toBe(undefined);
  });
  it('should correctly format data and message', async () => {
    const data = { data: 'test' };
    const formattedResponse = responseFormatter(data, 'Test');
    expect(formattedResponse.info.message).toBe('Test');
    expect(formattedResponse.info.type).toBe('success');
    expect(formattedResponse.success).toBe(true);
    expect(formattedResponse.data).toBe(data);
  });
});
