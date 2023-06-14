import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((_, request) => {
    const user = request.args[0].user;
    return user;
})