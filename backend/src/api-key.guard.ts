import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.query['api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const isValidApiKey = this.validateApiKey(apiKey);

    if (!isValidApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }

  private validateApiKey(apiKey: string): boolean {
    const validApiKeys = ['f32e39c8-caeb-4444-bca0-1b1a6efb4b34'];
    return validApiKeys.includes(apiKey);
  }
}
