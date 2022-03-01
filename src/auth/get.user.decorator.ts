import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 리퀘스트에 들어가 있는 유저 정보를 바로 리턴해주는 데코레이터이다.
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  }
);
