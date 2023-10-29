import { Test, TestingModule } from '@nestjs/testing';
import { PrismaAuthService } from './prisma.auth.service';

describe('AuthService', () => {
  let service: PrismaAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaAuthService],
    }).compile();

    service = module.get<PrismaAuthService>(PrismaAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
