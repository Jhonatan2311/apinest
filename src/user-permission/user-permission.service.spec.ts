import { UserPermissionService } from './user-permission.service';

describe('UserPermissionService', () => {
  let service: UserPermissionService;

  beforeEach(async () => {
    service = new UserPermissionService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
