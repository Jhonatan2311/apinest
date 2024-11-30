import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    service = new UserService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
