import { Singleton } from 'typescript-ioc';

@Singleton
export class ExampleGreetingService {
  public greet(from: string, to: string): string {
    return `${from} says hello to ${to}!`;
  }
}
