import { Test, TestingModule } from '@nestjs/testing';
import { BoardMemberResolver } from './board-member.resolver';

describe('BoardMemberResolver', () => {
  let resolver: BoardMemberResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardMemberResolver],
    }).compile();

    resolver = module.get<BoardMemberResolver>(BoardMemberResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
