import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Trail } from '../trail.entity';

export class TrailValidationPipe implements PipeTransform {
  transform(trail: Trail) {
    if (!this.isHeadlineValid(trail.headline)) {
      throw new BadRequestException(`headline "${trail.headline}" is too long`);
    }

    return trail;
  }

  private isHeadlineValid(headline: string) {
    return headline.length < 20;
  }
}
